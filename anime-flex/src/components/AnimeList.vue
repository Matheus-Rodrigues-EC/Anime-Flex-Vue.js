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
            verifyAdmin: '',
            showConfirm: false
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
        },
        deleteAnime(id){
            const token = localStorage.getItem('tokenAdmin');
            axios.delete(`${import.meta.env.VITE_BASE_URL}/deleteAnime`, {
                headers: {
                    'Authorization': `Baerer ${token}`,
                    'id': `${id}`
                }
            })
            .then((res) => {
                console.log(res.data);
                this.getAnimes();
                this.showConfirm = false;
            })
            .catch((error) =>{
                console.log(error);
                this.showConfirm = false;
            })
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
                        <button class="warning" @click="() => this.$router.push(`/updateAnime/${Anime.Name}`)">Editar</button>
                        <button class="danger" @click="() => this.showConfirm = true /*deleteAnime(Anime._id)*/" >Deletar</button>
                </div>

                <div class="ContainerBox" v-show="showConfirm">
                    <div class="confirmBox">
                        <div>
                            <h2>Confirmar exclusão do anime ?</h2>
                        </div>
                        <div class="buttons">
                            <button class="Cancel" @click="() => this.showConfirm = false">Cancelar</button>
                            <button class="danger" @click="() => deleteAnime(Anime._id)" >Confirmar</button>
                        </div>
                    </div>
                </div>
            </li>
        </ul>

    </div>
</template>

<style scoped>

.Anime_List{
    width: 100%;
    height: 75vh;
    margin: 150px auto 0 auto;
    display: flex;
    flex-wrap: wrap;
    overflow-y: scroll;
}
.Anime_List::-webkit-scrollbar{
    display: none;
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

.ContainerBox{
    height: 120%;
    width:  100%;
    background-color: #181818;
    opacity: .95;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: esmaecer 1s;
}

.confirmBox{
    display: flex;
    flex-direction: column;
    width: 450px;
    height: 250px;
    background-color: #000000;
    color: #FFF;
    opacity: 1;
    z-index: 10;
    border-radius: 15px;
    justify-content: space-evenly;
    animation: surgir 2s;
}

.buttons{
    display: flex;
    justify-content: space-evenly;
    height: 35px;
}

:hover.Cancel{
    border-color: #00AA00;
    color: #00AA00;
}

</style>