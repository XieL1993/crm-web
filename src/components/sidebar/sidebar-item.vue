<template>
  <div class="menu-wrapper">
    <template v-for=" item in routes">
      <!--如果没有子菜单，则给此节点添加路由-->
      <router-link v-if="!item.hidden && (!item.children||item.children.length === 0)" :to="item.url">
        <el-menu-item :index="item.id">
          <svg-icon icon-class="people"></svg-icon>
          <span>{{ item.title }}</span>
        </el-menu-item>
      </router-link>
      <el-submenu v-if="!item.hidden && item.children && item.children.length > 0" :index="item.id">
        <template slot="title">
          <svg-icon icon-class="people"></svg-icon>
          <span>{{ item.title }}</span>
        </template>
        <template v-for="child in item.children" v-if="!child.hidden">
          <sidebar-item :routes="[child]"></sidebar-item>
        </template>
      </el-submenu>
    </template>
  </div>
</template>
<script>
  export default {
    name: 'sidebar-item',
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
