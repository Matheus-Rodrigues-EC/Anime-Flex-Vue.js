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
                    console.log(res.data);
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
            <input type="email" required @change="e => this.email = e.target.value" placeholder="email" value="" />
            <input type="password" required @change="e => this.password = e.target.value" placeholder="password" value="" />
            <input type="submit" />
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

.preview {
    width: fit-content;
    height: 150px;
    border: 1.5px solid #101010;
    border-radius: 15px;
    margin: auto;
    box-sizing: border-box;
}

</style>