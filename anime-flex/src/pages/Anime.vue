<script >
import axios from 'axios';
// import ServiceTest from '../services/services.js';

export default {
    name: 'Anime',
    data() {
        return {
            anime: {},
            seasons: []
        }
    },
    props: {
        name: ''
    },
    created() {
        this.getAnimeInfo();
    },
    mounted(){
        // console.log(ServiceTest.MyString);
    },
    methods:{
        async getAnimeInfo() {
            axios.get(`${import.meta.env.VITE_BASE_URL}/anime/${this.name}`)
                .then((res) => {
                    console.log(res.data);
                    const Anime = res.data.Anime;
                    const Seasons = res.data.Seasons;
                    this.anime = Anime;
                    this.seasons = Seasons;
                })
                .catch((error) => {
                    console.log(error.response.data);
                })
        }
    }
}
</script>

<template>
    <div class="Container">
        <div class="Anime">
            <img class="AnimeCover" :src="anime.Cover" />
            <h2 class="AnimeTitle"> {{ anime.Name }}</h2>
        </div>
        <div class="Seasons">
            <ul class="ListSeasons">
                <li v-for="(season) in this.seasons" :key="season._id" >
                    <router-link :to="'/'+anime.Name+'/'+season.Name">
                        <h4 class="TitleSeason">Season {{ season.Season }} - {{ season.Name }}</h4>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>


.Container{
    width: 100vw;
}

.Anime {
    display: flex;
    flex-direction: column;
    width: auto;
    height: 150px;
    margin: 40px auto 50px auto;
    box-sizing: border-box;
}

.AnimeCover {
    width: fit-content;
    height: 150px;
    margin: auto;
}
.AnimeTitle{
    margin: auto;
}

.ListSeasons{
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 75%;
    height: auto;
    border: 1px solid #181818;
    border-radius: 15px;

    background-color: rgb(0, 0, 0, 0.5);
    list-style-type: none;
    padding: 0 ;
    box-sizing: border-box;
}

li{
    cursor: pointer;
}


</style>>
