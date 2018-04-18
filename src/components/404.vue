<template>
  <div class="error-page">
    <div class="box">
      <p>我是404页面</p>
      <p>{{message}}</p>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    created() {
    },
    computed: {
      message() {
        return this.$route.query.message
      }
    }
  }
</script>
<style scoped lang="scss">
  .error-page {
    height: 100%;
    position: relative;
    .box {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      p {
        text-align: center;
        font-size: 22px;
        color: #d9534f;
        line-height: 40px;
      }
    }
  }

</style>
