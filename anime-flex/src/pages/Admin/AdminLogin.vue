<script>
import axios from 'axios';
import { useAdminStore } from '../../stores/userStore.js'

export default {
    name: 'AdminLogin',
    data() {
        const useStore = useAdminStore();
        return {
            name: '',
            password: '',
            useStore
        }
    },
    methods: {
        adminLogin(e, adminName, adminPassword) {
            e.preventDefault();
            adminName = this.name;
            adminPassword = this.password;

            const body = {adminName, adminPassword};

            axios.post(`${import.meta.env.VITE_BASE_URL}/admlogin`, body)
                .then((res) => {
                    const Master = JSON.stringify(res.data);
                    localStorage.setItem("Master", Master);
                    this.useStore.setAdmin(res.data.token, res.data.adminName);
                    this.$router.push('/adminHome'); 
                })
                .catch((error) => {
                    // console.log(error)
                    alert(error.response.data)
                })
        }
    }
}
</script>

<template>
    <div class="cadastro" >
        <form action="" @submit="adminLogin" class="cadastro" >
            <label>Entrar Como Administrador</label>
            <input type="text" v-model="this.name" placeholder="name"/>
            <input type="password" v-model="this.password" placeholder="Password"/>
            <button type="submit">Entrar</button>
        </form>
    </div>
</template>

<style scoped>
.cadastro{
    display: flex;
    flex-direction: column;
    margin: 5rem auto;
    gap: 15px;
}

button{
    transition: border-color 1s;
    text-decoration-color: aliceblue;
}
</style>