<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Contests list</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4" v-for="contest in contests" :key="contest.slug">
        <contest-card :contest="contest"> </contest-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

import ContestCard from '../components/ContestCard.vue'

export default Vue.extend({
  name: 'contests-list',
  components: {
    'contest-card': ContestCard
  },
  computed: mapState('contest', ['contests'])
})
</script>
