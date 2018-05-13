const getters = {
  token: state => state.user.token,
  tuid: state => state.user.tuid,
  menus: state => state.app.menus,
  newRouters: state => state.permission.newRouters,
  sidebar: state => state.app.sidebar,
  tabViews: state => state.tabViews.tabViews,
  opportunityId: state => state.params.opportunityId,
  activityId: state => state.params.activityId,
  contractId: state => state.params.contractId,
  invoiceId: state => state.params.invoiceId,
  addActivityParams: state => state.params.addActivityParams
}
export default getters
