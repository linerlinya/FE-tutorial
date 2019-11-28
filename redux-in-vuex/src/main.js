import Vue from 'vue'
import store from './store.js'
import App from './App.vue'

Vue.config.productionTip = false

Vue.prototype.$store = store

new Vue({
  render: h => h(App),
}).$mount('#app')
