<template>
  <div id="week" :class="{active:data.active,current:data.current}" v-waves>
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
    data() {
      return {}
    }
  }
</script>
<style scoped lang="scss">
  @import "../../common/styles/variables";

  #week {
    flex: 1 1 auto;
    height: 100%;
    position: relative;
    cursor: pointer;
    border: 1px solid transparent;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    .week-title {
      font-size: 12px;
      line-height: 12px;
      margin-top: 8px;
      text-align: center;
      color: #909399;
    }
    .day {
      font-size: 13px;
      margin-top: 12px;
      color: #303133;
      text-align: center;
    }
    i {
      position: absolute;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #FF6C60;
      bottom: 5px;
      left: 50%;
      margin-left: -3px;
      display: none;
    }
    &.active {
      background: #999999;
      .week-title, .day {
        color: #ffffff;
      }
      i {
        display: block;
      }
    }
    &.current, &:hover {
      background: #4a94fa;
      .week-title, .day {
        color: #ffffff;
      }
      i {
        background: #ffffff;
      }
    }
    &:hover {
      border: 1px solid #ffffff;
    }
  }
</style>
