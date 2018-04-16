<template>
    <div class="login-container">
        <div class="main">
            <div class="login-img">
                <img src="../assets/login.png">
                <h2>成就所托，持之以恒!</h2>
                <h3>洞悉需求，应势而生；风雨同舟，一路同行</h3>
            </div>
            <div class="login-box">
                <h3>业务基础框架</h3>
                <div class="login-content">
                    <h3>用户登录</h3>
                    <el-form :model="loginForm"
                             :status-icon="showError"
                             :rules="loginRules"
                             ref="loginForm">
                        <el-form-item prop="username">
                            <el-input placeholder="邮箱/用户名"
                                      v-model="loginForm.username"
                                      ref="username"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input placeholder="密码"
                                      type="password"
                                      v-model="loginForm.password"
                                      ref="password"></el-input>
                        </el-form-item>
                        <div class="check-box">
                            <el-form-item prop="checkCode">
                                <el-input placeholder="验证码"
                                          v-model="loginForm.checkCode"
                                          ref="checkCode"></el-input>
                            </el-form-item>
                            <div class="checkCode">
                                <canvas id="codeImg"
                                        title="点击这里刷新验证码"
                                        @click="refreshCode"></canvas>
                            </div>
                        </div>
                        <el-button type="primary"
                                   native-type="button"
                                   @click="handleLogin"
                                   :loading="loading">登录
                        </el-button>
                    </el-form>
                </div>
            </div>
        </div>
        <div class="footer">@2018 vue练习项目</div>
    </div>
</template>

<script>
  import httpFetch from '../api/httpFetch'
  import Cookie from 'js-cookie'
  import { mapActions } from 'vuex'
  import { Message } from 'element-ui'

export default {
    name: 'Login',
    data() {
      return {
        randomCode: '',
        loginForm: {
          username: 'admin',
          password: '111111',
          checkCode: ''
        },
        showError: false,
        loading: false,
        loginRules: {
          username: [{
            required: true,
            validator: (rule, value, callback) => {
              if (!this.showError) {
                return
              }
              if (value === '') {
                callback(new Error('用户名不能为空'))
              } else {
                callback()
              }
            }
          }],
          password: [{
            required: true,
            validator: (rule, value, callback) => {
              if (!this.showError) {
                return
              }
              if (value === '') {
                callback(new Error('密码不能为空'))
              } else {
                callback()
              }
            }
          }],
          checkCode: [{
            required: true,
            validator: (rule, value, callback) => {
              if (!this.showError) {
                return
              }
              if (value === '') {
                callback(new Error('验证码不能为空'))
              } else if (value !== this.randomCode) {
                callback(new Error('验证码不正确'))
              } else {
                callback()
              }
            }
          }]
        }
      }
    },
    created() {
      document.body.style.background = '#16191E'
    },
    mounted() {
      document.body.style.background = '#16191E'
      this.createCode()
    },
    destroyed() {
      document.body.style.background = '#FFFFFF'
    },
    watch: {
      loginForm: {
        handler() {
          this.showError = false
          Message.closeAll()
          this.$refs.loginForm.clearValidate()
        },
        deep: true
      }
    },
    methods: {
      ...mapActions(['Login']),
      handleLogin() {
        this.showError = true
        Message.closeAll()
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.showError = false
            this.$refs.loginForm.clearValidate()
            this.loading = true
            this.Login(this.loginForm).then(res => {
              this.loading = false
              const returnCode = res.return_code
              let message = res.return_info
              /**
               * 0：登录成功
               * -1：用户名为空、-3：用户名错误
               * -2：密码为空、-4：密码错误
               * -5：验证码为空、-6：验证码错误
               * */
              if (returnCode === '0') {
                Message.info({ showClose: true, message: '登录成功', duration: 2000 })
                this.$router.push({ path: '/' })
              } else {
                if (returnCode === '-1' || returnCode === '-3') {
                  this.$refs.username.focus()
                  Message.warning({ showClose: true, message, duration: 0 })
                } else if (returnCode === '-2' || returnCode === '-4') {
                  this.$refs.password.focus()
                  Message.warning({ showClose: true, message, duration: 0 })
                } else if (returnCode === '-5' || returnCode === '-6') {
                  this.$refs.checkCode.focus()
                  Message.warning({ showClose: true, message, duration: 0 })
                } else {
                  message = '网络通信失败,服务器异常，登录错误'
                  Message.warning({ showClose: true, message, duration: 0 })
                }
              }
            }).catch(() => {
              this.loading = false
              Message.warning({ showClose: true, message: '登录错误', duration: 0 })
            })
          } else {
            return false
          }
        })
      },
      refreshCode() {
        this.showError = false
        this.$refs.loginForm.clearValidate()
        this.loginForm.checkCode = ''// 重置验证码输入框
        this.$refs.checkCode.focus()
        this.createCode()
      },
      createCode() {
        httpFetch.get('/getCheckCode.json').then(res => {
          if (res && res.data) {
            const data = res.data
            const canvas = document.getElementById('codeImg')
            const context = canvas.getContext('2d')
            // 每次生成code先将其清空防止叠加
            context.clearRect(0, 0, canvas.width, canvas.height)
            context.strokeStyle = '#FFF'
            context.strokeRect(0, 0, canvas.width, canvas.height)
            const ranCode = data.code
            if (ranCode === '') return
            this.randomCode = ranCode
            this.loginForm.checkCode = ranCode
            Cookie.set('checkCode-token', data.sessionId)
            // 生成干扰线，数量随意
            for (let i = 0; i < 20; i++) {
              this.drawline(canvas, context)
            }
            // 循环生成4位验证码
            for (let k = 0; k < ranCode.length; k++) {
              context.font = '76px Arial'
              // 将初始状态保存
              context.save()
              // 获得-1到1的随机数
              const rA = 1 - Math.random() * 2
              // 获取随机倾斜角
              const angle = rA / 8
              const ranNum = ranCode.charAt(k)
              // 旋转生成的随机字符
              context.rotate(angle)
              // 把rand()生成的随机数文本依次填充到canvas中，注意x坐标
              context.fillText(ranNum, 60 + 45 * k, 100)
              // 恢复初始状态，以便下一次循环
              context.restore()
            }
          }
        })
      },
      /* 随机干扰线条函数*/
      drawline(canvas, context) {
        // 若省略beginPath，则每点击一次验证码会累积干扰线的条数
        context.beginPath()
        // 起点与终点在canvas宽高内随机
        context.moveTo(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height))
        context.lineTo(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height))
        context.lineWidth = 1
        context.strokeStyle = '#275DB3'
        context.stroke()
      }
    }
  }
</script>
<style scoped lang="scss">
    @import "../styles/variables";

    .login-container {
        position: relative;
        width: 85%;
        min-height: 100%;
        margin: 0 auto;
        .main {
            display: flex;
            padding-top: 132px;
            height: 100%;
            .login-img {
                flex: 1;
                height: 100%;
                text-align: center;
                h2 {
                    font-size: 28px;
                    color: #5C9CF5;
                    text-align: center;
                    margin-top: -40px;
                }
                h3 {
                    font-size: 16px;
                    color: #4569A2;
                    text-align: center;
                    margin-top: 15px;
                }
            }
            .login-box {
                flex: 0 0 380px;
                margin-left: 20px;
                h3 {
                    width: 100%;
                    text-align: center;
                    color: #ffffff;
                    font-size: 26px;
                    margin-bottom: 20px;
                }
                .login-content {
                    width: 380px;
                    height: 360px;
                    background: #ffffff;
                    border-radius: 8px;
                    h3 {
                        width: 360px;
                        height: 50px;
                        line-height: 50px;
                        color: #4a94fa;
                        text-align: center;
                        font-size: $font-size-large;
                        font-weight: normal;
                        border-bottom: 1px solid $color-text-ll;
                        margin-left: 10px;
                        margin-right: 10px;
                    }
                    .el-form {
                        margin: 20px 40px;
                        .check-box {
                            display: flex;
                            .el-form-item {
                                display: inline-block;
                                flex: 1;
                            }
                            .checkCode {
                                display: inline-block;
                                width: 120px;
                                height: 45px;
                                flex: 0 0 120px;
                                margin-left: 10px;
                                text-align: center;
                                line-height: 45px;
                                color: $color-text;
                                padding: 5px;
                                #codeImg {
                                    width: 100%;
                                    height: 100%;
                                    cursor: pointer;
                                }
                            }
                        }
                        .el-button {
                            display: block;
                            width: 100%;
                            height: 42px;
                            margin-top: 10px;
                        }
                    }
                }
            }
        }
        .footer {
            position: absolute;
            height: 50px;
            line-height: 50px;
            bottom: 0;
            text-align: center;
            color: $color-text-l;
            font-size: $font-size-medium;
            left: 50%;
            transform: translateX(-50%);
        }
    }
</style>
<style lang="scss">
    /* reset element-ui css */
    .login-container {
        .el-input {
            input {
                display: inline-block;
                height: 45px;
            }
        }
    }
</style>
