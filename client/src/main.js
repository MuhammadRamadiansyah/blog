import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap-reboot.css'
import 'bootstrap/dist/css/bootstrap-grid.css'

import jQuery from 'jquery'
global.jQuery = jQuery

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
