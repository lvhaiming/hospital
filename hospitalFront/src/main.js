// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import axios from './lib/axios'
import validate from './lib/validate'
import importComponent from './components/index'
import { page } from './lib/until'
import * as echarts from 'echarts';

import './css/index.less'
import './css/content.less'

Vue.use(iView)
importComponent(Vue)

Vue.config.productionTip = false
Vue.prototype.$page = page
Vue.prototype.$http = axios
Vue.prototype.$validate = validate
Vue.prototype.$echarts = echarts

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
