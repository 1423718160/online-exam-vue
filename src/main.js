// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
import echarts from 'echarts'
import axios from 'axios'
import Home from './components/Home.vue'
import global_ from './components/Global.vue'
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.GLOBAL = global_
axios.defaults.baseURL=global_.BASE_URL
Vue.prototype.$http = axios
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(router)
/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(Home)
}).$mount('#app')
