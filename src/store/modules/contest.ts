import find from 'lodash/find'
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex'

import { ContestType } from '@/types/api'
import ContestService from '@/services/ContestService'
import { ContestStateType, NotificationWithoutIdType, RootStateType } from '@/types/store'

export const namespaced: boolean = true

export const state: ContestStateType = {
  contests: []
}

export const mutations: MutationTree<ContestStateType> = {
  SET_CONTESTS(state, payload: Array<ContestType>) {
    state.contests = payload
  }
}

export const actions: ActionTree<ContestStateType, RootStateType> = {
  async getContests({ commit, dispatch }) {
    try {
      const response = await ContestService.getContests()
      commit('SET_CONTESTS', <ContestType>response.data)
    } catch (error) {
      let notification: NotificationWithoutIdType = {
        type: 'error',
        message: error.toString()
      }
      console.log(error.toString())
      await dispatch('notification/add', notification, { root: true })
    }
  }
}

export const getters: GetterTree<ContestStateType, RootStateType> = {
  getContestBySlug: state => (slug: string): ContestType => {
    let contest = find(state.contests, obj => obj.slug == slug)
    if (contest == undefined) {
      throw Error('Contest with given slug does not exist.')
    }
    return contest
  }
}

export const contest: Module<ContestStateType, RootStateType> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
