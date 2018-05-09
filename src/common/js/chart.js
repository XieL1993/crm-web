const baseConfig = {
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
  }]
}
const baseXaxis = {
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
  data: []
}
const baseLegend = {
  x: 'center',
  top: '20',
  textStyle: {
    color: '#ffffff'
  },
  data: []
}

export function getOption(obj) {
  const legendData = []
  const seriesData = []
  for (const item of obj.series) {
    legendData.push(item.name)
    // 单柱数据及配置
    const series = {
      name: item.name,
      type: 'bar',
      barGap: '0',
      itemStyle: {
        normal: {
          color: item.color,
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
      data: item.data
    }
    seriesData.push(series)
  }
  baseXaxis.data = obj.xAxis// x轴配置
  baseLegend.data = legendData// 图例配置
  return Object.assign({}, baseConfig, { xAxis: [baseXaxis] }, { legend: baseLegend }, { series: seriesData })
}
