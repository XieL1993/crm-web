<template>
  <div id="login-container">
    <div class="main">
      <div class="login-img">
        <img src="../common/image/login.png">
        <h2>成就所托，持之以恒!</h2>
        <h3>洞悉需求，应势而生；风雨同舟，一路同行</h3>
      </div>
      <div class="login-box">
        <h3>业务基础框架</h3>
        <div class="login-content">
          <h3>用户登录</h3>
          <el-form :model="loginForm"
                   :status-icon="true"
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
  import { mapActions } from 'vuex'
  import { getCheckCode } from '../api/login'

  export default {
    data() {
      return {
        loginForm: {
          username: 'admin',
          password: 'admin',
          checkCode: ''
        },
        loading: false,
        loginRules: {
          username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
          password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
          checkCode: [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
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
    methods: {
      ...mapActions(['Login']),
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.$message.closeAll()
            this.loading = true
            this.Login(this.loginForm).then(() => {
              this.loading = false
              this.$router.push({ path: '/' })
            }
            ).catch(error => {
              this.loading = false
              this.$message.warning({ showClose: true, message: error.message, duration: 3000 })
            })
          }
        })
      },
      refreshCode() {
        this.loginForm.checkCode = ''// 重置验证码输入框
        this.createCode()
      },

      createCode() {
        getCheckCode().then(data => {
          const canvas = document.getElementById('codeImg')
          const ranCode = data.codeKey
          canvas.style.backgroundImage = 'url(\'data:image/jpeg;base64,' + ranCode + '\')'
        })
      }
    }
  }
</script>
<style scoped lang="scss">

  #login-container {
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
            font-size: 18px;
            font-weight: normal;
            border-bottom: 1px solid #EBEBEB;
            margin-left: 10px;
            margin-right: 10px;
          }
          .el-form {
            margin: 20px 40px;
            .el-form-item {
              height: 45px;
              margin-bottom: 22px;
            }
            .check-box {
              display: flex;
              .el-form-item {
                flex: 1;
              }
              .checkCode {
                width: 120px;
                height: 45px;
                flex: 0 0 120px;
                margin-left: 10px;
                text-align: center;
                line-height: 45px;
                color: #555555;
                padding: 5px;
                #codeImg {
                  width: 100%;
                  height: 100%;
                  cursor: pointer;
                }
              }
            }
            .el-button {
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
      color: #c0c9d5;
      font-size: 14px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
</style>
