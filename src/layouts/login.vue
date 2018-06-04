<template>
    <q-layout>
        <q-layout-header class="toolbar"></q-layout-header>
        <q-page-container class="login-container">
            <div class="row">
                <div class="img">
                    <router-link to="/"><img src="assets/img/rrr.gif" alt=""></router-link>
                </div>
                <div class="login">
                    <input type="text" v-model="email" placeholder="Email"><br>
                    <input type="password" v-model="password" placeholder="Password"><br>
                    <!-- <button v-on:click="login()">login</button><br><br> -->
                    <q-btn @click="login">login</q-btn><br><br>
                    <!-- <button v-on:click="login()"><router-link to="/dashboard">login</router-link></button><br><br> -->
                     <p>You don't have an account? You can  <router-link to="/signup">Create one</router-link></p>
                </div>
            </div>
        </q-page-container>
    </q-layout>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login: function(){
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        function (user) {
          alert('you are logged in')
            firebase.auth().onAuthStateChanged(user => {
                if(user) {
                    
                }
            });
        },
        function (err) {
          alert('oops. ' + err.message)
        }
      )
    }
  }
}
</script>
<style>
.login{
    text-align: center;
    margin-left: 620px;
}
.login input{
    margin-bottom: 20px;
    border: 1px solid #999999;
    width: 340px;
    padding: 8px;
    height: 45px;
    background-color: #ffffb3;
}
img{
    width: 35%;
    margin-top: 100px;
    margin-left:500px;
}
.login button{
    background-color:#006666;
     width: 345px;
     height: 35px;
}
.login p a{
        color: #006666;
        text-decoration: none;
        outline: 0;
}
</style>
