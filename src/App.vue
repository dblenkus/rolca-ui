<template>
  <v-app>

    <app-header :title='app_name' />

    <v-content>
      <notification-container></notification-container>
      <router-view></router-view>
    </v-content>

    <app-footer />

  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex'

import Footer from './components/Footer.vue'
import Header from './components/Header.vue'
import NotificationContainer from './components/NotificationContainer.vue'

export default Vue.extend({
  name: 'App',
  components: {
    'app-footer': Footer,
    'app-header': Header,
    'notification-container': NotificationContainer,
  },
  computed: mapState([
    'app_name'
  ])
});
</script>
