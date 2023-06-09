<script>
import axios from 'axios';

export default {
    name: 'Season',
    data() {
        return {
            SeasonInfo: {},
            EpisodesList: []
        }
    },
    props:{
        name: '',
        season: ''
    },
    created(){
        this.getSeason();
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
                    </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>

.Banner{
    display: flex;
    flex-direction: column;
    margin: 7.5% auto;
}

.BannerImg{
    width: 75%;
    height: fit-content;
    margin: auto;
}

.List{
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 75%;
    min-height: 150px;
    height: auto;

    border: 1px solid #181818;
    border-radius: 15px;
    background-color: rgb(0, 0, 0, 0.5);
    padding: 15px;
    box-sizing: border-box;

    list-style-type: none;
}

li{
    display: flex;
    flex-direction: row;
    gap: 25px;
    margin: 0 auto;
}

.Cover{
    width: 100px;
}



</style>