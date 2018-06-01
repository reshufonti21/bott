import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'
export default [
  {
    path: '/',
    component: () => import('layouts/login'),
    children: [
      { path: '', component: () => import('pages/index') }
    ],
    meta: {requiresAuth: false, base: 'auth'},
  },
  {
    path: '*',
    redirect: '/login',
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('layouts/signup'),
    meta: {requiresAuth: false, base: 'auth'},
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('layouts/dashboard'),
    meta: {
      requiresAuth: true
     }
  },
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
