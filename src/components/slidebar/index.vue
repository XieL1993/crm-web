<template>
    <scroll-bar>
        <el-menu
                class="slidebar"
                mode="vertical"
                background-color="#364150"
                text-color="#bfcbd9"
                active-text-color="#409EFF">
            <el-submenu index="1">
                <template slot="title">
                    <!--<i class="el-icon-location"></i>-->
                    <svg-icon icon-class="people" ></svg-icon>
                    <span>导航一</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="1-1">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                    <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3" disabled>
                <i class="el-icon-document"></i>
                <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span slot="title">导航四</span>
            </el-menu-item>
        </el-menu>
    </scroll-bar>
</template>
<script>
  import ScrollBar from '../scrollbar'

  export default {
    data() {
      return {}
    },
    components: {
      ScrollBar
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
