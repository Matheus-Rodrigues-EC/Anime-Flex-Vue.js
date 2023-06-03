<script>
import axios from 'axios';

export default {
    name: 'AnimeList',
    data() {
        return {
            AnimesList: []
        }
    },
    created() {
        this.getAnimes();
    },
    methods: {
        getAnimes() {
            axios.get('http://localhost:5000/animes')
                .then((res) => {
                    console.log(res.data);
                    this.AnimesList = res.data;
                })
                .catch((error) => {
                    alert(error);
                })
        }
    }
}

</script>

<template>
    <div class="Anime_List">
        <ul >
            <li @click="() => console.log(Anime.Name)" class="Anime_Item" v-for="(Anime) in this.AnimesList" :key="Anime._id" >
                <img class="cover" :src="Anime.Cover" />
                <p class="anime_title">{{ Anime.Name }}</p>
            </li>
        </ul>
    </div>
</template>

<style>

.Anime_List{
    width: 100%;
    height: 100vh;
    margin: 150px auto 0 auto;
    display: flex;
    flex-wrap: wrap;
}

ul{
    width: 100%;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 25px;
}

li {
    transition: background-color 0.5s;
    background-color: #181818;
    width: 12rem;
    height: 15rem;
    border: 1.5px solid #000;
    border-radius: 15px;
    
    box-sizing: border-box;
}
li:hover {
    background-color: #101010;
}
::-webkit-scrollbar{
    display: none;
}


li .cover {
    width: fit-content;
    height: 6rem;
    border-radius: 15px;
    margin: 10px;
}

li .anime_title{
    display: flex;
    flex-direction: column;
    font-family: 'Courier New', Courier, monospace;
    font-size: 20px;
    align-items: center;
    justify-content: center;
}



</style>