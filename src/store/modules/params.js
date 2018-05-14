const params = {
  state: {
    // 客户
    addCustomerParams: JSON.parse(window.sessionStorage.getItem('addCustomerParams')),
    editCustomerParams: JSON.parse(window.sessionStorage.getItem('editCustomerParams')),
    detailCustomerParams: JSON.parse(window.sessionStorage.getItem('detailCustomerParams')),
    // 商机
    addOpportunityParams: JSON.parse(window.sessionStorage.getItem('addOpportunityParams')),
    editOpportunityParams: JSON.parse(window.sessionStorage.getItem('editOpportunityParams')),
    detailOpportunityParams: JSON.parse(window.sessionStorage.getItem('detailOpportunityParams')),
    // 活动
    addActivityParams: JSON.parse(window.sessionStorage.getItem('addActivityParams')),
    editActivityParams: JSON.parse(window.sessionStorage.getItem('editActivityParams')),
    detailActivityParams: JSON.parse(window.sessionStorage.getItem('detailActivityParams')),
    // 合同
    addContractParams: JSON.parse(window.sessionStorage.getItem('addContractParams')),
    editContractParams: JSON.parse(window.sessionStorage.getItem('editContractParams')),
    detailContractParams: JSON.parse(window.sessionStorage.getItem('detailContractParams')),
    // 收款
    addInvoiceParams: JSON.parse(window.sessionStorage.getItem('addInvoiceParams')),
    editInvoiceParams: JSON.parse(window.sessionStorage.getItem('editInvoiceParams')),
    detailInvoiceParams: JSON.parse(window.sessionStorage.getItem('detailInvoiceParams'))
  },
  mutations: {
    // 客户
    ADD_CUSTOMER_PARAMS(state, params) {
      state.addCustomerParams = params
    },
    EDIT_CUSTOMER_PARAMS(state, params) {
      state.editCustomerParams = params
    },
    DETAIL_CUSTOMER_PARAMS(state, params) {
      state.detailCustomerParams = params
    },
    // 商机
    ADD_OPPORTUNITY_PARAMS(state, params) {
      state.addOpportunityParams = params
    },
    EDIT_OPPORTUNITY_PARAMS(state, params) {
      state.editOpportunityParams = params
    },
    DETAIL_OPPORTUNITY_PARAMS(state, params) {
      state.detailOpportunityParams = params
    },
    // 活动
    ADD_ACTIVITY_PARAMS(state, params) {
      state.addActivityParams = params
    },
    EDIT_ACTIVITY_PARAMS(state, params) {
      state.editActivityParams = params
    },
    DETAIL_ACTIVITY_PARAMS(state, params) {
      state.detailActivityParams = params
    },
    // 合同
    ADD_CONTRACT_PARAMS(state, params) {
      state.addContractParams = params
    },
    EDIT_CONTRACT_PARAMS(state, params) {
      state.editContractParams = params
    },
    DETAIL_CONTRACT_PARAMS(state, params) {
      state.detailContractParams = params
    },
    // 收款
    ADD_INVOICE_PARAMS(state, params) {
      state.addInvoiceParams = params
    },
    EDIT_INVOICE_PARAMS(state, params) {
      state.editInvoiceParams = params
    },
    DETAIL_INVOICE_PARAMS(state, params) {
      state.detailInvoiceParams = params
    }
  },
  actions: {
    // 客户
    addCustomerParams({ commit }, params) {
      window.sessionStorage.setItem('addCustomerParams', JSON.stringify(params))
      commit('ADD_CUSTOMER_PARAMS', params)
    },
    editCustomerParams({ commit }, params) {
      window.sessionStorage.setItem('editCustomerParams', JSON.stringify(params))
      commit('EDIT_CUSTOMER_PARAMS', params)
    },
    detailCustomerParams({ commit }, params) {
      window.sessionStorage.setItem('detailCustomerParams', JSON.stringify(params))
      commit('DETAIL_CUSTOMER_PARAMS', params)
    },
    // 商机
    addOpportunityParams({ commit }, params) {
      window.sessionStorage.setItem('addOpportunityParams', JSON.stringify(params))
      commit('ADD_OPPORTUNITY_PARAMS', params)
    },
    editOpportunityParams({ commit }, params) {
      window.sessionStorage.setItem('editOpportunityParams', JSON.stringify(params))
      commit('EDIT_OPPORTUNITY_PARAMS', params)
    },
    detailOpportunityParams({ commit }, params) {
      window.sessionStorage.setItem('detailOpportunityParams', JSON.stringify(params))
      commit('DETAIL_OPPORTUNITY_PARAMS', params)
    },
    // 活动
    addActivityParams({ commit }, params) {
      window.sessionStorage.setItem('addActivityParams', JSON.stringify(params))
      commit('ADD_ACTIVITY_PARAMS', params)
    },
    editActivityParams({ commit }, params) {
      window.sessionStorage.setItem('editActivityParams', JSON.stringify(params))
      commit('EDIT_ACTIVITY_PARAMS', params)
    },
    detailActivityParams({ commit }, params) {
      window.sessionStorage.setItem('detailActivityParams', JSON.stringify(params))
      commit('DETAIL_ACTIVITY_PARAMS', params)
    },
    // 合同
    addContractParams({ commit }, params) {
      window.sessionStorage.setItem('addContractParams', JSON.stringify(params))
      commit('ADD_CONTRACT_PARAMS', params)
    },
    editContractParams({ commit }, params) {
      window.sessionStorage.setItem('editContractParams', JSON.stringify(params))
      commit('EDIT_CONTRACT_PARAMS', params)
    },
    detailContractParams({ commit }, params) {
      window.sessionStorage.setItem('detailContractParams', JSON.stringify(params))
      commit('DETAIL_CONTRACT_PARAMS', params)
    },
    // 收款
    addInvoiceParams({ commit }, params) {
      window.sessionStorage.setItem('addInvoiceParams', JSON.stringify(params))
      commit('ADD_INVOICE_PARAMS', params)
    },
    editInvoiceParams({ commit }, params) {
      window.sessionStorage.setItem('editInvoiceParams', JSON.stringify(params))
      commit('EDIT_INVOICE_PARAMS', params)
    },
    detailInvoiceParams({ commit }, params) {
      window.sessionStorage.setItem('detailInvoiceParams', JSON.stringify(params))
      commit('DETAIL_INVOICE_PARAMS', params)
    }
  }
}
export default params
