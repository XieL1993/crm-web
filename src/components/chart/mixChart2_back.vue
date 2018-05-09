<template>
  <div id="chart2"></div>
</template>

<script>
  import echarts from 'echarts'
  import resize from '../../common/js/resize'
  import { data } from './data'
import { getOption } from '../../common/js/chart'

export default {
    mixins: [resize],
    mounted() {
      this.initChart()
      console.log(JSON.stringify(getOption(data)))
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
        this.chart = echarts.init(document.getElementById('chart2'))
        const xData = ['第三方支付', '独立基金销售机构', '基金', '期货', '私募', '证券', '其他']
        this.chart.setOption({
          backgroundColor: '#364150',
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            borderWidth: 0,
            top: 70,
            bottom: 50,
            textStyle: {
              color: '#fff'
            }
          },
          legend: {
            x: 'center',
            top: '20',
            textStyle: {
              color: '#ffffff'
            },
            data: ['第一季度', '第二季度', '第三季度', '第四季度']
          },
          toolbox: {
            show: true,
            orient: 'vertical',
            right: '20',
            bottom: '20',
            feature: {
              saveAsImage: { show: true }
            }
          },
          calculable: true,
          xAxis: [{
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#ffffff'
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitArea: {
              show: false
            },
            axisLabel: {
              interval: 0

            },
            data: xData
          }],
          yAxis: [{
            type: 'value',
            splitLine: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.4)',
                type: 'dotted'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#ffffff'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 0
            },
            splitArea: {
              show: false
            }
          }],
          series: [{
            name: '第一季度',
            type: 'bar',
            barGap: '0',
            itemStyle: {
              normal: {
                color: '#fabd38',
                label: {
                  show: true,
                  textStyle: {
                    color: '#fff'
                  },
                  position: 'top',
                  formatter(p) {
                    return p.value > 0 ? p.value : ''
                  },
                  fontSize: 12
                }
              }
            },
            data: [
              709,
              1917,
              2455,
              2610,
              1719,
              1433,
              1544
            ]
          },

          {
            name: '第二季度',
            type: 'bar',
            itemStyle: {
              normal: {
                color: '#4cabce',
                barBorderRadius: 0,
                label: {
                  show: true,
                  textStyle: {
                    color: '#fff'
                  },
                  position: 'top',
                  formatter(p) {
                    return p.value > 0 ? p.value : ''
                  },
                  fontSize: 12
                }
              }
            },
            data: [
              1327,
              1776,
              507,
              1200,
              800,
              482,
              604
            ]
          },
          {
            name: '第三季度',
            type: 'bar',
            itemStyle: {
              normal: {
                color: '#006699',
                barBorderRadius: 0,
                label: {
                  show: true,
                  textStyle: {
                    color: '#fff'
                  },
                  position: 'top',
                  formatter(p) {
                    return p.value > 0 ? p.value : ''
                  },
                  fontSize: 12
                }
              }
            },
            data: [
              327,
              776,
              607,
              1000,
              740,
              682,
              404
            ]
          },
          {
            name: '第四季度',
            type: 'bar',
            itemStyle: {
              normal: {
                color: '#e5323e',
                barBorderRadius: 0,
                label: {
                  show: true,
                  textStyle: {
                    color: '#fff'
                  },
                  position: 'top',
                  formatter(p) {
                    return p.value > 0 ? p.value : ''
                  },
                  fontSize: 12
                }
              }
            },
            data: [
              1327,
              376,
              1107,
              450,
              340,
              1082,
              774
            ]
          }
          ]
        })
      }
    }
  }
</script>
<style>
  #chart2 {
    width: 100%;
    height: 100%;
  }
</style>
