import Cookies from 'js-cookie'

const app = {
  state: {
    menusRoot: [], // 有多个子系统
    menusNoRoot: [] // 仅有一个系统[没有头部菜单]
  },
  mutations: {
    SET_MENUS_ROOT(state, data) {
      state.menusRoot = data
    },
    SET_MENUS_NO_ROOT(state, data) {
      state.menusNoRoot = data
    }
  },
  actions: {
    GenerateMenuByMenus({ commit }, data) {
      const menus = JSON.parse(window.sessionStorage.getItem('menus'))
      if (menus && menus.length > 0) {
        // menusType：0无topMenu，1有topMenu
        if (window.sessionStorage.getItem('menusType') === '1') {
          commit('SET_MENUS_ROOT', menus)
        } else {
          commit('SET_MENUS_NO_ROOT', menus)
        }
      } else {
        if (data && data.length > 0) {
          // menu.parentCode === 'BIZFRAME //头部根路径
          const newMenu = data.filter(menu => {
            return !menu.hidden && menu.parentId === 'BIZFRAME'
          })
          window.sessionStorage.setItem('menus', JSON.stringify(newMenu))
          if (newMenu.length > 0) {
            window.sessionStorage.setItem('menusType', '1')
            commit('SET_MENUS_ROOT', newMenu)
          } else {
            window.sessionStorage.setItem('menusType', '0')
            commit('SET_MENUS_NO_ROOT', newMenu)
          }
        }
      }
    }
  }
}
export default app
