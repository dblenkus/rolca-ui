import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'

import { RootStateType } from '@/types/store'

import { contest } from './modules/contest'
import { notification } from './modules/notification'
import { user } from './modules/user'

Vue.use(Vuex)

const store: StoreOptions<RootStateType> = {
  state: {
    app_name: 'Rolca'
  },
  mutations: {},
  actions: {},
  modules: {
    contest,
    notification,
    user
  }
}

export default new Vuex.Store<RootStateType>(store)
