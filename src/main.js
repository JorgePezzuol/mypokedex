import Vue from 'vue'
import App from './App.vue'
import VueCookies from 'vue-cookies'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

import './assets/nes.min.css';
import './assets/nes.font.css';

Vue.use(VueAxios, axios)
Vue.use(VueCookies)

const axiosConfig = axios.create({
  baseURL: 'http://localhost:8000/api/',
  timeout: 1000
});

Vue.prototype.$axios = axios.create(axiosConfig);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
