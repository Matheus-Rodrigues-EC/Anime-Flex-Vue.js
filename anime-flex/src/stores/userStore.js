import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {

    state(){
        return {
            userToken: ref(''),
            userId: ref(''),
            userName: ref(''),
            userImage: ref(''),
            userEmail: ref('')
        }
    },

    actions:{
        setUser(token, id, name, image, email){
            this.userToken = token;
            this.userId = id;
            this.userName = name;
            this.userImage = image;
            this.userEmail = email;
        },
        clearUser(){
            this.userToken = '';
            this.userName = '';
            this.userImage = '';
            this.userEmail = '';
        }
    },

    getters:{
        showName(){
            return this.userName;
        }
    }
})

export const useAdminStore = defineStore('admin', {

    state(){
        return {
            adminToken: ref(''),
            adminName: ref(''),
            isLogged: ref(false)
        }
    },

    actions:{
        setAdmin(token, name){
            this.adminToken = token;
            this.adminName = name;
            this.isLogged = true;
        },
        clearAdmin(){
            this.adminToken = '';
            this.adminName = '';
            this.isLogged = false;
        }
    },

    getters:{
        showName(){
            return this.adminName;
        }
    }
})