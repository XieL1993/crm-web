<template>
  <div id="cus-chart">
    <div ref="chart" class="chart"></div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import resize from '../../common/js/resize'
  import { chartData3 } from './data'
  import { getOption } from '../../common/js/homeChart.'

  export default {
    mixins: [resize],
    data() {
      return {
        option: {},
        chart: null
      }
    },
    mounted() {
      this.initChart()
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
        this.option = getOption(chartData3)
        if (this.chart === null) {
          this.chart = echarts.init(this.$refs.chart)
        }
        this.chart.setOption(this.option)
      }
    }
  }
</script>
<style lang="scss" scoped>
  #cus-chart {
    height: 100%;
    position: relative;
    .chart {
      height: 100%;
    }
  }
</style>
