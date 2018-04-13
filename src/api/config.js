import Qs from 'qs'

export default {
  url: '/login',
  baseURL: 'http://192.168.58.189:8080/server',
  method: 'get',
  transformRequest: [function (data) {
    data = Qs.stringify(data)
    return data
  }],
  transformResponse: [
    function (data) {
      return data
    }
  ],
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  // 默认parameter参数
  params: {},
  // 序列化param
  paramsSerializer: function (params) {
    return Qs.stringify(params)
  },
  // 默认post参数，使用axios.post(url,{},config);如果没有额外的也必须要用一个空对象，否则会报错
  data: {},
  timeout: 500000000,
  // 是否跨站点访问控制请求
  withCredentials: false, // default
  responseType: 'json', // default
  maxContentLength: 2000,
  validateStatus: function (status) {
    return status >= 200 && status < 300 // default
  },
  maxRedirects: 5
}
