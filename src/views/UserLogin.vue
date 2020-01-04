<template>
  <v-container>
    <v-row justify="center">
      <v-spacer></v-spacer>
      <v-col cols="4">
        <v-card outlined>
          <v-card-title>Login</v-card-title>
          <v-container>
            <v-row justify="space-between">
              <v-col cols="12">
                <v-form @submit.prevent="submit" v-model="valid">
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    prepend-icon="mdi-account-circle"
                    required
                  />

                  <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    :type="showPassword ? 'text' : 'password'"
                    label="Password"
                    prepend-icon="mdi-lock"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"
                    required
                  />

                  <v-alert v-if="error" dense outlined type="error">{{error}}</v-alert>

                  <v-btn type="submit" :disabled="!valid" color="success">Login</v-btn>
                  <div class="text-center">
                    Don't have an account?
                    <router-link :to="{ name: 'user-register' }">Register.</router-link>
                  </div>
                </v-form>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
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
      showPassword: false,
      email: '',
      emailRules: [
        (email: string) => !!email || 'E-mail is required',
        (email: string) => /.+@.+\..+/.test(email) || 'E-mail must be valid'
      ],
      password: '',
      passwordRules: [
        (password: string) => password.length >= 6 || 'Password is too short'
      ],
      error: null
    }
  },
  methods: {
    async submit() {
      try {
        await this.$store.dispatch('user/login', {
          email: this.email,
          password: this.password
        })

        let next: string | null = this.$route.query.next[0]
        if (next) {
          this.$router.push({ path: next })
        } else {
          this.$router.push({ name: 'home' })
        }
      } catch (error) {
        this.error = error.response.data.non_field_errors[0]
      }
    }
  }
})
</script>
