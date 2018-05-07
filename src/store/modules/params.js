const params = {
  state: {
    opportunityId: window.sessionStorage.getItem('opportunityId'),
    activityId: window.sessionStorage.getItem('activityId'),
    contractId: window.sessionStorage.getItem('contractId'),
    invoiceId: window.sessionStorage.getItem('invoiceId')
  },
  mutations: {
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
