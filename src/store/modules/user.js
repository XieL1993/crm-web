import { login } from '../../api/login'
import Cookies from 'js-cookie'

const user = {
  state: {
    user: '',
    token: Cookies.get('Admin-Token'),
    optAuths: []
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_OPT_AUTHS(state, optAuths) {
      state.optAuths = optAuths
    }
  },
  actions: {
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password, userInfo.checkCode).then(response => {
          const data = response.data
          // return_code: 0  登录成功
          // return_code: -1 用户名错误
          // return_code: -2 密码错误
          if (data && data.return_code === '0') {
            Cookies.set('Admin-Token', data.sessionId)
            window.sessionStorage.setItem('userName', username)
            commit('SET_TOKEN', data.sessionId)
            commit('SET_OPT_AUTHS', data.optAuths)
          }
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default user