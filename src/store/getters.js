const getters = {
  token: state => state.user.token,
  tuid: state => state.user.tuid,
  menus: state => state.app.menus,
  newRouters: state => state.permission.newRouters,
  sidebar: state => state.app.sidebar,
  tabViews: state => state.tabViews.tabViews,
  // 客户
  addCustomerParams: state => state.params.addCustomerParams,
  editCustomerParams: state => state.params.editCustomerParams,
  detailCustomerParams: state => state.params.detailCustomerParams,
  // 商机
  addOpportunityParams: state => state.params.addOpportunityParams,
  editOpportunityParams: state => state.params.editOpportunityParams,
  detailOpportunityParams: state => state.params.detailOpportunityParams,
  // 活动
  addActivityParams: state => state.params.addActivityParams,
  editActivityParams: state => state.params.editActivityParams,
  detailActivityParams: state => state.params.detailActivityParams,
  // 合同
  addContractParams: state => state.params.addContractParams,
  editContractParams: state => state.params.editContractParams,
  detailContractParams: state => state.params.detailContractParams,
  // 收款
  addInvoiceParams: state => state.params.addInvoiceParams,
  editInvoiceParams: state => state.params.editInvoiceParams,
  detailInvoiceParams: state => state.params.detailInvoiceParams,
  // 角色
  roleParams: state => state.params.roleParams,
  // 用户
  userParams: state => state.params.userParams
}
export default getters
