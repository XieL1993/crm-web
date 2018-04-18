import router from './../router'
import store from './../store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getMenuList } from '../api/login'

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (store.getters.token) { // 已登录
    const menus = JSON.parse(window.sessionStorage.getItem('menus'))
    if (menus && menus.length > 0) { // 本地已缓存menus
      if (store.getters.newRouters.length > 0) { // vuex已缓存menus
        next()
      } else {
        store.commit('SET_MENUS', menus)// 存储menus到vuex
        store.dispatch('createRoutesByMenus', menus).then(() => { // 创建和添加路由
          router.addRoutes(store.getters.newRouters)
          next({ ...to, replace: true })
        })
      }
    } else { // 本地存储中没有menus，向服务器请求获取
      getMenuList(store.getters.token).then(res => {
        if (res && res.data && res.data.length > 0 && res.data[0].children) {
          const menus = res.data[0].children
          window.sessionStorage.setItem('menus', JSON.stringify(menus))// 存储menus到本地
          store.commit('SET_MENUS', menus)// 存储menus到vuex
          // 生成路由并存储到vuex中
          store.dispatch('createRoutesByMenus', menus).then(() => {
            router.addRoutes(store.getters.newRouters)// 将所有路由真正添加到vue router中
            next({ ...to, replace: true })
          })
        } else {
          // 请求菜单失败，可能是token失效，返回登录页
          alert('请求菜单失败！')// 这是个bug，不过token失效不好测试，等以后再修改，参考方案可以调用logout
        }
      })
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()// 未登录时，调整页面如果在白名单中则放行，否则跳转登录页
    } else {
      // set the replace: true so the navigation will not leave a history record
      next({ path: '/login', replace: true })
    }
  }
})
router.afterEach(() => {
  NProgress.done()
})

