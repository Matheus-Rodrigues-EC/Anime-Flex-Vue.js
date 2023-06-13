<script>
import axios from 'axios';

export default {
    name: 'SignUp',
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

            axios.post(`${import.meta.env.VITE_BASE_URL}/signup`, body)
                .then((res) => {
                    // console.log("Membro cadastrado.");
                    alert("Cadastro realizado com sucesso.");
                    this.name = '';
                    this.image = '';
                    this.email = '';
                    this.password = '';
                    this.$router.push("/signin");
                })
                .catch((error) => {
                    // console.log(error.response.data);
                    alert(error.response.data);
                })
        }
    }
}
</script>

<template>
    <div class="cadastro" >
        <form action="" @submit="sendSignUp" class="cadastro" >
            <label>Cadastro</label>
            <img class="preview" :src="this.image" alt="Esperando Imagem..."/>
            <input type="text" required @change="e => this.name = e.target.value" placeholder="Name" value="" />
            <input type="url" required @change="e => this.image = e.target.value" placeholder="Url da imagem" value="" />
            <input type="email" required @change="e => this.email = e.target.value" placeholder="Email" value="" />
            <input type="password" required @change="e => this.password = e.target.value" placeholder="Password" value="" />
            <button type="submit">Cadastrar</button>
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

.preview {
    width: fit-content;
    height: 150px;
    border: 1.5px solid #101010;
    border-radius: 15px;
    margin: auto;
    box-sizing: border-box;
}

button{
    transition: border-color 1s;
}

</style>