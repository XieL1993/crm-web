<template>
  <scroll-bar>
    <el-menu
      mode="vertical"
      :collapse-transition="true"
      show-timeout="200"
      :collapse="!sidebar.opened"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF">
      <sidebar-item :routes="menus"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>
<script>
  import ScrollBar from '../scrollbar'
  import { mapGetters } from 'vuex'
  import SidebarItem from './sidebar-item'

  export default {
    data() {
      return {}
    },
    components: {
      ScrollBar,
      SidebarItem
    },
    computed: {
      ...mapGetters([
        'menus',
        'sidebar'
      ])
    }
  }
</script>
<style scoped lang="scss">
  .el-menu {
    border: none;
    width: 100%;
  }
</style>
<style lang="scss">
  @import "../../styles/variables";
  /* reset element-ui css */
  .slidebar {
    .nest-menu .el-submenu > .el-submenu__title,
    .el-submenu .el-menu-item {
      min-width: 180px !important;
      background-color: $subMenuBg !important;
      &:hover {
        background-color: $menuHover !important;
      }
    }
    .el-menu--collapse .el-menu .el-submenu {
      min-width: 180px !important;
    }
  }
</style>
