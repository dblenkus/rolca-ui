import { apiClient } from './Base'

export default {
  getContests() {
    return apiClient.get('contest')
  }
}
