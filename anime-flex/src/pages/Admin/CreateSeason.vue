<script>
import axios from 'axios';
import { useAdminStore } from '../../stores/userStore.js'

export default {
    name: 'CreateSeason',
    components: {

    },
    data() {
        const AdminStore = useAdminStore();
        return {
            Anime: '', 
            Season: '', 
            Cover: '', 
            Name: '',
            AdminStore
        }
    },
    methods: {
        createSeason(e, anime, n_Season, season_cover, season_name) {
            e.preventDefault();
            anime = this.Anime;
            n_Season = this.Season;
            season_cover = this.Cover;
            season_name = this.Name;

            const body = {anime, n_Season, season_cover, season_name};
            const token = this.AdminStore.adminToken;

            axios.post(`${import.meta.env.VITE_BASE_URL}/createSeason`, body, {
                headers: {
                    'Authorization': `Baerer ${token}` 
                }
            })
                .then((res) => {
                    this.Anime = '';
                    this.Season = '';
                    this.Cover = '';
                    this.Name = '';
                    // console.log("Season Cadastrada.");
                    alert("Season Cadastrada.");
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
        <form action="" @submit="createSeason" class="cadastro" >
            <img class="preview" :src="this.Cover" alt="Esperando Imagem..."/>
            <input type="text" required @change="e => this.Anime = e.target.value" placeholder="Nome do Anime" value="" />
            <input type="number" required @change="e => this.Season = e.target.value" placeholder="Número da Temporada" value="" />
            <input type="url" required @change="e => this.Cover = e.target.value" placeholder="Url da imagem" value="" />
            <input type="text" required @change="e => this.Name = e.target.value" placeholder="Nome da Temporada" value="" />
            <button type="submit">Adicionar Temporada</button>
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