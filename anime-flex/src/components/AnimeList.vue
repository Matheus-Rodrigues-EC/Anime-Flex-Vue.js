<script>
import axios from 'axios';

export default {
    name: 'AnimeList',
    components: {

    },
    props: {
    },
    data() {
        return {
            AnimesList: [],
            verifyAdmin: ''

        }
    },
    created() {
        this.getAnimes();
        this.adminOn();
    },
    methods: {
        getAnimes() {
            axios.get(`${import.meta.env.VITE_BASE_URL}/animes`)
                .then((res) => {
                    this.AnimesList = res.data;
                })
                .catch((error) => {
                    alert(error);
                })
        }, 
        AnimeName(name){
            this.$emit("NameAnime", name);
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
    <div class="Anime_List">
        <ul id="List">
            <li @click="() => AnimeName(Anime.Name)" class="Anime_Item" v-for="(Anime) in this.AnimesList" :key="Anime._id" >
                <router-link :to="'/anime/'+Anime.Name">
                    <img class="cover" :src="Anime.Cover" />
                    <p   class="anime_title">{{ Anime.Name }}</p>
                </router-link>
                <div v-if="this.verifyAdmin" class="Admin" >
                        <button class="warning">Editar</button>
                        <button class="danger">Deletar</button>
                </div>
            </li>
        </ul>
    </div>
</template>

<style scoped>

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
    animation: esmaecer 1s;
}

li {
    display: flex;
    flex-direction: column;
    transition: background-color 0.5s;
    background-color: #181818;
    width: 15rem;
    height: 18rem;
    flex-wrap: nowrap;
    border: 1.5px solid #000;
    border-radius: 15px;
    box-sizing: border-box;
    animation: esmaecer 1s;
}
li:hover {
    background-color: #101010;
}
::-webkit-scrollbar{
    display: none;
}


li .cover {
    width: fit-content;
    height: 7rem;
    border-radius: 15px;
    margin: 10px;
}

li .anime_title{
    display: flex;
    font-family: 'Courier New', Courier, monospace;
    font-size: 20px;
    align-items: center;
    justify-content: center;
    margin: 30px auto;
}

.Admin{
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
    margin: auto auto 10px auto;
}



button {
    margin: 0 5px;
    width: 75px;
    font-size: 10px;
    background-color: #101010;
    transition: border-color, color .5s;
}

</style>