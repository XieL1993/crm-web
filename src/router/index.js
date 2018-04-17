import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import _404 from '../components/404'

Vue.use(Router)
/* 常量路由 */
export const constantRouterMap = [
  {
    path: '/login',
    component: Login,
    hidden: true
  },
  {
    path: '/404',
    component: _404,
    hidden: true
  }
]
export default new Router({
  scrollBehavior() {
    return { y: 0 }
  },
  routes: constantRouterMap
})
