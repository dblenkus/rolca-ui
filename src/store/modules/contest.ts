import find from 'lodash/find'

import { ContestType } from '@/types/api'
import { ContestStateType } from '@/types/store'

export const namespaced = true

export const state: ContestStateType = {
  contests: [
    {
      title: 'Celjska fotografska razstava 2019',
      slug: 'celjska-fotografska-razstava-2019',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: ''
    },
    {
      title: 'Dnevi mladinske fotografije 2020',
      slug: 'dnevi-mladinske-fotografije-2020',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: ''
    }
  ]
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
