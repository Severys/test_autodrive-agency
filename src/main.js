import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './assets/tailwind.css'
import { VueMaskDirective } from 'v-mask'

Vue.config.productionTip = false

Vue.directive('mask', VueMaskDirective)


new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

