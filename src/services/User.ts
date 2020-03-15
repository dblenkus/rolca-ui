import { apiClient } from './Base'

export default {
  login(email: string, password: string) {
    return apiClient.post('login', { email, password })
  }
}
