import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { get } from '@/api/get'

Vue.config.productionTip = false

new Vue({
  store,
  mounted () {
    get()
  },
  render: (h) => h(App)
}).$mount('#app')
