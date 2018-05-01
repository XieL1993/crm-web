// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import './common/styles/index.scss'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import filters from './common/filters'
import waves from './common/directive/waves'

Vue.use(waves)
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))
import './icons'

Vue.use(Element, { size: 'medium' })

Vue.config.productionTip = false
import './common/js/permission'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
