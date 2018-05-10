<template>
  <div id="home-chart">
    <div ref="chart" class="chart"></div>
    <div class="tab">
      <span class="industry" :class="{active:tab===0}" @click="tab=0" v-waves>分行业</span>
      <span class="product" :class="{active:tab===1}" @click="tab=1" v-waves>分产品</span>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import resize from '../../common/js/resize'
  import { chartData, chartData2 } from './data'
  import { getOption } from '../../common/js/homeChart.'

  export default {
    mixins: [resize],
    data() {
      return {
        tab: 0,
        option: {},
        chart: null
      }
    },
    mounted() {
      this.initChart()
    },
    watch: {
      tab() {
        this.initChart()
      }
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart() {
        if (this.tab === 0) {
          this.option = getOption(chartData)
        } else {
          this.option = getOption(chartData2)
        }
        if (this.chart === null) {
          this.chart = echarts.init(this.$refs.chart)
        }
        this.chart.setOption(this.option)
      }
    }
  }
</script>
<style lang="scss" scoped>
  #home-chart {
    height: 100%;
    position: relative;
    .chart {
      height: 100%;
    }
    .tab {
      position: absolute;
      top: 20px;
      right: 20px;
      font-size: 12px;
      display: flex;
      .industry, .product {
        width: 70px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 4px 0 0 4px;
        color: #657180;
        background: #f7f7f7;
        cursor: pointer;
        &:hover {
          color: #0275d8;
          background: #ffffff;
        }
        &.active {
          color: #ffffff;
          background: linear-gradient(135deg, #2F89FF, #4a94fa, #0275D8);
          &:hover {
            background: #0275D8;
          }
        }
      }
      .product {
        border-radius: 0 4px 4px 0;
      }
    }
  }
</style>
