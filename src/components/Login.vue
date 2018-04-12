<template>
    <div class="login">
        <div class="login-container">
            <div class="login-img">
                <img src="../assets/login.png">
                <h2>成就所托，持之以恒!</h2>
                <h3>洞悉需求，应势而生；风雨同舟，一路同行</h3>
            </div>
            <div class="login-box">
                <div class="login-header">
                    <h3>业务基础框架</h3>
                </div>
            </div>
            <div class="login-footer">@2017 恒生电子股份有限公司</div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {}
  }
}
</script>

<style scoped lang="scss">
    .login {
        background: #16191E;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        .login-container {
            width: 1200px;
            margin: 0 auto;
            padding-top: 132px;
            box-sizing: border-box;
            &:after {
                content: "";
                display: table;
                clear: both;
            }
            .login-img {
                float: left;
                width: 810px;
                text-align: center;
                padding-right: 30px;
                box-sizing: border-box;
                h2 {
                    font-size: 28px;
                    color: #5C9CF5;
                    margin-top: -40px;
                    margin-bottom: 14px;
                }
                h3 {
                    font-size: 16px;
                    color: #4569A2
                }
            }
            .login-box{
                float: left;
                width: 380px;
                .login-header {
                    margin-bottom: 20px;
                    h3 {
                        font-size: 1.75rem;
                        color: #fff;
                        text-align: center;
                    }
                }
            }
            .login-footer {
                position: fixed;
                width: 100%;
                height: 52px;
                line-height: 52px;
                bottom: 0;
                text-align: center;
                color: #4569A2;
            }
        }
    }
</style>
