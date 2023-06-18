<script >
import axios from 'axios';
import { useUserStore, useAdminStore } from '../stores/userStore.js';

export default {
    name: 'Navbar',
    data(){
        const UserStore = useUserStore();
        const AdminStore = useAdminStore();
        return{
            AdminName: '',
            UserName: '',
            UserStore,
            AdminStore,
            ShowNotification: false,
            info: ''
        }
    },
    created() {
        this.verifyAdmin();
        this.verifyMember();
    },
    mounted(){
        this.verifyAdmin();
        this.verifyMember();
    },
    methods: {
        verifyAdmin(){
            const conf = localStorage.getItem('Master');
            if(conf) {
                const Admin = JSON.parse(conf);
                this.AdminStore.setAdmin(Admin.token, Admin.adminName,);
                this.AdminStore.showName;
            }
        },
        verifyMember(){
            const conf = localStorage.getItem('configuration');
            if(conf) {
                const User = JSON.parse(conf)
                this.UserStore.setUser(User.token, User.Id, User.Name, User.Image, User.Email);
            }
        },
        logOut(){
            const token = this.UserStore.userToken;
            axios.delete(`${import.meta.env.VITE_BASE_URL}/logout`, {
                headers: {
                    'Authorization': `Baerer ${token}`
                }
            })
                .then((res) => {
                    this.info = "Sessão encerrada";
                    this.showNotification();
                    this.UserName = '';
                    localStorage.removeItem('configuration');
                    this.UserStore.clearUser();
                    this.$router.push('/')
                })
                .catch((error) => {
                    this.info = error.response.data;
                    this.showNotification();
                })
        },
        logOutAdmin(){
            const token = this.AdminStore.adminToken;
            axios.delete(`${import.meta.env.VITE_BASE_URL}/logoutAdmin`, {
                headers: {
                    'Authorization': `Baerer ${token}`
                }
            })
                .then((res) => {
                    this.info = res.data;
                    this.showNotification();
                    localStorage.removeItem('Master');
                    this.AdminStore.clearAdmin();
                    this.$router.push('/admin');
                })
                .catch((error) => {
                    this.info = error.response.data;
                    localStorage.removeItem('Master');
                    this.AdminStore.clearAdmin();
                    this.showNotification();
                })
        },
        showNotification(){
            this.ShowNotification = true;
            setTimeout(() => {
                this.ShowNotification = false;
            }, 4500);
        }
    }
}
</script>

<template>
    <div class="header">
        <router-link to="/">Home</router-link>
        <div v-if="this.AdminStore.adminName" class="account">
            <p @click="() => this.$router.push('/adminHome')">Bem Vindo, Mestre {{ this.AdminStore.adminName }}</p>
            <p @click="() => logOutAdmin()" >Desconectar</p>
        </div>
        <div v-else-if="this.UserStore.userName" class="account">
            <p @click="this.$router.push(`/profile/${this.UserStore.userName}`)" >Bem Vindo, {{ this.UserStore.showName }}</p>
            <p @click="() => logOut()" >Sair</p>
        </div>
        <div v-else class="account">
            <router-link to="/signin">Entrar</router-link>
            <router-link to="/signup">Cadastrar-se</router-link>
        </div>

        <div v-if="ShowNotification" class="Notification">
            <h4>{{ info }}</h4>
        </div>
    </div>
</template>

<style scoped>

.header {
    display: flex;
    width: 100%;
    height: 70px;
    background-color: #454545;
    position: fixed;
    top: 0;
    left: 0;
    gap: 15px;
    justify-content: space-evenly;
    align-items: center;
    z-index: 9;
}



.account {
    display: flex;
    gap: 15px;
    cursor: pointer;
}

router-link{
    cursor: pointer;
}



</style>