import filter from 'lodash/filter'

import { NotificationType, NotificationStateType, NotificationWithoutIdType } from '@/types/store'

export const namespaced = true

export const state: NotificationStateType = {
  notifications: [
    {
      'id': -1,
      'type': 'success',
      'message': "This is a notification.",
    }, {
      'id': -2,
      'type': 'error',
      'message': "This is an error",
    }
  ]
}

let nextId: number = 1

export const mutations = {
  PUSH(state: NotificationStateType, notification: NotificationWithoutIdType) {
    state.notifications.push({...notification, id: nextId++})
  },
  DELETE(state: NotificationStateType, notification: NotificationType) {
    state.notifications = filter(state.notifications, (obj) => obj.id !== notification.id)
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
