<template>
  <v-app>

    <app-header :title='app_name' />

    <v-content>
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

export default Vue.extend({
  name: 'App',
  components: {
    'app-footer': Footer,
    'app-header': Header,
  },
  computed: mapState([
    'app_name'
  ])
});
</script>
