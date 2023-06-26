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
            Url: '',
            AdminStore,
            ShowNotification: false,
            info: '', 

            AnimesList: [],
            SeasonList: []
        }
    },
    created(){
        this.getAnimes();
    },
    computed: {
        SeasonsList() {
            this.getSeasons();
            return (this.SeasonList);
        }
    },
    methods: {
        getAnimes(){
            axios.get(`${import.meta.env.VITE_BASE_URL}/animes`)
                .then((res) => {
                    this.AnimesList = res.data;
                })
                .catch((error) => {
                    alert(error);
                })
        },
        getSeasons(){
            axios.get(`${import.meta.env.VITE_BASE_URL}/anime/${this.Anime}`)
                .then((res) => {
                    this.SeasonList = res.data.Seasons;
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        createEpisode(e, anime, season_name, episode_name, episode_number, url) {
            e.preventDefault();
            anime = this.Anime, 
            season_name = this.Season, 
            episode_name = this.Name, 
            episode_number = this.Number, 
            url = this.Url

            const body = {anime, season_name, episode_name, episode_number, url};
            const token = this.AdminStore.adminToken;

            axios.post(`${import.meta.env.VITE_BASE_URL}/createEpisode`, body, {
                headers: {
                    'Authorization': `Baerer ${token}` 
                }
            })
                .then((res) => {
                    this.info = "Episódio Cadastrado.";
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
    <div >
        <form action="" @submit="createEpisode" class="cadastro" >
            <h2>Adicionar Episódio</h2>
            <select name="AnimesList" v-model="Anime">
                <option value="" selected >Selecione um Anime</option>
                <option v-for="(anime) in AnimesList" :key="anime._id" :value="anime.Name" >{{ anime.Name }}</option>
            </select>
            <select name="SeasonsList" v-model="Season">
                <option value="" selected >Selecione uma temporada</option>
                <option v-for="(season) in SeasonsList" :key="season._id" :value="season.Name ">{{ season.Name }}</option>
            </select>
            <input type="text" v-model="this.Name" placeholder="Nome do Episódio"/>
            <input type="number" v-model="this.Number" placeholder="Número do Episódio"/>
            <input type="url" v-model="this.Url" placeholder="Url do Vídeo"/>
            <button type="submit">Adicionar Episódio</button>
        </form>

        <div v-if="ShowNotification" class="Notification">
            <h4>{{ info }}</h4>
        </div>
    </div>
</template>

<style>

h2 {
    margin: 0;
}

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