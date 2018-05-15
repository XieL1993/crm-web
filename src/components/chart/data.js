export const chartData = {
  title: '我的业绩报表',
  xAxis: ['第三方支付', '独立基金销售机构', '基金', '基金管理', '期货', '私募', '证券', '证券子公司', '其他'],
  series: [
    {
      name: '第一季度',
      type: 'bar',
      color: '#fabd38',
      position: 'top',
      data: [709, 1917, 2455, 2610, 1719, 1433, 1544, 678, 987]
    },
    {
      name: '第二季度',
      type: 'bar',
      color: '#4cabce',
      position: 'top',
      data: [1327, 1776, 507, 1200, 800, 482, 604, 345, 765]
    },
    {
      name: '第三季度',
      type: 'bar',
      color: '#006699',
      position: 'top',
      data: [327, 776, 607, 1000, 740, 682, 404, 544, 767]
    },
    {
      name: '第四季度',
      type: 'bar',
      color: '#e5323e',
      position: 'top',
      data: [1327, 376, 1107, 450, 340, 1082, 774, 999, 777]
    }
  ]
}
export const chartData2 = {
  title: '我的业绩报表',
  xAxis: ['1.0产品', '2.0产品', '3.0产品'],
  series: [
    {
      name: '第一季度',
      type: 'bar',
      color: '#fabd38',
      position: 'top',
      data: [709, 1917, 2455]
    },
    {
      name: '第二季度',
      type: 'bar',
      color: '#4cabce',
      position: 'top',
      data: [1327, 1776, 507]
    },
    {
      name: '第三季度',
      type: 'bar',
      color: '#006699',
      position: 'top',
      data: [327, 776, 607]
    },
    {
      name: '第四季度',
      type: 'bar',
      color: '#e5323e',
      position: 'top',
      data: [1327, 376, 1107]
    }
  ]
}
export const chartData3 = {
  title: '合同金额变动',
  xAxis: ['2016-09-30', '2016-12-31', '2017-03-30', '2017-06-30', '2017-09-30', '2017-12-31', '2018-03-31'],
  series: [
    {
      name: '2.0产品',
      type: 'bar',
      stack: 'total',
      color: '#fabd38',
      position: 'insideTop',
      data: [700, 800, 750, 600, 720, 650, 500]
    },
    {
      name: '3.0产品',
      type: 'bar',
      stack: 'total',
      color: '#4a94fa',
      position: 'top',
      data: [500, 600, 450, 520, 620, 650, 550]
    },
    {
      name: '合计',
      type: 'line',
      stack: 'total',
      color: '#fabd38',
      position: 'top',
      data: [1200, 1400, 1200, 1120, 1340, 1300, 1150]
    }
  ]
}
