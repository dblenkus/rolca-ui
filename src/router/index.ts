import Vue from 'vue'
import VueRouter from 'vue-router'

import some from 'lodash/some'

import Home from '@/views/Home.vue'
import store from '@/store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/contests',
    name: 'contests',
    component: () => import(/* webpackChunkName: "contests" */ '../views/ContestsList.vue')
  },
  {
    path: '/contests/:slug',
    name: 'contest-details',
    component: () => import(/* webpackChunkName: "contests" */ '../views/ContestDetails.vue'),
    props: true
  },
  {
    path: '/results',
    name: 'results',
    component: () => import(/* webpackChunkName: "results" */ '../views/Results.vue')
  },
  {
    path: '/user/profile',
    name: 'user-profile',
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/user/register',
    name: 'user-register',
    component: () => import(/* webpackChunkName: "register" */ '../views/UserRegister.vue')
  },
  {
    path: '/user/login',
    name: 'user-login',
    component: () => import(/* webpackChunkName: "login" */ '../views/UserLogin.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (some(to.matched, 'meta.requiresAuth') && !store.getters['user/loggedIn']) {
    next({ name: 'user-login', query: { next: to.fullPath } })
  } else {
    next()
  }
})

export default router
