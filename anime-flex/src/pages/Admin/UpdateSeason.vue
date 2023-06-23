<script>
import axios from 'axios';
import { useAdminStore } from '../../stores/userStore.js';

export default {
    name: 'UpdateSeason',
    components: {

    },
    props:{
        anime: '',
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
            axios.get(`${import.meta.env.VITE_BASE_URL}/season/${this.anime}/${this.season}`)
                .then((res) => {
                    console.log(res.data)
                    this.Id = res.data.seasonInfo._id;
                    this.Anime = res.data.seasonInfo.Anime;
                    this.Season = res.data.seasonInfo.Season;
                    this.Cover = res.data.seasonInfo.Cover;
                    this.Name = res.data.seasonInfo.Name;
                    this.SeasonList = res.data.listSeason;
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
                    this.info = "Temporada Atualizada.";
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
    <div >
        <form action="" @submit="updateSeason" class="cadastro" >
            <img class="preview" :src="this.Cover" alt="Esperando Imagem..."/>
            <input type="text"      disabled v-model="Anime"    placeholder="Nome do Anime" />
            <input type="text"      disabled v-model="Name"     placeholder="Nome da Temporada" />
            <input type="number"    required v-model="Season"   placeholder="Número da Temporada" />
            <input type="url"       required v-model="Cover"    placeholder="Url da imagem" />
            <button type="submit">Atualizar Temporada</button>
        </form>

        <div v-if="ShowNotification" class="Notification">
            <h4>{{ info }}</h4>
        </div>
    </div>
</template>

<style scoped>

</style>