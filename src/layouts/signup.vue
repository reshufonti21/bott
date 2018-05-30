<template>
    <q-layout>
         <!-- <q-layout-header>SIGN UP</q-layout-header> -->
            <q-page-container>
                <div class="row">
                    <div class="title">
                        <p>SIGN UP</p>
                    </div>
                    <div class="signup">
                        <p>Lets create a new account</p><br>
                        <input type="text" v-model="email" placeholder="Email"><br>
                        <input type="password" v-model="password" placeholder="Password"><br>
                        <button v-on:click="signUp()">signup</button><br><br>
                        <p>Or go back to  <router-link to="/"> login</router-link></p>
                    </div>
                </div>
            </q-page-container>
    </q-layout>
</template>

<script>
import firebase from 'firebase'
export default {
	data: function () {
		return {
			email:'',
			password:''
		}
	},
  method: {
		signUp: function(){
			firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(this.email, this.password).then(
				function (data) {
					var database = firebase.database();
					database.ref('users').set({
							email: data.user.email,
							role : 'Physician'
					});
					this.$q.notify({color: 'tertiary', textColor: 'white',message: 'Your account has been created!',  icon: 'thumb_up', position: 'bottom', timeout: Math.random() * 8000 + 3000})
				},
				function(err){
					this.$q.notify({color: 'negative', textColor: 'white',message: 'Oops! ' + err.message,  icon: 'report_problem', position: 'bottom', timeout: Math.random() * 8000 + 3000})
				}
			)
		}
	}
}
</script>

<style>
.signup{
    text-align: center;
    margin-top: 30px;
    margin-left: 620px;
}
.signup input{
    margin-bottom: 20px;
    border: 1px solid #999999;
    width: 370px;
    padding: 8px;
    height: 45px;
    background-color: #ffffb3;
}
.signup p{
    font-size: 15px;
}
.title p{
    font-size: 30px;
    text-align: center;
    margin-left: 740px;
    margin-top: 140px;
    color: #006666;
}
.signup button{
    background-color:#006666;
     width: 370px;
     height: 35px;
}
.signup p a{
        color: #006666;
        text-decoration: none;
        outline: 0;
}
</style>
