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
            info: '',
            
            AnimesList: []
        }
    },
    created() {
        this.getAnimes();
        if(this.anime){
            this.getSeason();
        }
    },
    methods:{
        getSeason() {
            axios.get(`${import.meta.env.VITE_BASE_URL}/season/${this.anime}/${this.season}`)
                .then((res) => {
                    this.Id = res.data.seasonInfo._id;
                    this.Anime = res.data.seasonInfo.Anime;
                    this.Season = res.data.seasonInfo.Season;
                    this.Cover = res.data.seasonInfo.Cover;
                    this.Name = res.data.seasonInfo.Name;
                    this.SeasonList = res.data.listSeason;
                })
                .catch((error) => {
                    alert(error);
                })
        },
        createSeason(anime, n_Season, season_cover, season_name) {
            anime = this.Anime;
            n_Season = this.Season;
            season_cover = (this.Cover) ? this.Cover : "Inherit" ;
            season_name = this.Name;

            const body = {anime, n_Season, season_cover, season_name};
            const token = this.AdminStore.adminToken;

            axios.post(`${import.meta.env.VITE_BASE_URL}/createSeason`, body, {
                headers: {
                    'Authorization': `Baerer ${token}` 
                }
            })
                .then((res) => {
                    this.info = "Temporada Cadastrada.";
                    this.showNotification();
                    this.Anime = '';
                    this.Season = '';
                    this.Cover = '';
                    this.Name = '';
                    this.$router.push('/adminHome');
                })
                .catch((error) => {
                    this.info = error.response.data;
                    this.showNotification();
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
        updateSeason(id, anime, n_Season, season_cover, season_name) {
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
        },
        selectOperations(e){
            e.preventDefault();
            if(this.anime){
                this.updateSeason();
            }else{
                this.createSeason();
            }
        }
    }
}
</script>

<template>
    <div class="cadastro">
        <form action="" @submit="selectOperations" class="cadastro" >
            <h2 v-if="this.anime">Atualizar Temporada</h2>
            <h2 v-else>Adicionar Temporada</h2>

            <img class="preview" :src="this.Cover" alt="Esperando Imagem..."/>
            <input type="text"      disabled v-model="Anime"    placeholder="Nome do Anime" v-if="this.anime"/>
            <select name="AnimesList" v-model="this.Anime" v-else>
                <option value="" selected >Selecione um Anime</option>
                <option v-for="(anime) in AnimesList" :key="anime._id" :value="anime.Name" >{{ anime.Name }}</option>
            </select>
            <input type="text"      required v-model="Name"     placeholder="Nome da Temporada" />
            <input type="number"    required v-model="Season"   placeholder="Número da Temporada" />
            <input type="url"       required v-model="Cover"    placeholder="Url da imagem" />

            <button type="submit" v-if="this.anime">Atualizar Temporada</button>
            <button type="submit" v-else>Criar Temporada</button>
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

</style>