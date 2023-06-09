<script >
import axios from 'axios';
// import ServiceTest from '../services/services.js';

export default {
    name: 'Anime',
    data() {
        return {
            anime: {},
            seasons: [],
            verifyAdmin: ''
        }
    },
    props: {
        name: ''
    },
    created() {
        this.getAnimeInfo();
        this.adminOn();
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
        },
        adminOn(){
            const admin = localStorage.getItem('tokenAdmin');
            if(admin){
                this.verifyAdmin = true;
            }else{
                this.verifyAdmin = false;
            }
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
                    <div v-if="this.verifyAdmin" class="Admin" >
                        <button class="warning">Editar</button>
                        <button class="danger">Deletar</button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>


.Container{
    width: 75vw;
}

.Anime {
    display: flex;
    flex-direction: column;
    width: auto;
    height: 250px;
    margin: 40px auto 50px auto;
    box-sizing: border-box;
    margin: 75px auto ;
    animation: esmaecer 1s;
}

.AnimeCover {
    width: fit-content;
    height: 250px;
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
    border: 1px solid #000;
    border-radius: 15px;

    background-color: #181818;
    list-style-type: none;
    padding: 0 ;
    box-sizing: border-box;
    animation: surgir 1s;

}


li{
    cursor: pointer;
}

.Admin{
    display: flex;
    flex-direction: row;
    width: 50%;
    justify-content: space-around;
    margin: auto auto 5px auto;
}

button {
    margin: 0 5px;
    width: 75px;
    font-size: 10px;
    background-color: #101010;
    transition: border-color, color .5s;
}


</style>>
