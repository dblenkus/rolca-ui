import Vue from 'vue';
import Vuex from 'vuex';

import * as contest from './modules/contest'
import * as notification from './modules/notification'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    app_name: "Rolca",
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    contest,
    notification
  },
});
