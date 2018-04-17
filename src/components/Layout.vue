<template>
    <div class="full-screen">
        <div class="topbar-box">
            <topbar></topbar>
        </div>
        <div class="full-main">
            <div class="sidebar-box">菜单</div>
            <div class="main-box">
                <div class="navbar-box">navbar</div>
                <div class="app-content-box">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import Topbar from './topbar/Topbar'

  export default {
    data() {
      return {}
    },
    components: {
      Topbar
    }
  }
</script>
<style scoped lang="scss">
    .full-screen {
        display: flex;
        flex-direction: column;
        height: 100%;
        .topbar-box {
            flex: 0 0 50px;
            height: 50px;
            box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
            background: #2b3643;
            user-select: none;
            color: #c0c9d5;
        }
        .full-main {
            flex: 1 1 auto;
            background: red;
            display: flex;
            overflow: hidden;
            .sidebar-box {
                flex: 0 0 200px;
                background: #364150;
                color: #c0c9d5;
                width: 200px;
                user-select: none;
                overflow-x: hidden;
                overflow-y: auto;
            }
            .main-box {
                flex: 1 1 auto;
                display: flex;
                flex-direction: column;
                background: yellowgreen;
                .navbar-box {
                    flex: 0 0 31px;
                    height: 31px;
                    padding: 0 0 0 15px;
                    text-align: left;
                    font-size: 13px;
                    background: #dae4eb;
                    color: #171b26
                }
                .app-content-box {
                    flex: 1 1 auto;
                    overflow: auto;
                    background: #d9534f;
                }
            }
        }
    }
</style>
