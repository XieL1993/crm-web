const getters = {
  token: state => state.user.token,
  optAuths: state => state.user.optAuths,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters

}
export default getters
