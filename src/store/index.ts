import Vue from 'vue';
import Vuex from 'vuex';

import * as contest from './modules/contest'

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
    contest
  },
});
