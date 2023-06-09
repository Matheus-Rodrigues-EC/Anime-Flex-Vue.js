<script>
import axios from 'axios';

export default {
    name: 'AdminLogin',
    data() {
        return {
            name: '',
            password: ''
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
                    console.log(res.data);
                    localStorage.setItem("token", res.data.token);
                    this.$router.push('/adminHome'); 
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
}
</script>

<template>
    <div class="cadastro" >
        <form action="" @submit="adminLogin" class="cadastro" >
            <label>Administrador</label>
            <input type="text" required @change="e => this.name = e.target.value" placeholder="Name" value="" />
            <input type="password" required @change="e => this.password = e.target.value" placeholder="Password" value="" />
            <input type="submit" />
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
</style>