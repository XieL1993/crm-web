<template>
    <div class="menu-wrapper">
        <template v-for=" item in routes">
            <!--如果没有子菜单，则给此节点添加路由-->
            <router-link v-if="!item.hidden && !item.children" :to="item.url">
                <el-menu-item :index="item.id">
                    <i class="el-icon-setting"></i>
                    <span slot="title">{{ item.title }}</span>
                </el-menu-item>
            </router-link>
            <el-submenu v-else :index="item.id">
                <template slot="title">
                    <svg-icon icon-class="people" ></svg-icon>
                    <span v-if="item.meta&&item.meta.title" slot="title">{{generateTitle(item.meta.title)}}</span>
                </template>
            </el-submenu>
        </template>
    </div>
</template>
<script>
  export default {
    props: {
      routes: {
        type: Array,
        default: () => []
      }
    }
  }
</script>
<style scoped lang="scss">

</style>
