import axios from 'axios'
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex'

import { apiClient } from '@/services/Base'
import { UserStateType, RootStateType } from '@/types/store'
import { TokenType } from '@/types/api'

export const namespaced: boolean = true

export const state: UserStateType = {
  token: null
}

export const mutations: MutationTree<UserStateType> = {
  SET_TOKEN(state, tokenData: TokenType) {
    state.token = tokenData
    localStorage.setItem('token', JSON.stringify(tokenData))
  },
  CLEAR_TOKEN(state) {
    state.token = null
    localStorage.removeItem('token')
  }
}

export const actions: ActionTree<UserStateType, RootStateType> = {
  async login({ commit }, payload) {
    let { data } = await axios.post('/api/v1/login', payload)
    // const response = await UserService.login()
    commit('SET_TOKEN', data)
  },
  logout({ commit }) {
    commit('CLEAR_TOKEN')
  }
}

export const getters: GetterTree<UserStateType, RootStateType> = {
  loggedIn(state) {
    return !!state.token
  },
  getToken(state) {
    return state.token && state.token.token
  }
}

export const user: Module<UserStateType, RootStateType> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
