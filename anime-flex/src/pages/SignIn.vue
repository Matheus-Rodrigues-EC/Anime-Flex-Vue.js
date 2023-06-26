<script>
import axios from 'axios';
import { useUserStore, useAdminStore } from '../stores/userStore.js';

export default {
    name: 'SignIn',
    components: {

    },
    data() {
        const useStore = useUserStore();
        const AdminStore = useAdminStore();
        return {
            email: '',
            password: '',
            useStore,
            AdminStore,

            ShowNotification: false,
            info: ''
        }
    },
    methods:{
        sendSignIn(email, password){
            email = this.email;
            password = this.password;

            const body = {email, password};

            axios.post(`${import.meta.env.VITE_BASE_URL}/signin`, body)
                .then((res) => {
                    const User = JSON.stringify(res.data);
                    localStorage.setItem("configuration", User);
                    this.useStore.setUser(res.data.token, res.data.Id, res.data.Name, res.data.Image, res.data.Email);
                    this.$router.push('/');
                })
                .catch((error) => {
                    this.info = error.response.data;
                    this.showNotification();
                })
        },
        adminLogin(adminName, adminPassword) {
            adminName = this.email;
            adminPassword = this.password;

            const body = {adminName, adminPassword};

            axios.post(`${import.meta.env.VITE_BASE_URL}/admlogin`, body)
                .then((res) => {
                    const Master = JSON.stringify(res.data);
                    localStorage.setItem("Master", Master);
                    this.AdminStore.setAdmin(res.data.token, res.data.adminName);
                    this.$router.push('/adminHome'); 
                })
                .catch((error) => {
                    alert(error)
                })
        },
        selectLogin(e, email){
            e.preventDefault();
            email = this.email;
            if(email.includes('@')){
                this.sendSignIn();
            }else{
                this.adminLogin();
            }
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
    <div class="cadastro" >
        <form action="" @submit="selectLogin" class="cadastro" >
            <label>Login</label>
            <input type="text"      required v-model="this.email"       placeholder="Email / AdminName"  />
            <input type="password"  required v-model="this.password"    placeholder="Password" />
            <button type="submit">Entrar</button>
        </form>

        <div v-if="ShowNotification" class="Notification">
            <h4>{{ info }}</h4>
        </div>
    </div>
</template>

<style scoped>

.cadastro{
    display: flex;
    flex-direction: column;
    margin: 3.5rem auto;
    gap: 15px;
}

button{
    transition: border-color 1s;
}

</style>