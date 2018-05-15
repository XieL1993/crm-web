<template>
  <div id="customer-overview">
    <div class="header">
      <customer-patch v-for="(item,index) in overviewData" :key="index" :data="item"></customer-patch>
    </div>
    <div class="main">
      <div class="chart-box">
        <div class="chart-title">
          <div><span class="large">合同金额</span></div>
          <div>截止2018-03-29,共计：<span>320万元</span></div>
          <div>其中2.0产品：<span>200万元</span></div>
          <div>其中3.0产品：<span>120万元</span></div>
        </div>
        <div class="chart">
          <chart></chart>
        </div>
      </div>
      <div class="remind">
        <p class="title">重要提醒</p>
        <div class="content">
          <div class="item" v-for="(item,index) in remindData" :key="index">
            <span class="type">{{item.reminfType}}</span>
            <span class="info">{{item.remindInfo}}</span>
          </div>
          <div class="empty-box" v-show="!remindData.length">
            <svg-icon icon-class="nodata"></svg-icon>
            <span>暂无数据</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Chart from '../../../components/chart/customer-chart'
  import CustomerPatch from '../../../components/customer-patch'

  export default {
    props: {
      overviewData: {
        type: Array,
        default: []
      },
      remindData: {
        type: Array,
        default: []
      }
    },
    components: {
      Chart,
      CustomerPatch
    }
  }
</script>
<style scoped lang="scss">
  @import "../../../common/styles/mixin";
  @import "../../../common/styles/variables";

  #customer-overview {
    width: 100%;
    padding-bottom: 20px;
    .header {
      height: 100px;
      margin: 20px 40px;
      display: flex;
      justify-content: space-between;
    }
    .main {
      margin: 0 40px;
      padding-top: 20px;
      display: flex;
      .chart-box {
        flex: 1 1 auto;
        height: 450px;
        margin-right: 20px;
        overflow: hidden;
        .chart-title {
          height: 40px;
          line-height: 40px;
          font-size: 14px;
          color: $color-text-table;
          display: flex;
          > div {
            @include no-wrap;
            margin-left: 10px;
            &:first-of-type {
              margin-left: 20px;
            }
            span {
              font-weight: bold;
              &.large {
                font-size: 16px;
              }
            }
          }
        }
        .chart {
          height: 410px;
        }
      }
      .remind {
        flex: 0 0 250px;
        width: 250px;
        height: 450px;
        border: 1px solid $border-main;
        .title {
          font-size: 16px;
          color: $color-main;
          line-height: 40px;
          font-weight: bold;
          padding-left: 15px;
          border-bottom: 1px solid $border-main;
        }
        .content {
          height: 410px;
          overflow-y: auto;
          overflow-x: hidden;
          position: relative;
          .item {
            height: 30px;
            border-bottom: 1px solid #E4E7ED;
            display: flex;
            cursor: pointer;
            .type {
              flex: 0 0 auto;
              color: #FF6600;
              padding: 0 10px;
              font-size: 12px;
              line-height: 30px;
              font-weight: bold;
            }
            .info {
              color: $color-text-table;
              font-size: 12px;
              line-height: 30px;
              @include no-wrap;
            }
          }
          .empty-box {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            .svg-icon {
              font-size: 50px;
              color: #909399;
            }
            span {
              display: block;
              font-size: 14px;
              color: #909399;
              margin-top: 10px;
              padding-left: 15px;
            }
          }
        }
      }
    }
  }
</style>
