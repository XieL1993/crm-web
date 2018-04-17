import router from './../router'
import store from './../store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getMenuList } from '../api/login'

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (!store.getters.token) { // 未登录
    if (whiteList.includes(to.path)) {
      next()// 未登录时，调整页面如果在白名单中则放行，否则跳转登录页
    } else {
      // set the replace: true so the navigation will not leave a history record
      next({ path: '/login', replace: true })
    }
  } else {
    if (to.path.toLowerCase() === '/login') { // 已登录
      next({ path: '/', replace: true })
      if (from.path === '/mainIndex') {
        NProgress.done() // 在首页通过地址栏访问login页的话，会重定向回首页，这样afterEach不执行
      }
    } else {
      // 本地存储有menus，之所以要用sessionStorage不用vuex是因为vuex页面刷新会消失
      const menus = JSON.parse(window.sessionStorage.getItem('menus'))
      if (menus && menus.length > 0) {
        if (store.getters.addRouters.length > 0) { // 已生成路由
          if (to.matched.length === 0) {
            next({ path: '/404', replace: true })// to的路由不存在，跳转404
          } else {
            next()// 如果to的路由存在则直接跳转
          }
        } else {
          // 未生成路由
          // 生成菜单并存储到本地以及vuex中
          store.dispatch('GenerateMenuByMenus', menus)
          // 生成路由并存储到vuex中
          store.dispatch('GenerateRoutesByMenus', menus).then(() => {
            router.addRoutes(store.getters.addRouters)// 将动态生成的路由真正添加到vue router中
            // 路由未定义
            // set the replace: true so the navigation will not leave a history record
            next({ ...to, replace: true })
          })
        }
      } else {
        // 本地存储中没有menus，向服务器请求获取
        getMenuList(store.getters.token).then(res => {
          if (res && res.data && res.data.length > 0) {
            // 生成菜单并存储到本地以及vuex中
            store.dispatch('GenerateMenuByMenus', res.data)
            // 生成路由并存储到vuex中
            store.dispatch('GenerateRoutesByMenus', res.data).then(() => {
              router.addRoutes(store.getters.addRouters)// 将动态生成的路由真正添加到vue router中
              // 路由未定义
              next({ ...to, replace: true })
            })
          } else {
            // 请求菜单失败，可能是token失效，返回登录页
            alert('请求菜单失败！')// 这是个bug，不过token失效不好测试，等以后再修改，参考方案可以调用logout
          }
        })
      }
    }
  }
})
router.afterEach(() => {
  NProgress.done()
})
