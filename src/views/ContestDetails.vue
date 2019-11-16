<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Contest detail - {{ contest.title }}</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

import { ContestType } from '../types/api'

export default Vue.extend({
  name: 'contest-details',
  props: ['slug'],
  computed: {
    contest(): ContestType {
      return this.$store.getters['contest/getContestBySlug'](this.slug)
    }
  }
})
</script>
