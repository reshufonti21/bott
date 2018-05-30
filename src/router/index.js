import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'
import routes from './routes'


var config = {
  apiKey: 'AIzaSyAqbN1Gz6HPeg9bX4Qkh6megFF5hlNMBrg',
  authDomain: 'bott-86c91.firebaseapp.com',
  databaseURL: 'https://bott-86c91.firebaseio.com',
  projectId: 'bott-86c91',
  storageBucket: 'bott-86c91.appspot.com',
  messagingSenderId: '905253786526'
}
firebase.initializeApp(config)

Vue.use(VueRouter)

const Router = new VueRouter({
  /*
   * NOTE! Change Vue Router mode from quasar.conf.js -> build -> vueRouterMode
   *
   * When going with "history" mode, please also make sure "build.publicPath"
   * is set to something other than an empty string.
   * Example: '/' instead of ''
   */

  // Leave as is and change from quasar.conf.js instead!
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
  scrollBehavior: () => ({ y: 0 }),
  routes
})

export default Router
