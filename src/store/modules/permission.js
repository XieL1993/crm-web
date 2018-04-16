import { constantRouterMap } from '../../router'
import Layout from '../../components/Layout'
import MainIndex from '../../views/mainIndex'

/**
 * 根据后台传回的menus,生成路由
 */
function filterRouterByMenus(router, menus) {
  if (menus && menus.length > 0) {
    for (const menu of menus) {
      if (menu.children && menu.children.length > 0) {
        // 若有子menu，继续遍历，父menu实际上只是用于生成Sidebar，只有最后一层才会生成路由
        filterRouterByMenus(router, menu.children)
      } else {
        // 将子menu添加到router中
        router.push({
          path: menu.url,
          name: menu.title,
          meta: {
            icon: menu.icon,
            hidden: menu.hidden
          },
          redirect: menu.redirect,
          component: resolve => import(`../../views${menu.url}.vue`).then(module => resolve(module))
        })
      }
    }
  }
  return router
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS(state, routers) {
      state.routers = [...constantRouterMap.concat(routers)]
      state.addRouters = [...routers]
    }
  },
  actions: {
    // 根据服务端菜单生成路由
    GenerateRoutesByMenus({ commit }, data) {
      return new Promise(resolve => {
        const accessedRouters = filterRouterByMenus([], data)
        const main = [{
          path: '/mainIndex',
          name: '首页',
          component: MainIndex,
          hidden: true
        }]
        const allRouter = [...main.concat(accessedRouters)]
        const route = [{
          path: '/',
          component: Layout, // 主布局，其他所有的子页面，包括mainIndex都是它的子路由
          redirect: '/mainIndex', // 因为主布局一开始是空的，所以重定向到它的第一个子页面
          children: allRouter
        }]
        commit('SET_ROUTERS', route)
        resolve()
      })
    }
  }
}
export default permission
