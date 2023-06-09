<script>
import axios from 'axios';


export default {
    name: 'Episode', 
    data(){
        return{
            Episode: {}
        }
    },
    props:{
        name:'',
        season: '',
        episode: ''
    },
    created() {
        this.getEpisode();
    }, 
    methods:{
        getEpisode() {
            axios.get(`${import.meta.env.VITE_BASE_URL}/${this.name}/${this.season}/${this.episode}`)
                .then((res) => {
                    this.Episode = res.data;
                })
                .catch((error) => {
                    console.log(error.response.data);
                })
        }
    }
}

</script>

<template>
    <div class="episode">
        <video width="720" height="480" controls :src="Episode.URL" autoplay id="screen">
        </video>
    </div>
</template>

<style scoped>

.episode{
    display: flex;
    margin: 15% auto;
}

#screen {
    position: fixed;
    left: 10%;
    bottom: 0;
    min-width: 80%;
    min-height: 80%;
    z-index: 9;
}

</style>