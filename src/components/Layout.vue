<template>
    <div class="full-screen">
        <div class="topbar-box">
            <topbar></topbar>
        </div>
        <div class="full-main">
            <div class="sidebar-box" :class="{hideSidebar:!sidebar.opened}">
                <slidebar></slidebar>
            </div>
            <div class="main-box">
                <div class="navbar-box">
                    <navbar></navbar>
                </div>
                <div class="app-content-box">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import Topbar from './topbar/Topbar'
  import Slidebar from './slidebar'
  import Navbar from './navbar'
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {}
    },
    components: {
      Topbar,
      Slidebar,
      Navbar
    },
    computed: {
      ...mapGetters(['sidebar'])
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
            display: flex;
            overflow: hidden;
            .sidebar-box {
                transition: all 0.2s;
                flex: 0 0 180px;
                width: 180px;
                user-select: none;
                font-size: 0;
                overflow: hidden;
                &.hideSidebar {
                    flex: 0 0 36px;
                    width: 36px;
                }
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
