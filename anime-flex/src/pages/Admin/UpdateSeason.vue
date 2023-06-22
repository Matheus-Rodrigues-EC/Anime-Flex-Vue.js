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
    <div class="cadastro">
        <form action="" @submit="updateSeason" class="cadastro" >
            <img class="preview" :src="Cover" alt="Esperando Imagem..."/>
            <input type="text" v-model="this.Anime"  placeholder="Anime"  />
            <input type="text" v-model="this.Season"  />
            <input type="url" v-model="this.Cover" placeholder="URL da imagem" />
            <input type="text" v-model="Name" placeholder="Nome da Temporada" :value="" />
            <button type="submit">Atualizar Temporada</button>
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

</style>