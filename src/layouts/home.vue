<template>
  <q-layout>
      <q-layout-drawer side="left" v-model="showLeft">
        <q-list no-border link inset-delimiter>
          <q-item>
            <q-btn class="top-icon" flat icon="subject"></q-btn>
          </q-item>
          <q-item to='/dashboard'>
            <q-item-main label="Dashboard" />
          </q-item>
          <q-item to='/activity'>
            <q-item-main label="Activity" />
          </q-item>
          <q-item to='/log'>
            <q-item-main label="My Logs" />
          </q-item>
          <div class="set-to-bottom">
            <q-item to='/advanced'>
              <q-item-main label="Advanced" />
            </q-item>
            <q-item>
              <q-btn class="logout" flat icon="exit_to_app" v-on:click="logOut()"></q-btn>
            </q-item>
          </div>   
        </q-list>
      </q-layout-drawer>
      <q-page-container class="main-container">
        <router-view />
      </q-page-container>
  </q-layout>
</template>

<script>
import firebase from 'firebase'
import { openURL } from 'quasar'

export default {
  name: 'LayoutDefault',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      showLeft: true,
      drawer: this.$q.open || false
    }
  },
  methods: {
    openURL,
    logOut: function(){
      var vm = this;
      firebase.auth().signOut().then(function(){
        vm.$router.go({ name: 'login'});
      }).catch(function (err) {

      })
    }
  }
}
</script>

<style>

.logout{
  display: inline-block;
  margin-top: 0px;
  color: black;
  position: absolute;
  right: 0;
  bottom: 0;
}
.top-icon{
  position: absolute;
  left: 0;
  top: 0;
  display: inline-block;
  color: black;
  font-size: 18px;
  padding: 0;
}
.tmh-icon-btn{
  color: #8c94f2; 
  background: transparent;
  box-shadow: none;
  font-size: 16px;
}

.tmh-icon-btn:focus,
.tmh-icon-btn:hover{
  background: transparent;
}

body.desktop .tmh-icon-btn .q-focusable:focus .q-focus-helper, 
body.desktop .tmh-icon-btn .q-hoverable:hover .q-focus-helper{
  background: transparent;
}

.layout-padding{
  padding: 1rem;
}

.toolbar{
  min-height:65px;
  box-shadow: none;
}
.set-to-bottom{
  position: absolute;
  bottom: 0;
  width: 100%
}
.q-layout-drawer {
    position: absolute;
    top: 0;
    bottom: 0;
    background:  	#008080;
    z-index: 100;
    opacity: 0.8;
    width:200px;
}

</style>
