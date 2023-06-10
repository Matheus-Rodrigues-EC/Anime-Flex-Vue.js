<script >
import axios from 'axios';
// import ServiceTest from '../services/services.js';

export default {
    name: 'Anime',
    data() {
        return {
            anime: {},
            seasons: [],
            verifyAdmin: '',
            showConfirm: false
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
    },
    methods:{
        getAnimeInfo() {
            axios.get(`${import.meta.env.VITE_BASE_URL}/anime/${this.name}`)
                .then((res) => {
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
        },
        deleteSeason(id){
            const token = localStorage.getItem('tokenAdmin');
            axios.delete(`${import.meta.env.VITE_BASE_URL}/deleteSeason`, {
                headers: {
                    'Authorization': `Baerer ${token}`,
                    'id': `${id}`
                }
            })
            .then((res) => {
                console.log(res.data);
                this.getAnimeInfo();
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
                        <button class="warning" @click="() => this.$router.push(`/updateSeason/${season.Name}`)">Editar</button>
                        <button class="danger" @click="() => this.showConfirm = true">Deletar</button>
                    </div>

                    <div class="ContainerBox" v-show="showConfirm">
                        <div class="confirmBox">
                            <div>
                                <h2>Confirmar exclusão da temporada ?</h2>
                            </div>
                            <div class="buttons">
                                <button class="Cancel" @click="() => this.showConfirm = false">Cancelar</button>
                                <button class="danger" @click="() => deleteSeason(season._id)" >Confirmar</button>
                            </div>
                        </div>
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
    max-height: 300px;
    overflow-y: scroll;
    border: 1px solid #000;
    border-radius: 15px;

    background-color: #181818;
    list-style-type: none;
    padding: 0 ;
    box-sizing: border-box;
    animation: surgir 1s;

}
.ListSeasons::-webkit-scrollbar{
    display: none;
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

.ContainerBox{
    height: 100%;
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

</style>>
