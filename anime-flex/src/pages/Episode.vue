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
            console.log()
            axios.get(`${import.meta.env.VITE_BASE_URL}/${this.name}/${this.season}/${this.episode}`)
                .then((res) => {
                    console.log(res.data);
                    this.Episode = res.data;
                })
                .catch((error) => {
                    console.log(error.response.data);
                })
        },
        getLicense(){
            
        }
    }
}

</script>

<template>
    <div class="episode">
        <video width="720" height="480" controls :src="Episode.URL" autoplay>
        </video>
    </div>
</template>

<style scoped>

.episode{
    display: flex;
    margin: 15% auto;
}

</style>