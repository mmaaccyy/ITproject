// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' 
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

Vue.use(ElementUI)
Vue.config.productionTip = false
axios.defaults.timeout = 5000000;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = "http://110.64.87.87:8000/";
axios.defaults.withCredentials = true;
Vue.prototype.$http = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
