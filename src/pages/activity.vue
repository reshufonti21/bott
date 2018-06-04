<template>
    <q-page padding class="client-add " >
        <h4 class="page-header">Activity</h4>
        <div class="row">
            <div class="col-6">
                <q-card>
                    <q-card-main>
                        <div class="row">
                            <div class="col-12">
                                <q-btn class="control-btn" @click="deleteClient">Delete Client</q-btn>
                            </div>
                        </div>
                        <q-table :data="tableData" :columns="columns" row-key="name" color="#008080;" selection="multiple" :selected.sync="selected">
                        </q-table>
                          <q-btn round class="add-btn size-25 btn-absolute" icon="add" @click="addClient"/>
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
                            <q-input v-model="client.name" placeholder="Client Name"/>
                            <br/>
                            <q-input v-model="client.principleContact" placeholder="Priciple Contact"/>
                            <br/>
                            <q-input v-model="client.address" placeholder="Address"/>
                            <br/>
                            <q-input v-model="client.phone" placeholder="Phone"/>
                        </div>
                        <q-btn class="save-btn" label="SUBMIT" @click="saveClient"/>
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
            selected: [],
            columns: [
                {
                    name: 'month',
                    label: 'Month',
                    align: 'left',
                    field: 'month',
                    sortable: true,
                },
                  {
                    name: 'name',
                    required: true,
                    label: 'Client Name',
                    align: 'left',
                    field: 'name',
                    sortable: true
                },
                {
                    name: 'conversationPerMonth',
                    required: true,
                    label: 'Conversations Per Month',
                    align: 'left',
                    field: 'conversationPerMonth',
                    sortable: true
                },
                {
                    name: 'bounceRate',
                    required: true,
                    label: 'Bounce Rate',
                    align: 'left',
                    field: 'bounceRate',
                    sortable: true
                },
                {
                    name: 'price',
                    required: true,
                    label: '$$',
                    align: 'left',
                    field: 'price',
                    sortable: true
                }
            ],
            tableData: [
                
            ],
            client: {},
            showAdd: false
     }),
     methods: {
          addClient: function(){
                let vm = this;
                vm.showAdd = true;
            },
            saveClient: function(){
                let database = firebase.database();
                let vm = this;
                let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
                let now = new Date();
                let thisMonth = months[now.getMonth()];
                vm.client.conversationPerMonth = 0;
                vm.client.bounceRate = 0;
                vm.client.month = thisMonth;
                vm.client.price = 0;
                database.ref('clients').push(vm.client).then(
                    function(response){
                        vm.showAdd = false;
                        vm.client = {};
                        vm.tableData = [];
                        vm.getClients();
                    },
                    function(err){
                        vm.$q.notify({color: 'negative', textColor: 'white',message: 'Oops! ' + err.message,  icon: 'report_problem', position: 'bottom', timeout: Math.random() * 8000 + 3000})
                    }
                );
            },

     }
    
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
    }
    .client-add .q-table tbody tr:nth-child(odd){
        background: #fff;
    }
    .client-add .q-table tbody tr:nth-child(even){
        background: #dcdfff;
    }
</style>

