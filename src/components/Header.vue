<template>
  <v-app-bar absolute color="primary" dark app>
    <v-toolbar-title>{{ title }}</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn :to="{ name: 'contests' }" class="mr-4" rounded text>Active Contests</v-btn>
    <v-btn :to="{ name: 'results' }" class="mr-4" rounded text>Results</v-btn>

    <v-menu :offset-y="true" :nudge-top="-4">
      <template v-slot:activator="{ on }">
        <v-btn class="mr-4" icon v-on="on">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>
      <v-list v-if="!loggedIn">
        <v-list-item :to="{ name: 'user-register' }">
          <v-list-item-title>Register</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item :to="{ name: 'user-login' }">
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-list v-else>
        <v-list-item :to="{ name: 'user-profile' }">
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-title @click="logout">Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'

import { mapGetters } from 'vuex'

export default Vue.extend({
  name: 'app-header',
  props: ['title'],
  computed: mapGetters('user', ['loggedIn']),
  methods: {
    logout() {
      this.$store.dispatch('user/logout')
    }
  }
})
</script>
