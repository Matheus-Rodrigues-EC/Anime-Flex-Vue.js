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
        episode: ''
    },
    data() {
        const AdminStore = useAdminStore();
        return {
            Id: '',
            Anime: '', 
            Season: '', 
            Name: '',
            Cover: '',
            EpNumber: '',
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
        if(this.anime){
            this.getEpisode();
        }
    },
    computed: {
        SeasonsList() {
            this.getSeasons();
            return (this.SeasonList);
        }
    },
    methods: {
        getEpisode() {
            axios.get(`${import.meta.env.VITE_BASE_URL}/${this.anime}/${this.season}/${this.episode}`)
                .then((res) => {
                    this.Id = res.data._id;
                    this.Anime = res.data.Anime;
                    this.Season = res.data.Season;
                    this.Name = res.data.Name;
                    this.Cover = res.data.Cover;
                    this.EpNumber = res.data.Number;
                    this.Url = res.data.URL;
                })
                .catch((error) => {
                    alert(error.response.data);
                })
        },
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
        createEpisode(anime, season_name, episode_name, episode_number, url) {
            anime = this.Anime, 
            season_name = this.Season, 
            episode_name = this.Name, 
            episode_number = this.EpNumber, 
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
                    this.EpNumber = '';
                    this.Url = '';
                    this.$router.push('/adminHome');
                })
                .catch((error) => {
                    this.info = error.response.data;
                    this.showNotification();
                })
        },
        updateEpisode(id, anime, season_name, episode_name, episode_number, url) {
            id = this.Id;
            anime = this.Anime;
            season_name = this.Season;
            episode_name = this.Name;
            episode_number = this.EpNumber;
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
                    this.EpNumber = '';
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
        },
        selectOperations(e){
            e.preventDefault();
            if(this.anime){
                this.updateEpisode();
            }else{
                this.createEpisode();
            }
        }
    }
}
</script>

<template>
    <div class="cadastro" >
        <form action="" @submit="selectOperations" class="cadastro" >
            <h2 v-if="this.anime">Atualizar Episódio</h2>
            <h2 v-else>Adicionar Episódio</h2>
            
            <input type="text"  disabled    v-model="this.Anime"    placeholder="Nome do Anime" v-if="this.anime"/>
            <select name="AnimesList" v-model="this.Anime" v-else>
                <option value="" selected >Selecione um Anime</option>
                <option v-for="(anime) in AnimesList" :key="anime._id" :value="anime.Name" >{{ anime.Name }}</option>
            </select>
            <select name="SeasonsList" v-model="this.Season">
                <option value="" selected >Selecione uma temporada</option>
                <option v-for="(season) in SeasonsList" :key="season._id" :value="season.Name ">{{ season.Name }}</option>
            </select>
            <input type="text"      v-model="this.Name"     placeholder="Nome do Episódio"/>
            <input type="number"    v-model="this.EpNumber" placeholder="Número do Episódio"/>
            <input type="url"       v-model="this.Url"      placeholder="Url do Vídeo"/>
            
            <button type="submit" v-if="this.anime">Atualizar Episódio</button>
            <button type="submit" v-else>Criar Episódio</button>
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
    margin: 2.5rem auto;
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