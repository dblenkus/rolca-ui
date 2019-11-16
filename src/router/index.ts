import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/contests',
    name: 'contests',
    component: () => import(/* webpackChunkName: "contests" */ '../views/ContestsList.vue'),
  },
  {
    path: '/contests/:slug',
    name: 'contest-details',
    component: () => import(/* webpackChunkName: "contests" */ '../views/ContestDetails.vue'),
    props: true,
  },
  {
    path: '/results',
    name: 'results',
    component: () => import(/* webpackChunkName: "results" */ '../views/Results.vue'),
  },
  {
    path: '/profile',
    name: 'user-profile',
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
