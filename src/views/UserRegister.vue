<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Register</h1>
      </v-col>
    </v-row>

    <v-row class="text-center">
      <v-col md="4" offset-md="4">
        <v-form ref="form" @submit.prevent="submit" v-model="valid" validation>
          <v-text-field v-model="name" label="Full name" required></v-text-field>

          <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

          <v-text-field v-model="password" label="Password" required></v-text-field>

          <v-btn type="submit" :disabled="!valid" color="success">Register</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'register',
  data() {
    return {
      valid: false,
      name: '',
      email: '',
      emailRules: [
        (email: string) => !!email || 'E-mail is required',
        (email: string) => /.+@.+\..+/.test(email) || 'E-mail must be valid'
      ],
      password: ''
    }
  },
  methods: {
    sumbit() {}
  }
})
</script>
