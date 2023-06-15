<script>
import axios from 'axios';
import { useAdminStore } from '../../stores/userStore.js';

export default {
    name: 'CreateSeason',
    components: {

    },
    data() {
        const AdminStore = useAdminStore();
        return {
            Anime: '', 
            Season: '', 
            Name: '',
            Number: '',
            Cover: '', 
            Url: '',
            AdminStore,
            ShowNotification: false,
            info: ''
        }
    },
    methods: {
        createEpisode(e, anime, season_name, episode_name, episode_number, episode_cover, url) {
            e.preventDefault();
            anime = this.Anime, 
            season_name = this.Season, 
            episode_name = this.Name, 
            episode_number = this.Number, 
            episode_cover = this.Cover, 
            url = this.Url

            const body = {anime, season_name, episode_name, episode_number, episode_cover, url};
            const token = this.AdminStore.adminToken;

            axios.post(`${import.meta.env.VITE_BASE_URL}/createEpisode`, body, {
                headers: {
                    'Authorization': `Baerer ${token}` 
                }
            })
                .then((res) => {
                    this.info = "Episode Cadastrado.";
                    this.showNotification();
                    this.Anime = '';
                    this.Season = '';
                    this.Name = '';
                    this.Number = '';
                    this.Cover = '';
                    this.Url = '';
                    this.$router.push('/adminHome');
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
    <div >
        <form action="" @submit="createEpisode" class="cadastro" >
            <img class="preview" :src="this.Cover" alt="Esperando Imagem..."/>
            <input type="text" required @change="e => this.Anime = e.target.value" placeholder="Nome do Anime" value="" />
            <input type="text" required @change="e => this.Season = e.target.value" placeholder="Nome da Temporada" value="" />
            <input type="text" required @change="e => this.Name = e.target.value" placeholder="Nome do Episódio" value="" />
            <input type="number" required @change="e => this.Number = e.target.value" placeholder="Número do Episódio" value="" />
            <input type="url" required @change="e => this.Cover = e.target.value" placeholder="Url da imagem" value="" />
            <input type="url" required @change="e => this.Url = e.target.value" placeholder="Url do Vídeo" value="" />
            <button type="submit">Adicionar Episódio</button>
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
    margin: 75px auto;
    gap: 15px;
    padding-bottom: 25px;
}

.preview {
    width: fit-content;
    height: 200px;
    border: 1.5px solid #101010;
    border-radius: 15px;
    margin: 15px auto;
    box-sizing: border-box;
}

</style>