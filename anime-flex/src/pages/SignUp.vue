<script>
import axios from 'axios';

export default {
    name: 'SignUpPage',
    components: {

    },
    data() {
        return {
            name: '',
            image: '',
            email: '',
            password: ''
        }
    },
    methods: {
        sendSignUp(e, name, image, email, password) {
            e.preventDefault();
            name = this.name;
            image = this.image;
            email = this.email;
            password = this.password;

            const body = {name, image, email, password};

            axios.post("http://localhost:5000/signup", body)
                .then((res) => {
                    console.log("Membro cadastrado.");
                    this.name = '';
                    this.image = '';
                    this.email = '';
                    this.password = '';
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
            <img class="preview" :src="this.image" alt="Esperando Imagem..."/>
            <input type="text" required @change="e => this.name = e.target.value" placeholder="name" value="" />
            <input type="url" required @change="e => this.image = e.target.value" placeholder="url da imagem" value="" />
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