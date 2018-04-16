import fetch from './httpFetch'
import Cookies from 'js-cookie'
import { DES } from '../utils/BizSecurity'

let key1, key2, key3

// 登录-获取key
function getKeys() {
  return fetch.get('/getSecurityKey.json')
}

export function login(username, password, checkCode) {
  let loginName
  const resCode = 'bizSign'
  const bizEncryptFalg = '3DES'
  const opCode = 'bizSignIn2'
  const sessionId = Cookies.get('checkCode-token')
  return new Promise((resolve, reject) => {
    getKeys().then(res => {
      key1 = res.data.key1
      key2 = res.data.key2
      key3 = res.data.key3
      loginName = DES.encrypt(username, key1, key2, key3)
      password = DES.encrypt(password, key1, key2, key3)
      const data = {
        loginName,
        password,
        checkcode: checkCode,
        resCode,
        bizEncryptFalg,
        opCode,
        key1,
        key2,
        key3
      }
      resolve(fetch.post(`/submitLogin.json;jsessionid=${sessionId}`, data))
    })
  })
}

export function getMenuList(token) {
  return fetch.get(`/getUserMenuList.json;jsessionid=${token}`)
}
