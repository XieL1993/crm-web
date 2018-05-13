import axios from 'axios'
import store from '../store'
import router from '../router'

const httpFetch = axios.create({
  baseURL: config.baseUrl,// eslint-disable-line
  timeout: 15000 // request timeout
})

httpFetch.interceptors.request.use(config => {
  // 屏蔽不需要加token头的接口
  const flag = /getSecurityKey|getCheckCode|login/.test(config.url)
  if (store.getters.token && !flag) {
    config.headers.Authorization = `${store.getters.token}`
    config.headers.tuid = `${store.getters.tuid}`
  }
  return config
}, error => {
  console.error(error)
  return Promise.reject(error)
})
httpFetch.interceptors.response.use(response => {
  // axios处理ie返回时为String类型
  if (response.data && typeof response.data === 'string') {
    response.data = JSON.parse(response.data)
  }
  if (!response || response.status !== 200) {
    console.error(`response.status:${response.status}`)
    return Promise.reject(new Error(`response.status:${response.status}`))
  } else if (response.data.success !== 1) {
    if (/1002|1006|1007/.test(response.data.code)) {
      // 重新登录
      if (router.history.current.path !== '/login') {
        router.replace({ path: '/login' })
      }
    }
    console.error(response.data.msg)
    return Promise.reject(new Error(response.data.msg))
  } else {
    return response.data.data
  }
}, error => {
  console.error(error)
  return Promise.reject(error)
})
export default httpFetch
