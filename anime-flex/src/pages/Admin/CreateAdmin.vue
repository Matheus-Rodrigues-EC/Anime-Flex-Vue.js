<script>
import axios from 'axios';
import { useAdminStore } from '../../stores/userStore.js';

export default {
    name: 'CreateAdmin',
    components: {

    },
    data() {
        const AdminStore = useAdminStore();
        return {
            name: '',
            password: '',
            AdminStore,
            ShowNotification: false,
            info: ''
        }
    },
    methods: {
        createAdmin(e, adminName, adminPassword) {
            e.preventDefault();
            adminName = this.name;
            adminPassword = this.password;

            const body = {adminName, adminPassword};
            const token = this.AdminStore.adminToken;

            axios.post(`${import.meta.env.VITE_BASE_URL}/createAdmin`, body, {
                headers: {
                    'Authorization': `Baerer ${token}` 
                }
            })
                .then((res) => {
                    this.name = '';
                    this.password = '';
                    // console.log("Administrador Cadastrado.");
                    this.info = "Administrador Cadastrado.";
                    this.showNotification();
                    this.$router.push('/adminHome');
                })
                .catch((error) => {
                    this.info = error.response.data;
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
    <div class="cadastro" >
        <form action="" @submit="createAdmin" class="cadastro" >
            <label>Cadastrar Novo Administrador</label>
            <input type="text" required @change="e => this.name = e.target.value" placeholder="Admin Name" value="" />
            <input type="password" required @change="e => this.password = e.target.value" placeholder="Password" value="" />
            <button type="submit">Enviar</button>
        </form>

        <div v-if="ShowNotification" class="Notification">
            <h4>{{ info }}</h4>
        </div>
    </div>
</template>

<style>

.cadastro{
    display: flex;
    flex-direction: column;
    margin: 5rem auto;
    gap: 15px;
}

button{
    transition: border-color 1s;
}

</style>