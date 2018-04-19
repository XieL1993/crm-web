const getters = {
  token: state => state.user.token,
  optAuths: state => state.user.optAuths,
  menus: state => state.app.menus,
  newRouters: state => state.permission.newRouters,
  sidebar: state => state.app.sidebar,
  tabViews: state => state.tabViews.tabViews
}
export default getters
