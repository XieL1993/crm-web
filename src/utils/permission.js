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
      next({ path: '/login' })
    }
  } else {
    if (to.path === '/login') { // 已登录
      next({ path: '/' })
    } else {
      // 本地存储有menus，之所以要用sessionStorage不用vuex是因为vuex页面刷新会消失
      const menus = JSON.parse(window.sessionStorage.getItem('menus'))
      if (menus && menus.length > 0) {
        if (store.getters.addRouters.length > 0) { // 已生成路由
          if (to.matched.length === 0) {
            from.path ? next({ path: from.path }) : next({ path: '/' })// 不存在此路由则跳会from或者主页
          } else {
            /* matched:包含当前匹配的路径中所包含的所有片段所对应的配置参数对象
             例如，/home/news/detail/:id这条路径，它包含3条匹配的路由：
             /home/news/detail/:id
             /home/news
             /home*/
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
            next({ ...to })
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
              next({ ...to })
            })
          }
        })
      }
    }
  }
})
router.afterEach(() => {
  NProgress.done()
})
