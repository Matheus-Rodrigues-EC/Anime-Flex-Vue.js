<script>
import axios from 'axios';
import { useAdminStore } from '../../stores/userStore.js';

export default {
    name: 'UpdateAnime',
    components: {

    },
    props:{
        anime: ''
    },
    data() {
        const AdminStore = useAdminStore();
        return {
            Id: '',
            Cover: '',
            Name: '',
            AdminStore,
            ShowNotification: false,
            info: ''
        }
    },
    created() {
        this.getAnimeInfos();
    },
    methods: {
        getAnimeInfos(){
            axios.get(`${import.meta.env.VITE_BASE_URL}/anime/${this.anime}`)
                .then((res) => {
                    this.Id = res.data.Anime._id
                    this.Cover = res.data.Anime.Cover
                    this.Name = res.data.Anime.Name
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        updateAnime(e, id, cover, name) {
            e.preventDefault();
            id = this.Id;
            cover = this.Cover;
            name = this.Name;

            const body = {cover, name};
            const token = this.AdminStore.adminToken;

            axios.put(`${import.meta.env.VITE_BASE_URL}/updateAnime`, body, {
                headers: {
                    'Authorization': `Baerer ${token}`,
                    'id': `${id}`
                }
            })
                .then((res) => {
                    this.info = "Anime Atualizado.";
                    this.showNotification();
                    this.$router.push('/');
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
        <form action="" @submit="updateAnime" class="cadastro" >
            <img class="preview" :src="this.Cover" alt="Esperando Imagem..."/>
            <input  type="url"  required v-model="Cover"    placeholder="Url da imagem"  />
            <input  type="text" required v-model="Name"     placeholder="Nome do Anime"  />

            <button type="submit">Atualizar Anime</button>
        </form>

        <div v-if="ShowNotification" class="Notification">
            <h4>{{ info }}</h4>
        </div>
    </div>
</template>

<style>

.cadastro{
    display: flex;
    flex-direction: column;
    margin: 7.5rem auto 0 auto; 
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