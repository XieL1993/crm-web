export function getOption(obj) {
  const baseConfig = {
    backgroundColor: '#364150',
    title: {
      text: obj.title,
      // subtext: '(单位:万元)',
      x: '20',
      top: '20',
      textStyle: {
        color: '#ffffff',
        fontSize: '20'
      },
      subtextStyle: {
        color: '#ffffff',
        fontSize: '12'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      borderWidth: 0,
      top: 110,
      bottom: 50,
      textStyle: {
        color: '#ffffff'
      }
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
    legend: {
      x: 'center',
      top: '25',
      textStyle: {
        color: '#ffffff'
      },
      data: []
    },
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
      data: obj.xAxis// x轴配置
    }],
    series: []
  }
  for (const item of obj.series) {
    baseConfig.legend.data.push(item.name)
    const eneity = {
      name: item.name,
      type: item.type,
      barMaxWidth: 60,
      barGap: '0',
      itemStyle: {
        normal: {
          color: item.color,
          label: {
            show: true,
            textStyle: {
              color: '#fff'
            },
            position: item.position,
            formatter(p) {
              return p.value > 0 ? p.value : ''
            },
            fontSize: 12
          }
        }
      },
      data: item.data
    }
    if (eneity.type === 'line') {
      eneity.symbol = 'circle'
      eneity.symbolSize = 10
    }
    if (item.stack) {
      eneity.stack = item.stack
    }
    baseConfig.series.push(eneity)
  }
  return baseConfig
}
