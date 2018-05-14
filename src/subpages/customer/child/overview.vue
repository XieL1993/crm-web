<template>
  <transition name="page-fade">
    <div id="customer-overview">
      <div class="header">
        <div class="patch" v-waves>
          <svg-icon icon-class="cuscontract" class="contract"></svg-icon>
          <div class="content">
            <div class="title">已签合同</div>
            <div class="number">8</div>
            <div class="link">查看已签合同记录</div>
          </div>
        </div>
        <div class="patch" v-waves>
          <svg-icon icon-class="cusopportunity" class="opportunity"></svg-icon>
          <div class="content">
            <div class="title">关联商机</div>
            <div class="number">24</div>
            <div class="link">查看关联商机记录</div>
          </div>
        </div>
        <div class="patch" v-waves>
          <svg-icon icon-class="cusactivity" class="activity"></svg-icon>
          <div class="content">
            <div class="title">活动计划</div>
            <div class="number">9</div>
            <div class="link">查看活动计划记录</div>
          </div>
        </div>
        <div class="patch" v-waves>
          <svg-icon icon-class="cuscontact" class="contact"></svg-icon>
          <div class="content">
            <div class="title">联系人</div>
            <div class="number">12</div>
            <div class="link">查看联系人同记录</div>
          </div>
        </div>
      </div>
      <div class="main">
        <div class="chart-box">
          <chart></chart>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import Chart from '../../../components/chart/customer-chart'

  export default {
    props: {
      oppDetail: {
        type: Object,
        default: () => {
        }
      }
    },
    components: {
      Chart
    }
  }
</script>
<style scoped lang="scss">
  @import "../../../common/styles/mixin";
  @import "../../../common/styles/variables";

  #customer-overview {
    width: 100%;
    padding-bottom: 20px;
    &.page-fade-enter-active, &.page-fade-leave-active {
      transition: opacity 0.4s ease-in-out;
    }
    &.page-fade-enter, &.page-fade-leave-to {
      opacity: 0;
    }
    .header {
      height: 100px;
      margin: 20px 40px;
      display: flex;
      justify-content: space-between;
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
    }
    .main {
      .chart-box {
        width: 100%;
        height: 550px;
        padding: 20px 15px;
      }
    }
  }
</style>
