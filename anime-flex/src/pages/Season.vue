<script>
import axios from 'axios';

export default {
    name: 'Season',
    data() {
        return {
            SeasonInfo: {},
            EpisodesList: [],
            verifyAdmin: ''
        }
    },
    props:{
        name: '',
        season: ''
    },
    created(){
        this.getSeason();
        this.adminOn();
    },
    methods:{
        getSeason() {
            axios.get(`${import.meta.env.VITE_BASE_URL}/${this.name}/${this.season}`)
                .then((res) => {
                    console.log(res.data);
                    this.SeasonInfo = res.data.Season;
                    this.EpisodesList = res.data.Episodes
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
    <div>
        <div class="Banner">
            <img class="BannerImg" :src="SeasonInfo.Cover"/>
            <h2 class="BannerTitle">{{ SeasonInfo.Name }}</h2>
        </div>
        <div class="ContainerList">
            <ul class="List">
                <li v-for="(episode) in EpisodesList" :key="episode._id">
                    <router-link :to="'/'+SeasonInfo.Anime+'/'+SeasonInfo.Name+'/'+episode.Name">
                        <h4>{{ episode.Name }}</h4>
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

.Banner{
    display: flex;
    flex-direction: column;
    margin: 7.5% auto auto auto;
}

.BannerImg{
    width: 75%;
    height: fit-content;
    margin: 50px auto 0 auto;
    animation: esmaecer 1s;
}

.BannerTitle {
    animation: esmaecer 1s;
}

.List{
    display: flex;
    flex-direction: column;
    margin: 0 auto 50px auto;
    width: 75%;
    min-height: 150px;
    height: auto;

    border: 1px solid #000;
    border-radius: 15px;
    background-color: #181818;
    padding: 15px;
    box-sizing: border-box;

    list-style-type: none;
    animation: surgir 1s;

}

li{
    display: flex;
    flex-direction: column;
    margin: 0 auto;
}

h4{
    height: 10px;
    animation: surgir 1s;
}

.Admin{
    display: flex;
    flex-direction: row;
    width: 100%;
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

</style>