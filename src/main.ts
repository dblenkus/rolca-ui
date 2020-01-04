import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  created() {
    let userString = localStorage.getItem('user')
    if (userString) {
      try {
        let userData = JSON.parse(userString)
        this.$store.commit('user/SET_USER', userData)
      } catch {
        localStorage.removeItem('user')
      }
    }
  },
  render: h => h(App)
}).$mount('#app')
