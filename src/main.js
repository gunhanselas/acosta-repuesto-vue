import Vue from 'vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {BootstrapVue} from 'bootstrap-vue'
import App from './App.vue'
import VueInputAutowidth from 'vue-input-autowidth'


import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)
Vue.use(VueInputAutowidth)

Vue.config.productionTip = false
Vue.config.silent = true

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// var ApiRestUrl = "http://localhost:8080/sistema-cobro/rest-resources/"
