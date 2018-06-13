import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from "firebase";
import routes from './routes'
import firestore from 'firebase/firestore'
import vuefire from 'VueFire'

let queryReturn = firebase.firestore.QuerySnapshot;

export const dataStore = {
  logMe: (message) => console.log(message),
  person: (id) => console.log(id)
};

const config = {
  apiKey: 'AIzaSyAqbN1Gz6HPeg9bX4Qkh6megFF5hlNMBrg',
  authDomain: 'bott-86c91.firebaseapp.com',
  databaseURL: 'https://bott-86c91.firebaseio.com',
  projectId: 'bott-86c91',
  storageBucket: 'bott-86c91.appspot.com',
  messagingSenderId: '905253786526'
}

firebase.initializeApp(config)
let db = firebase.database();
let vm = {}; 

firebase.auth().onAuthStateChanged(firebaseUser => {
  vm.currentUser = firebaseUser;
  dataStore.logMe(vm.currentUser);
});

Vue.use(VueRouter)
Vue.use(vuefire)

let Router = new VueRouter({
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
  scrollBehavior: () => ({ y: 0 }),
  routes
})

Router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged((user) => {
    let currentUser = vm.currentUser;
    let requiresAuth = to.meta.requiresAuth;
    let path = to.path;
    let currentRoute = window.location.pathname;
    if(requiresAuth && !currentUser){
      next('login')
    }else if(!requiresAuth && currentUser) {
      next('dashboard')
    }else{
      next()
    } 
  });
})

export default Router
