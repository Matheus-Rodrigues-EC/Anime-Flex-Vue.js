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
            password: '',

            ShowNotification: false,
            info: ''
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
                    this.info = res.data;
                    this.name = '';
                    this.image = '';
                    this.email = '';
                    this.password = '';
                    this.showNotification();
                    this.$router.push("/signin");
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
        <form action="" @submit="sendSignUp" class="cadastro" >
            <label>Cadastro</label>
            <img class="preview" :src="this.image" alt="Esperando Imagem..."/>
            <input type="text"      required v-model="this.name"        placeholder="Name"  />
            <input type="url"       required v-model="this.image"       placeholder="Url da imagem"  />
            <input type="email"     required v-model="this.email"       placeholder="Email"  />
            <input type="password"  required v-model="this.password"    placeholder="Password"  />
            <button type="submit">Cadastrar</button>
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