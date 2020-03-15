import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

// This must be executed before Vue is initialized for guard to use the token.
store.dispatch('user/loadToken')

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
