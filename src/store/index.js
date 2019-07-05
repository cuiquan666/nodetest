import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'
import { resolve } from 'url';

Vue.use(Vuex)


export default new Vuex.Store({
    state:{
        loginUser:localStorage.getItem('user'),
        userList:[]
    },
    mutations:{
        saveLoginUser(state,value){
            state.loginUser = value
           localStorage.setItem('user',value)
        },
        saveUser(state,users){
            state.userList =users
        }
    
    },
    actions:{
        getUser(cxt){
            return new Promise((resolve,rej)=>{
                axios.get('/api/userlist').then(users=>{
                    cxt.commit('saveUser',users.data)
                    resolve()
                })
            })
            
        }
    
    }
})