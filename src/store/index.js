import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import permission from './modules/permission'
import app from './modules/app'
import tabViews from './modules/tabViews'
import params from './modules/params'
import getters from './getters'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    user,
    permission,
    app,
    tabViews,
    params
  },
  getters
})
export default store
