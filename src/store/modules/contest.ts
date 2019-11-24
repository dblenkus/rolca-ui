import find from 'lodash/find'

import { ContestType } from '@/types/api'
import ContestService from '@/services/ContestService'
import { ContestStateType } from '@/types/store'

export const namespaced = true

export const state: ContestStateType = {
  contests: []
}

export const mutations = {
  SET_CONTESTS(state: ContestStateType, payload: Array<ContestType>) {
    state.contests = payload
  }
}

export const actions = {
  async getContests({ commit, dispatch }: { commit: Function; dispatch: Function }) {
    try {
      const response = await ContestService.getContests()
      commit('SET_CONTESTS', response)
    } catch (error) {
      let notification = {
        type: 'error',
        message: error.toString()
      }
      console.log(error.toString())
      await dispatch('notification/add', notification, { root: true })
    }
  }
}

export const getters = {
  getContestBySlug: (state: ContestStateType) => (slug: string): ContestType => {
    let contest = find(state.contests, obj => obj.slug == slug)
    if (contest == undefined) {
      throw Error('Contest with given slug does not exist.')
    }
    return contest
  }
}
