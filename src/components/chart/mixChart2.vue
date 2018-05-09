<template>
  <div id="line-chart"></div>
</template>

<script>
  import echarts from 'echarts'
  import resize from '../../common/js/resize'
  import { data } from './data'
  import { getOption } from '../../common/js/chart'

  export default {
    mixins: [resize],
    data() {
      return {
        option: {}
      }
    },
    mounted() {
      this.initChart()
    },
    created() {
      this.option = getOption(data)
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
        this.chart = echarts.init(document.getElementById('line-chart'))
        console.log(this.option)
        this.chart.setOption(this.option)
      }
    }
  }
</script>
<style>
  #line-chart {
    width: 100%;
    height: 100%;
  }
</style>
