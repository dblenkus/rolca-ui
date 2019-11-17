<template>
  <v-card>
    <v-img v-if="contest.image" class="align-end" height="200px" :src="contest.image"></v-img>
    <v-img v-else class="align-end" height="200px" src="@/assets/no-photo-available.png"></v-img>

    <v-card-title class="pb-0">{{ contest.title }}</v-card-title>

    <v-card-text class="text--primary">
      <div>{{ contest.description }}</div>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="contestLink" color="primary" text rounded>Open</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: ['contest'],
  methods: {
    contestLink() {
      this.$router.push({ name: 'contest-details', params: { slug: this.contest.slug } })
    }
  }
})
</script>
