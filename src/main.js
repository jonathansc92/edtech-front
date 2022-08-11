import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import { VueMaskDirective } from 'v-mask'
import store from './store'

Vue.directive('mask', VueMaskDirective);
Vue.config.productionTip = false
new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
