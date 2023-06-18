<script>
import axios from 'axios';
import { useAdminStore } from '../../stores/userStore.js';

export default {
    name: 'CreateAnime',
    components: {

    },
    data() {
        const AdminStore = useAdminStore();
        return {
            cover: '',
            name: '',
            AdminStore,
            ShowNotification: false,
            info: ''
        }
    },
    methods: {
        createAnime(e, cover, name) {
            e.preventDefault();
            cover = this.cover;
            name = this.name;

            const body = {cover, name};
            const token = this.AdminStore.adminToken;

            axios.post(`${import.meta.env.VITE_BASE_URL}/createAnime`, body, {
                headers: {
                    'Authorization': `Baerer ${token}` 
                }
            })
                .then((res) => {
                    this.info = "Anime Cadastrado.";
                    this.showNotification();
                    this.cover = '';
                    this.name = '';
                    
                    this.$router.push('/adminHome');
                })
                .catch((error) => {
                    // console.log(error.response.data);
                    this.info = error.response.data;
                    this.showNotification();
                })
        },
        showNotification(){
            this.ShowNotification = true;
            setTimeout(() => {
                this.ShowNotification = false;
            }, 3000);
        }
    }
}
</script>

<template>
    <div class="cadastro" >
        <form action="" @submit="createAnime" class="cadastro" >
            <h2>Adicionar Anime</h2>
            <img class="preview" :src="this.cover" alt="Esperando Imagem..."/>
            <input type="url" required @change="e => this.cover = e.target.value" placeholder="Url da imagem" value="" />
            <input type="text" required @change="e => this.name = e.target.value" placeholder="Nome do Anime" value="" />
            <button type="submit">Adicionar Anime</button>
        </form>

        <div v-if="ShowNotification" class="Notification">
            <h4>{{ info }}</h4>
        </div>
    </div>
</template>

<style scoped>

h2{
    margin: 0;
}

.cadastro{
    display: flex;
    flex-direction: column;
    margin: 75px auto;
    gap: 15px;
}

.preview {
    width: fit-content;
    height: 200px;
    border: 1.5px solid #101010;
    border-radius: 15px;
    margin: auto;
    box-sizing: border-box;
}

</style>