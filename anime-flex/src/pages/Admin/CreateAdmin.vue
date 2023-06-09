<script>
import axios from 'axios';

export default {
    name: 'CreateAdmin',
    components: {

    },
    data() {
        return {
            name: '',
            password: ''
        }
    },
    methods: {
        sendSignUp(e, adminName, adminPassword) {
            e.preventDefault();
            adminName = this.name;
            adminPassword = this.password;

            const body = {adminName, adminPassword};
            const token = localStorage.getItem('tokenAdmin');

            axios.post(`${import.meta.env.VITE_BASE_URL}/createAdmin`, body, {
                headers: {
                    'Authorization': `Baerer ${token}` 
                }
            })
                .then((res) => {
                    console.log("Administrador Cadastrado.");
                    this.name = '';
                    this.password = '';
                    this.$router.push('/adminHome');
                })
                .catch((error) => {
                    console.log(error.response.data);
                })
        }
    }
}
</script>

<template>
    <div class="cadastro" >
        <form action="" @submit="sendSignUp" class="cadastro" >
            <label>Cadastrar Novo Administrador</label>
            <input type="text" required @change="e => this.name = e.target.value" placeholder="Admin Name" value="" />
            <input type="password" required @change="e => this.password = e.target.value" placeholder="Password" value="" />
            <button type="submit">Enviar</button>
        </form>
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