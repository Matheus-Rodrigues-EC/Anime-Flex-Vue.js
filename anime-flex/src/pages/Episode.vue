<script>
import axios from 'axios'

export default {
    name: 'Episode',
    data(){
        return {
            episodeInfo: ''
        }
    },
    props:{
        name: '',
        season: '',
        episode: ''
    },
    created(){
        this.getEpisode();
    },
    methods: {
        getEpisode() {
            axios.get(`${import.meta.env.VITE_BASE_URL}/${this.name}/${this.season}/${this.episode}`)
                .then((res) => {
                    console.log(res.data);
                    this.episodeInfo = res.data;
                })
                .catch((error) => {

                })
        }
    }

}
</script>

<template>
    <div class="container">
        <!-- <iframe :src="this.episodeInfo.URL" ></iframe> -->
        <iframe allowfullscreen="allowfullscreen" 
                frameborder="0" 
                :src="this.episodeInfo.URL"
                >
        </iframe>
    </div>
</template>

<style scoped>

.container{
    margin: 5rem auto;
}

iframe{
    width: 750px;
    height: 500px;

    max-width: 95%;
    max-height: 50%;
    border-radius: 15px;
    box-shadow: 0 0 15px rgb(0, 0, 0, 1);
}


</style>