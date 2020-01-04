import filter from 'lodash/filter'
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex'

import {
  NotificationType,
  NotificationStateType,
  NotificationWithoutIdType,
  RootStateType
} from '@/types/store'

export const namespaced: boolean = true

export const state: NotificationStateType = {
  notifications: []
}

let nextId: number = 1

export const mutations: MutationTree<NotificationStateType> = {
  PUSH(state, notification: NotificationWithoutIdType) {
    state.notifications.push({ ...notification, id: nextId++ })
  },
  DELETE(state, notification: NotificationType) {
    state.notifications = filter(state.notifications, obj => obj.id !== notification.id)
  }
}
export const actions: ActionTree<NotificationStateType, RootStateType> = {
  add({ commit }, notification: NotificationWithoutIdType) {
    commit('PUSH', notification)
  },
  remove({ commit }, notification: NotificationType) {
    commit('DELETE', notification)
  }
}

export const notification: Module<NotificationStateType, RootStateType> = {
  namespaced,
  state,
  actions,
  mutations
}
