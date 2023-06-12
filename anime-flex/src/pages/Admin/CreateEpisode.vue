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
            AdminStore
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
                    this.Anime = '';
                    this.Season = '';
                    this.Name = '';
                    this.Number = '';
                    this.Cover = '';
                    this.Url = '';
                    // console.log("Episode Cadastrado.");
                    alert("Episode Cadastrado.");
                    this.$router.push('/adminHome');
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
    height: 200px;
    border: 1.5px solid #101010;
    border-radius: 15px;
    margin: auto;
    box-sizing: border-box;
}

</style>