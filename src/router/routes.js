import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'
export default [
  {
    path: '/',
    component: () => import('layouts/home'),
    children: [
      { path: '/dashboard', component: () => import('pages/dashboard'), meta: {requiresAuth: true, base: 'root' } },
      { path: '/activity', component: () => import('pages/activity'), meta: {requiresAuth: true, base: 'root' } }
    ],
    meta: {requiresAuth: true},
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('layouts/signup'),
    meta: {requiresAuth: false, base: 'auth'}
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('layouts/login'),
    meta: {requiresAuth: false, base: 'auth'}
  },
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
