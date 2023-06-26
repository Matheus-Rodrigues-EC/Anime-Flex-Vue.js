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
            SeasonList: [],
            AdminStore,
            ShowNotification: false,
            info: ''
        }
    },
    created(){
        this.getEpisode();
        this.getSeasons();
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
        getSeasons(){
            axios.get(`${import.meta.env.VITE_BASE_URL}/anime/${this.anime}`)
                .then((res) => {
                    this.SeasonList = res.data.Seasons;
                })
                .catch((error) => {
                    alert(error);
                })
        },
        updateEpisode(e, id, anime, season_name, episode_name, episode_number, url) {
            e.preventDefault();
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
            <input type="text"      disabled v-model="Anime"    placeholder="Nome do Anime" />
            <select name="SeasonList" v-model="Season">
                <option>Selecione uma temporada</option>
                <option v-for="(season) in SeasonList" :key="season._id" :value="season.Name ">{{ season.Name }}</option>
            </select>
            <input type="text"      required v-model="Name"     placeholder="Nome do Episódio" />
            <input type="number"    required v-model="EpNumber" placeholder="Número do Episódio" />
            <input type="url"       required v-model="Url"      placeholder="Url do Vídeo" />
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