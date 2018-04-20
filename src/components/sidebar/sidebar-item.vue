<template>
  <div class="menu-wrapper" :class="{hideMenu:!sidebar.opened}">
    <template v-for=" item in routes">
      <!--如果没有子菜单，则给此节点添加路由-->
      <router-link v-if="!item.hidden && (!item.children || item.children.length === 0 || item.type!==0)"
                   :to="item.sourceUrl">
        <el-menu-item :index="item.sourceUrl||item.id">
          <svg-icon icon-class="menu"></svg-icon>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </router-link>
      <el-submenu v-if="!item.hidden && item.type===0 && item.children && item.children.length > 0"
                  :index="item.sourceUrl || item.id">
        <template slot="title">
          <svg-icon icon-class="dashboard"></svg-icon>
          <span>{{ item.name }}</span>
        </template>
        <template v-for="child in item.children" v-if="!child.hidden">
          <sidebar-item :routes="[child]"></sidebar-item>
        </template>
      </el-submenu>
    </template>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'sidebar-item',
    props: {
      routes: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      ...mapGetters(['sidebar'])
    }
  }
</script>
<style scoped lang="scss">

</style>
/* reset element-ui css */
<style lang="scss">
  @import "../../styles/variables";

  .el-menu--popup { /*menu hide状态时点击父节点弹出的menu悬浮框*/
    background: $menuBg;
  }

  .menu-wrapper {
    .el-submenu { /* 嵌套menu*/
      .el-submenu__title { /* menu父节点*/
        color: $menu-text;
        background: $menuBg;
        .svg-icon { /* menu图标*/
          margin-right: 16px;
        }
        .el-submenu__icon-arrow { /* menu箭头*/
          color: $menu-text;
        }
        &:hover { /*menu被选中*/
          color: $menu-text_hover;
          background-color: $menuHover;
          .el-submenu__icon-arrow { /* menu箭头*/
            color: $menu-text_hover;
          }
        }
      }
    }
    &.hideMenu {
      .el-submenu__title {
        position: relative;
        span {
          display: none;
        }
        .svg-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate3d(-50%, -50%, 0);
        }
        .el-submenu__icon-arrow {
          display: none;
        }
      }
    }
    a { /*最底层的单层menu(有路由的menu)*/
      display: inline-block;
      width: 100%;
      .el-menu-item {
        color: $menu-text;
        background: $menuBg;
        .svg-icon { /* menu图标*/
          font-size: 12px;
          margin-right: 10px;
        }
        &:hover, &.is-active {
          color: $menu-text_hover;
          background-color: $menuHover;
          .el-submenu__icon-arrow { /* menu箭头*/
            color: $menu-text_hover;
          }
        }
      }
    }
  }
</style>
