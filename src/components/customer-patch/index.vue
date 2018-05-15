<template>
  <div class="patch" v-waves>
    <svg-icon :icon-class="info.iconClass" :class="info.svgClass"></svg-icon>
    <div class="content">
      <div class="title">{{info.title}}</div>
      <div class="number">{{data.allData}}</div>
      <div class="link">{{info.link}}</div>
    </div>
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
      info() {
        return this.getInfo(this.data.dataType)
      }
    },
    methods: {
      getInfo(dataType) {
        switch (dataType) {
          case 'Activity':
            return {
              iconClass: 'cusactivity',
              svgClass: 'activity',
              title: '活动计划',
              link: '查看活动计划记录'
            }
          case 'Opportunity':
            return {
              iconClass: 'cusopportunity',
              svgClass: 'opportunity',
              title: '关联商机',
              link: '查看关联商机记录'
            }
          case 'Contract':
            return {
              iconClass: 'cuscontract',
              svgClass: 'contract',
              title: '已签合同',
              link: '查看已签合同记录'
            }
          case 'ontact':
            return {
              iconClass: 'cuscontact',
              svgClass: 'contact',
              title: '联系人',
              link: '查看联系人记录'
            }
          default:
            return {}
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../../common/styles/variables";
  @import "../../common/styles/mixin";

  .patch {
    width: 22.5%;
    background: #f1f6fb;
    border: 1px solid #d5e4f7;
    display: flex;
    align-items: center;
    .svg-icon {
      flex: 0 0 auto;
      font-size: 70px;
      margin: 0 20px;
      &.contract {
        color: #E6A23C;
      }
      &.opportunity {
        color: #5ecda9;
      }
      &.activity {
        color: #20C6F4
      }
      &.contact {
        color: #FF7F64
      }
    }
    .content {
      flex: 1 1 auto;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      overflow: hidden;
      padding: 8px;
      .title {
        font-size: 14px;
        color: $color-text-table;
        @include no-wrap
      }
      .number {
        font-size: 24px;
        color: #303133;
        @include no-wrap
      }
      .link {
        cursor: pointer;
        font-size: 12px;
        color: #1475d8;
        @include no-wrap;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
</style>
