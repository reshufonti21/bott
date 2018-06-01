<template>
    <q-layout>
        <q-page margin class="dashboard" >
           <q-page-container>
                <q-header>
                    <button v-on:click="logout()">logout</button><br><br>
                    <!-- <q-btn
                    @click="drawer = !drawer"
                    round
                    white
                    icon="menu"/> -->
                    <p>Dashboard</p>
                    <q-item>
                    <q-item-side>
                        <ul>CLIENT</ul>
                        <ul>MY TASKS</ul>
                        <ul>MESSAGE CENTER</ul>
                        <ul>BILLING</ul>
                    </q-item-side>
                    </q-item>
                </q-header>
                <div classs=butt>
              </div>
            </q-page-container>
        </q-page> 
            <!-- <div class=row>
                <h5>Dashboard</h5>
                <div class="col-4">
                  <p>Activity(ALL)</p>  
                </div>
            </div>  -->
             <div class=tab>
                 <h6>Dashboard</h6>
              <div class="col-6">
                <div class="row row-card">
                    <div class="col-4">  
                        <q-card>
                            <q-card-title>
                                <span class="push-left">Activity(all)</span>
                            </q-card-title>
                        </q-card>
                    </div>
                    <div class="col-4">  
                        <q-card>
                            <q-card-title>
                                <span class="">Activity(last 7 days)</span>
                            </q-card-title>
                            <q-card-main>
                        <q-table :data="clientsData" :columns="clientsColumns" row-key="name" color="secondary">
                            <q-tr slot="body" slot-scope="props" :props="props" class="cursor-pointer">
                                <q-td v-for="col in props.cols" :key="col.name" :props="props">
                                    {{ col.value }}
                                </q-td>
                            </q-tr>
                        </q-table>
                    </q-card-main>
                        </q-card>
                    </div>
                     <q-card>
                            <q-card-title>
                                <span class="">Activity(last 30 days)</span>
                            </q-card-title>
                     </q-card>
                    </div>
                </div>
            </div>   
    </q-layout>
</template>
<script>
import firebase from 'firebase'
export default {
    data () {
    return {
      drawer: true
    }
  },
  methods : {
       logout: function(){
        firebase.auth().signOut().then(() => {
        window.location = window.location.origin;
        });
  }
}
}
</script>
<style>
.dashboard{
    margin-left: 5px;
    background-color: #317873;
    width: 180px;
    text-align: center;
}
.dashboard p{
    color:white;
}
.dashboard ul{
    font-size: 14px;
    color: white;
    margin-left: -20px;
}
.dashboard button{
    font-size: 14px;
    color:black;
    margin-left: 1400px;
    background-color: #006666;
    margin-top: 40px;
}

.dash{
    color: black;
  
}
.row h5{
    color: black;
    margin-left: 250px;
    margin-top: -780px;
}
.tab{
    margin-left: 300px;
    margin-top: -700px;
}
.tab h6{
    margin-left: -70px;
    margin-top: -750px; 
}
</style>

