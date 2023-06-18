<script>
import axios from 'axios';
import { useUserStore, useAdminStore } from '../stores/userStore.js'

export default {
    name: 'AnimeList',
    data() {
        const AdminStore = useAdminStore();
        const UserStore = useUserStore();
        return {
            AnimesList: [],
            BacupAnimesList: [],
            showConfirm: false,
            AdminStore,
            UserStore,
            ShowNotification: false,
            info: '',
            Busca: '',
            
            Cover: '',
            Name: '',
            _id: ''
        }
    },
    created() {
        this.getAnimes();
    },
    methods: {
        getAnimes() {
            axios.get(`${import.meta.env.VITE_BASE_URL}/animes`)
                .then((res) => {
                    this.AnimesList = res.data;
                    this.BacupAnimesList = res.data;
                })
                .catch((error) => {
                    alert(error);
                })
        }, 
        AnimeName(name){
            this.$emit("NameAnime", name);
        },
        deleteAnime(id){
            const token = this.AdminStore.adminToken;
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
        }, 
        addFavorite(anime_name){
            const token = this.UserStore.userToken;
            const body = { Name: anime_name };
            axios.post(`${import.meta.env.VITE_BASE_URL}/favoritar`, body, {
                headers: {
                    'Authorization': `Baerer ${token}`,
                }
            })
            .then((res) => {
                this.info = res.data;
                this.showNotification();
            })
            .catch((error) =>{
                this.info = error.response.data;
                this.showNotification();
            })
        },
        showNotification(){
            this.ShowNotification = true;
            setTimeout(() => {
                this.ShowNotification = false;
            }, 4500);
        },
        filtrar(value){
            const newArr = this.BacupAnimesList.filter((anime) => {
                this.Busca = value;
                if(anime.Name.toLowerCase().includes(this.Busca.toLowerCase())){
                    this._id = anime._id;
                    this.Name = anime.Name;
                    this.Cover = anime.Cover;
                    const Anime = [... [{_id: this._id, Name: this.Name, Cover: this.Cover}]];
                    return Anime;
                }
            })
            this.AnimesList = newArr;
            console.log(newArr);

        }
    }
}

</script>

<template>
    <div class="Anime_List">
        <div class="filtro" v-if="this.UserStore.isLogged">
            <button @click="() => {this.AnimesList = this.BacupAnimesList, this.Busca = ''}">↺</button>
            <input  placeholder="Buscar..." @change="(e) => {filtrar(e.target.value), e.target.value = ''}" value="" />
        </div>
        
        <ul id="List">
            <li @click="() => AnimeName(Anime.Name)" class="Anime_Item" v-for="(Anime) in this.AnimesList" :key="Anime._id" >
                <router-link :to="'/anime/'+Anime.Name">
                    <img class="cover" :src="Anime.Cover" />
                    <p   class="anime_title">{{ Anime.Name }}  </p>
                </router-link>
                <button class="favoriteTrue" v-if="this.UserStore.isLogged" @click="() => {addFavorite(Anime.Name)}">S2</button>
                <div v-if="this.AdminStore.isLogged" class="Admin" >
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

        <div v-if="ShowNotification" class="Notification">
            <h4>{{ info }}</h4>
        </div>
    </div>
</template>

<style scoped>

.Anime_List{
    display: flex;
    width: 100%;
    height: 85vh;
    margin: 75px auto;
    justify-content: center;
    flex-wrap: wrap;
    overflow-y: scroll;
}
.Anime_List::-webkit-scrollbar{
    display: none;
}

.filtro{
    margin: 15px auto;
}

ul{
    width: 100%;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;    
    animation: esmaecer 1s;
    padding: 0;
    margin: 0 2rem;
}

li {
    display: flex;
    flex-direction: column;
    margin: auto;
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
    max-width: 90%;
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
    margin: 30px auto 0 auto;
}

li .favoriteTrue{
    width: 25px;
    height: 25px;
    border-radius: 50%;
    margin: auto;
    padding: 0;
    /* background-color: #AA0000; */
    border-color: #AA0000;
}

.Admin{
    display: flex;
    flex-direction: row;
    width: 100%;
    height: auto;
    justify-content: space-around;
    margin: auto auto 10px auto;
}



button {
    margin: 2.5% 15px;
    width: auto;
    justify-content: center;
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