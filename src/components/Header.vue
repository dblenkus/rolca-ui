<template>
  <v-app-bar absolute color="primary" dark app>
    <v-toolbar-title>{{ title }}</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn :to="{ name: 'contests' }" class="ml-4" rounded text>Active Contests</v-btn>
    <v-btn :to="{ name: 'results' }" class="ml-4" rounded text>Results</v-btn>
    <v-btn :to="{ name: 'user-profile' }" class="ml-4" rounded text>
      <v-icon>mdi-account</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: ['title']
})
</script>
