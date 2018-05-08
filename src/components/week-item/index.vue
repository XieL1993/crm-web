<template>
  <div id="week" :class="weekClass">
    <div class="week-title">{{data.week}}</div>
    <div class="day">{{data.day}}</div>
    <i></i>
  </div>
</template>
<script>
  export default {
    props: {
      data: {
        type: Object,
        default: {}
      }
    },
    computed: {
      weekClass() {
        const sty = []
        if (this.data.active) {
          sty.push('active')
        }
        if (this.data.current) {
          sty.push('current')
        }
        return sty
      }
    },
    data() {
      return {
        current: false
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../../common/styles/variables";

  #week {
    flex: 1 1 auto;
    height: 100%;
    position: relative;
    background: #999999;
    .week-title {
      font-size: 12px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      color: #909399;
    }
    .day {
      font-size: 13px;
      height: 30px;
      line-height: 30px;
      color: #303133;
      text-align: center;
    }
    i {
      position: absolute;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #f00;
      bottom: 5px;
      left: 50%;
      margin-left: -3px;
      display: none;
    }
    &.active {
      i {
        display: block;
      }
    }
  }
</style>
