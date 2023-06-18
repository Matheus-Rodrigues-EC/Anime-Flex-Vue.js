<script>
import axios from 'axios';
import { useAdminStore } from '../../stores/userStore.js';

export default {
    name: 'CreateSeason',
    components: {

    },
    props:{
        anime: '',
        season: '',
        name: ''
    },
    data() {
        const AdminStore = useAdminStore();
        return {
            Id: '',
            Anime: '', 
            Season: '', 
            Name: '',
            Number: '',
            Url: '', 
            AdminStore,
            ShowNotification: false,
            info: ''
        }
    },
    created(){
        this.getEpisode();
    },
    methods: {
        getEpisode() {
            axios.get(`${import.meta.env.VITE_BASE_URL}/${this.anime}/${this.season}/${this.name}`)
                .then((res) => {
                    this.Id = res.data._id;
                    this.Anime = res.data.Anime;
                    this.Season = res.data.Season;
                    this.Name = res.data.Name;
                    this.Number = res.data.Number;
                    this.Url = res.data.URL;
                })
                .catch((error) => {
                    console.log(error.response.data);
                })
        },
        updateEpisode(e, id, anime, season_name, episode_name, episode_number, url) {
            e.preventDefault();
            id = this.Id;
            anime = this.Anime;
            season_name = this.Season;
            episode_name = this.Name;
            episode_number = this.Number;
            url = this.Url

            const body = {anime, season_name, episode_name, episode_number, url};
            const token = this.AdminStore.adminToken;

            axios.put(`${import.meta.env.VITE_BASE_URL}/updateEpisode`, body, {
                headers: {
                    'Authorization': `Baerer ${token}`,
                    'id': `${id}`
                }
            })
                .then((res) => {
                    this.info = "Episódio Atualizado.";
                    this.showNotification();
                    this.Anime = '';
                    this.Season = '';
                    this.Name = '';
                    this.Number = '';
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
    <div class="cadastro" >
        <form action="" @submit="updateEpisode" class="cadastro" >
            <img class="preview" :src="this.Cover" alt="Esperando Imagem..."/>
            <input type="text" required @change="e => this.Anime = e.target.value" placeholder="Nome do Anime" :value="this.Anime" />
            <input type="text" required @change="e => this.Season = e.target.value" placeholder="Nome da Temporada" :value="this.Season" />
            <input type="text" required @change="e => this.Name = e.target.value" placeholder="Nome do Episódio" :value="this.Name" />
            <input type="number" required @change="e => this.Number = e.target.value" placeholder="Número do Episódio" :value="this.Number" />
            <input type="url" required @change="e => this.Url = e.target.value" placeholder="Url do Vídeo" :value="this.Url" />
            <button type="submit">Atualizar Episódio</button>
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
    height: 200px;
    border: 1.5px solid #101010;
    border-radius: 15px;
    margin: auto;
    box-sizing: border-box;
}
</style>.