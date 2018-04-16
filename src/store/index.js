import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import Getters from './getters'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    user
  },
  Getters
})
export default store
