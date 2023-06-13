<script>
import axios from 'axios';
import { useUserStore } from '../stores/userStore.js';

export default {
    name: 'SignIn',
    components: {

    },
    data() {
        const useStore = useUserStore();
        return {
            email: '',
            password: '',
            useStore
        }
    },
    methods:{
        sendSignIn(e, email, password){
            e.preventDefault();
            email = this.email;
            password = this.password;

            const body = {email, password};

            axios.post(`${import.meta.env.VITE_BASE_URL}/signin`, body)
                .then((res) => {
                    const User = JSON.stringify(res.data);
                    localStorage.setItem("configuration", User);
                    this.useStore.setUser(res.data.token, res.data.Id, res.data.Name, res.data.Image, res.data.Email);
                    console.log(res.data)
                    this.$router.push('/');
                })
                .catch((error) => {
                    // console.log(error)
                    alert(error.response.data);
                })
        }
    }
}
</script>

<template>
    <div class="cadastro" >
        <form action="" @submit="sendSignIn" class="cadastro" >
            <label>Login</label>
            <input type="email" required @change="e => this.email = e.target.value" placeholder="Email" value="" />
            <input type="password" required @change="e => this.password = e.target.value" placeholder="Password" value="" />
            <button type="submit">Entrar</button>
        </form>
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