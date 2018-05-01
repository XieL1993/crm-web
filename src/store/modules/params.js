const params = {
  state: {
    opportunityId: window.sessionStorage.getItem('opportunityId'),
    activityId: window.sessionStorage.getItem('activityId')
  },
  mutations: {
    SET_OPPORTUNITYID(state, tuid) {
      state.opportunityId = tuid
    },
    SET_ACTIVITYID(state, tuid) {
      state.activityId = tuid
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
    }
  }
}
export default params
