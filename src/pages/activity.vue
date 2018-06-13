<template>
    <q-page padding class="client-add " >
        <h4 class="page-header">Activity</h4>
        <div class="row">
            <div class="col-6">
                <q-card>
                    <q-card-main>
                        <div class="row">
                            <div class="col-12">
                                <q-btn class="control-btn" @click="deleteActivity">Delete Activity</q-btn>
                            </div>
                        </div>
                        <q-table :data="tableData" :columns="columns" row-key="name" color="secondary" selection="multiple" :selected.sync="selected">
                            <i aria-hidden="true" class="q-icon material-icons"></i>
                        </q-table>
                        <q-btn round class="add-btn size-25 btn-absolute" icon="add" @click="addActivity"/>
                     </q-card-main>
                </q-card>
            </div>
              <div class="col-6">
                <q-card v-if="showAdd">
                    <q-card-title>
                        <span class="push-left">ADD A CLIENT</span>
                        <span class="push-right">#Client Number</span>
                    </q-card-title>
                    <q-card-main class="padded-form">
                        <div class="form">
                            <q-input v-model="activity.name" placeholder=" Name"/>
                            <br/><br>
                            <q-select v-model="activity.type" :options="typeNames" class="entity-property-text"/>
                            <br/><br>
                            <q-input v-model="activity.price" placeholder="price"/>
                           </div>
                        <q-btn class="save-btn" label="SUBMIT" @click="saveActivity"/>
                        <!-- <ul class="errors">
                        <li v-show="!validation.name">Name cannot be empty.</li>
                        <li v-show="!validation.email">Please provide a valid email address.</li>
                       </ul> -->
                    </q-card-main>
                </q-card>
            </div>
        </div>
    </q-page>
     
</template>
<script>
import lodash from 'lodash';   
import firebase from 'firebase';
import { Notify } from 'quasar'

export default {
    data: () => ({
        tableData: [],
        selected: [],
            activity: {},
        columns: [
                {
                name: ' name',
                required: true,
                label: ' Name',
                align: 'left',
                field: 'name',
                sortable: true,
            
            },
            {
                name: 'type',
                required: true,
                label: 'Activity type',
                align: 'left',
                field: 'type',
                sortable: true
            },
            {
                name: 'activity price',
                required: true,
                label: '$$',
                align: 'left',
                field: 'price',
                sortable: true
            },
                        
        ],
        typeNames: [
            {
                value:'issue',
                label: 'Issue'
            },
            {
                value:'commit',
                label: 'Commit'
            },
                {
                value:'conflict',
                label: 'conflict'
            }
        ],
        showAdd: false
    }),
    methods: {
        addActivity: function(){
            let vm = this;
            vm.showAdd = true;
        },
        saveActivity: function(){
            let database = firebase.database();
            let vm = this;
            database.ref('activities').push(vm.activity).then(
                function(response){
                    vm.showAdd = false;
                    vm.activity= {};
                    vm.tableData = [];
                    vm.getActivity();
                },
                function(err){
                    vm.$q.notify({color: 'negative', textColor: 'white',message: 'Oops! ' + err.message,  icon: 'report_problem', position: 'bottom', timeout: Math.random() * 8000 + 3000})
                }
            );
        },
        getActivity: function(){
            let database = firebase.database();
            let vm = this; 
            vm.tableData = [];
            database.ref('activities').orderByValue().on('value', function(snapshot) {
                snapshot.forEach(function(data){
                    vm.tableData.push(data.val());
                });
            });
        },
        editActivity: function(){
            let database = firebase.database();
            let vm = this;
            database.ref('activities').orderByChild('name').equalTo(vm.selected[0].name).on('value', function(snapshot) {
                let key = _.findKey(snapshot.val())
                if(key){
                    database.ref('activities').child(key).update(vm.selected[0]);
                }
            });
        },
        deleteActivity: function(){
            let database = firebase.database();
            let vm = this;
            _.each(vm.selected, function(value){
                database.ref('activities').orderByChild('name').equalTo(value.name).on('value', function(snapshot) {
                    let key = _.findKey(snapshot.val())
                    if(key){
                        database.ref('activities').child(key).remove();
                    }
                });
            });
            vm.selected = [];
            vm.getActivity();
        }
    },
    created: function(){
        this.getActivity();
    },
} 
</script>
<style>
  .client-add .q-card-container{
        padding: 40px 15px 20px;
    }
    .client-add .q-card{
        min-height: 528px;
        position: relative;
    }
    .client-add .q-card .q-card-container{ 
        padding: 20px 10px;
    }
    .client-add .control-btn{
        margin-bottom: 20px;
        margin-left: 10px;
    }
    .client-add .q-card-container.padded-form{
        padding: 0px 50% 20px 5%;
    }
    .client-add .q-card-title{
        width: 100%;
        color: #ccc;
        font-size: 14px;
        text-transform: uppercase;
    }
    .client-add .add-btn{
        position: absolute;
        right: 45px;
        bottom: 10px;
        background:#006666;
        border: 1px solid #ef7171;
        color: #ef7171;
    }
    .client-add .add-btn i{
        font-size: 30px;
        line-height: 25px;
    }
    .client-add .size-25{
        width: 25px;
        height: 25px;
    }
    .client-add .size-20{
        width: 20px;
        height: 20px;
      
    }
    .client-add .size-10{
        width: 10px;
        height: 10px;
    }
    .client-add .save-btn{
        background: #006666;
        margin-top: 15px;
        color: #fff;
        position: absolute;
        bottom: 10px;
        right: 10px;
    }
    .client-add .row .col-6:first-child .q-card{
        margin-right: 15px;
       
    }
    .client-add .row .col-6:last-child .q-card{
        margin-left: 15px;
          
    }
    .client-add .q-table-container {
        box-shadow: none;
        
    }
    .client-add .q-table th, 
    .client-add .q-table td{
        padding: 5px 10px;
        
    }
    .client-add .q-table thead tr,
    .client-add .q-table tbody tr
    {
        height:30px;
       
    }
    .client-add .q-table tbody td{
        height:30px;
         
    }
    .client-add .q-table thead tr{
        background: #dcdfff;
         background-color: #008080;
        
    }
    .client-add .q-table tbody tr:nth-child(odd){
        background: #fff;
        
    }
    .client-add .q-table tbody tr:nth-child(even){
        background: #dcdfff;
         background-color: #008080;
    }
</style>

