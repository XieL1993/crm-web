<template>
    <div class="navbar">
        <i class="el-icon-tickets" @click="toggleSideBar"></i>
    </div>
</template>
<script>
  import { mapActions } from 'vuex'

  export default {
    data() {
      return {}
    },
    methods: {
      ...mapActions(['toggleSideBar'])
    }

  }
</script>
<style scoped lang="scss">
    .navbar {
        i {
            font-size: 20px;
        }
    }
</style>
