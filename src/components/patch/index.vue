<template>
  <div class="note">
    <span class="note_top">新增</span>
    <span class="note_value">{{data.newData}}</span>
    <span class="note_sum">{{'合计：'+data.allData}}</span>
    <div class="footer">{{getType(data.dataType)}}</div>
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
    methods: {
      getType(dataType) {
        switch (dataType) {
          case 'Invoice':
            return '收款（万元）'
          case 'Contract':
            return '合同（个）'
          case 'Customer':
            return '客户（个）'
          case 'Opportunity':
            return '商机（个）'
          case 'Activity':
            return '活动（个）'
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../../common/styles/variables";
  @import "../../common/styles/mixin";

  .note {
    width: 90px;
    height: 100%;
    border-radius: 4px;
    background: #ffffff;
    border: 1px solid transparent;
    /*margin-left: 15px;*/
    position: relative;
    cursor: pointer;
    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.12);
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    &:first-child {
      margin-left: 0;
    }
    &:hover {
      border: 1px solid #7ec2fa;
      box-shadow: none;
    }
    .note_top {
      display: block;
      width: 100%;
      text-align: center;
      margin-top: 20px;
      font-size: 13px;
      color: $color-text-table;
    }
    .note_value {
      display: block;
      width: 100%;
      text-align: center;
      font-size: 18px;
      margin-top: 15px;
      color: #303133;
      @include no-wrap()
    }
    .note_sum {
      position: absolute;
      left: 0;
      bottom: 50px;
      display: block;
      width: 100%;
      text-align: center;
      font-size: 12px;
      @include no-wrap()
    }
    .footer {
      position: absolute;
      left: -1px;
      right: -1px;
      bottom: -1px;
      background: #7ec2fa;
      color: white;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 12px;
    }
  }
</style>
