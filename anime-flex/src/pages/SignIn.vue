<script>
import axios from 'axios';

export default {
    name: 'SignIn',
    components: {

    },
    data() {
        return {
            email: '',
            password: ''
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
                    localStorage.setItem("token", res.data.token);
                    this.$router.push('/') 
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
        <form action="" @submit="sendSignIn" class="cadastro" >
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
    margin: 5rem auto;
    gap: 15px;
}

button{
    transition: border-color 1s;
}

</style>