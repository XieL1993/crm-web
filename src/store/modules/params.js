const params = {
  state: {
    addActivityParams: JSON.parse(window.sessionStorage.getItem('addActivityParams')),
    opportunityId: window.sessionStorage.getItem('opportunityId'),
    activityId: window.sessionStorage.getItem('activityId'),
    contractId: window.sessionStorage.getItem('contractId'),
    invoiceId: window.sessionStorage.getItem('invoiceId')
  },
  mutations: {
    ADD_ACTIVITY_PARAMS(state, params) {
      state.addActivityParams = params
    },
    SET_OPPORTUNITYID(state, tuid) {
      state.opportunityId = tuid
    },
    SET_ACTIVITYID(state, tuid) {
      state.activityId = tuid
    },
    SET_CONTRACTID(state, tuid) {
      state.contractId = tuid
    },
    SET_INVOICEID(state, tuid) {
      state.invoiceId = tuid
    }
  },
  actions: {
    addActivityParams({ commit }, params) {
      window.sessionStorage.setItem('addActivityParams', JSON.stringify(params))
      commit('ADD_ACTIVITY_PARAMS', params)
    },
    setOpportunityId({ commit }, tuid) {
      window.sessionStorage.setItem('opportunityId', tuid)
      commit('SET_OPPORTUNITYID', tuid)
    },
    setActivityId({ commit }, tuid) {
      window.sessionStorage.setItem('activityId', tuid)
      commit('SET_ACTIVITYID', tuid)
    },
    setContractId({ commit }, tuid) {
      window.sessionStorage.setItem('contractId', tuid)
      commit('SET_CONTRACTID', tuid)
    },
    setInvoiceId({ commit }, tuid) {
      window.sessionStorage.setItem('invoiceId', tuid)
      commit('SET_INVOICEID', tuid)
    }
  }
}
export default params
