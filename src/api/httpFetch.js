import axios from 'axios'
import config from './config'

const httpFetch = axios.create(config)
// request拦截器
httpFetch.interceptors.request.use(config => {
  return config
}, error => {
  Promise.reject(error)
})
httpFetch.interceptors.response.use(response => {
  // ie中res.data返回为string类型，chorme为obj类型
  if (response.data && typeof response.data === 'string') {
    response.data = JSON.parse(response.data)
  }
  // returnCode == -1代表登录出错,需要重新登录
  if (response.data && (response.data.returnCode === -1 || response.data.returnCode === -2 || response.data.returnCode === -3) || !response) {
    alert('未登录')
  } else {
    return response
  }
}, error => {
  Promise.reject(error)
})
export default httpFetch
