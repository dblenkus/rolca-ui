import filter from 'lodash/filter'

import { NotificationType, NotificationStateType, NotificationWithoutIdType } from '@/types/store'

export const namespaced = true

export const state: NotificationStateType = {
  notifications: []
}

let nextId: number = 1

export const mutations = {
  PUSH(state: NotificationStateType, notification: NotificationWithoutIdType) {
    state.notifications.push({ ...notification, id: nextId++ })
  },
  DELETE(state: NotificationStateType, notification: NotificationType) {
    state.notifications = filter(state.notifications, obj => obj.id !== notification.id)
  }
}
export const actions = {
  add({ commit }: { commit: Function }, notification: NotificationWithoutIdType) {
    commit('PUSH', notification)
  },
  remove({ commit }: { commit: Function }, notification: NotificationType) {
    commit('DELETE', notification)
  }
}
