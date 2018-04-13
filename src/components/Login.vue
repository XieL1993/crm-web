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
                    <el-form>
                        <el-form-item>
                            <el-input placeholder="邮箱/用户名"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input placeholder="密码"></el-input>
                        </el-form-item>
                        <div class="check-box">
                            <el-form-item>
                                <el-input placeholder="验证码"></el-input>
                            </el-form-item>
                            <div class="checkcode">验证码</div>
                        </div>
                        <el-button type="primary">登录</el-button>
                    </el-form>
                </div>
            </div>
        </div>
        <div class="footer">@2018 vue练习项目</div>
    </div>
</template>

<script>
  import httpFetch from '../api/httpFetch'

  export default {
    name: 'Login',
    data() {
      return {}
    },
    created() {
      document.body.style.background = '#16191E'
      this.createCode()
    },
    destroyed() {
      document.body.style.background = '#FFFFFF'
    },
    methods: {
      createCode() {
        httpFetch.get('/getCheckCode.json').then(res => {
          if (res && res.data) {
            const data = res.data
            const ranCode = data.code
            alert(ranCode)
          }
        })
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
                            .checkcode {
                                display: inline-block;
                                width: 120px;
                                background: yellowgreen;
                                height: 45px;
                                flex: 0 0 120px;
                                margin-left: 10px;
                                text-align: center;
                                line-height: 45px;
                                color: $color-text;
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
