<script>
import axios from 'axios';
import { useAdminStore } from '../../stores/userStore.js';

export default {
    name: 'UpdateSeason',
    components: {

    },
    props:{
        season: ''
    },
    data() {
        const AdminStore = useAdminStore();
        return {
            Id: '',
            Anime: '', 
            Season: '', 
            Cover: '', 
            Name: '',
            AdminStore,
            ShowNotification: false,
            info: ''
        }
    },
    created() {
        this.getSeason();
    },
    methods:{
        getSeason() {
            axios.get(`${import.meta.env.VITE_BASE_URL}/season/${this.season}`)
                .then((res) => {
                    this.Id = res.data.Season._id;
                    this.Anime = res.data.Season.Anime;
                    this.Season = res.data.Season.Season;
                    this.Cover = res.data.Season.Cover;
                    this.Name = res.data.Season.Name;
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        updateSeason(e, id, anime, n_Season, season_cover, season_name) {
            e.preventDefault();
            id = this.Id;
            anime = this.Anime;
            n_Season = this.Season;
            season_cover = this.Cover;
            season_name = this.Name;

            const body = {id, anime, n_Season, season_cover, season_name};
            const token = this.AdminStore.adminToken;

            axios.put(`${import.meta.env.VITE_BASE_URL}/updateSeason`, body, {
                headers: {
                    'Authorization': `Baerer ${token}`,
                    'id': `${id}`
                }
            })
                .then((res) => {
                    this.info = "Season Atualizada.";
                    this.showNotification();
                    this.Anime = '';
                    this.Season = '';
                    this.Cover = '';
                    this.Name = '';
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
        <form action="" @submit="updateSeason" class="cadastro" >
            <img class="preview" :src="this.Cover" alt="Esperando Imagem..."/>
            <input type="text" required @change="(e) => this.Anime = e.target.value" placeholder="Nome do Anime" :value="this.Anime" />
            <input type="number" required @change="(e) => this.Season = e.target.value" placeholder="Número da Temporada" :value="this.Season" />
            <input type="url" required @change="(e) => this.Cover = e.target.value" placeholder="Url da imagem" :value="this.Cover" />
            <input type="text" required @change="(e) => this.Name = e.target.value" placeholder="Nome da Temporada" :value="this.Name" />
            <button type="submit">Atualizar Temporada</button>
        </form>

        <div v-if="ShowNotification" class="Notification">
            <h4>{{ info }}</h4>
        </div>
    </div>
</template>

<style scoped>

</style>