<template>
  <v-snackbar
    :value="true"
    :top="true"
    :right="true"
    :color="notification.type"
  >
      {{ notification.message }}
      <v-btn dark text rounded @click="closeSnackbar()">
        Close
      </v-btn>
  </v-snackbar>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      timeout: null
    }
  },
  mounted() {
    this.timeout = setTimeout(() => this.closeSnackbar(), 5000)
  },
  beforeDestroy() {
    clearTimeout(this.timeout)
  },
  methods: {
    closeSnackbar() {
      this.remove(this.notification)
    },
    ...mapActions('notification', ['remove'])
  }
}
</script>
