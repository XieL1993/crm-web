import fetch from './httpFetch'
import { getAesString } from '../common/js/Security'
import store from '../store'

// 登录-获取key
function getKeys() {
  return fetch({
    method: 'get',
    url: '/anon/getSecurityKey',
    params: { tokenKey: 'get' }
  })
}

export function login(username, pwd, code) {
  return new Promise((resolve, reject) => {
    getKeys().then(data => {
      const password = getAesString(pwd, data.tokenKey)
      const formdata = new FormData()
      formdata.append('username', username)
      formdata.append('password', password)
      formdata.append('code', code)
      formdata.append('methodName', 'login')
      formdata.append('timestamp', new Date().getTime())
      resolve(fetch({
        method: 'post',
        url: '/anon/login',
        data: formdata
      }))
    }).catch((error) => {
      reject(error)
    })
  })
}

export function getCheckCode() {
  return fetch({
    method: 'get',
    url: '/anon/getCheckCode',
    params: { codeKey: 'get' }
  })
}

export function getMenuList() {
  return fetch.get('/sys/resource/menus')
}

export function logout(tuid) {
  return fetch.post('/sys/user/logout', { password: tuid })
}

export function getDictItem(entryCode) {
  return fetch({
    method: 'get',
    url: '/system/dict/items',
    params: { entryCode }
  })
}

/**
 * @description 获取用户列表
 * @param {Number} userType 用户类型 0：bd，1：领导，2：销售
 */
export function getUserList(userType) {
  return fetch({
    method: 'get',
    url: '/sys/user',
    params: {
      tuid: store.getters.tuid,
      timestamp: new Date().getTime(),
      sign: '',
      userType
    }
  })
}

export function productTree() {
  return fetch({
    method: 'get',
    url: '/product/tree',
    params: {
      tuid: store.getters.tuid
    }
  })
}
