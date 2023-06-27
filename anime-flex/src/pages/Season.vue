<script>
import axios from 'axios';
import { useAdminStore } from '../stores/userStore.js'

export default {
    name: 'Season',
    data() {
        const AdminStore = useAdminStore();
        return {
            SeasonInfo: {},
            EpisodesList: [],
            showConfirm: false,
            AdminStore,
            ShowNotification: false,
            info: ''
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
                    this.SeasonInfo = res.data.Season;
                    this.EpisodesList = res.data.Episodes
                })
                .catch((error) => {
                    this.info = error.response.data;
                    this.showNotification();
                })
        },
        deleteEpisode(id){
            const token = this.AdminStore.adminToken;
            axios.delete(`${import.meta.env.VITE_BASE_URL}/deleteEpisode`, {
                headers: {
                    'Authorization': `Baerer ${token}`,
                    'id': `${id}`
                }
            })
            .then((res) => {
                this.info = "Episódio Deletado.";
                this.showNotification();
                this.getSeason();
                this.showConfirm = false;
            })
            .catch((error) =>{
                this.info = error.response.data;
                this.showNotification();
                this.showConfirm = false;
            })
        },
        showNotification(){
            this.ShowNotification = true;
            setTimeout(() => {
                this.ShowNotification = false;
            }, 4500);
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
                    <router-link :to="(`/${this.name}/${this.season}/${episode.Name}`)" >
                        <h4>{{ episode.Number }}. {{ episode.Name }}</h4>
                    </router-link>
                    <div v-if="this.AdminStore.isLogged" class="Admin" >
                        <button class="warning" @click="this.$router.push(`/FormEpisode/${episode.Anime}/${episode.Season}/${episode.Name}`)">Editar</button>
                        <button class="danger" @click="this.showConfirm = true">Deletar</button>
                    </div>

                    <div class="ContainerBox" v-show="showConfirm">
                        <div class="confirmBox">
                            <div>
                                <h2>Confirmar exclusão do episódio ?</h2>
                            </div>
                            <div class="buttons">
                                <button class="Cancel" @click="his.showConfirm = false">Cancelar</button>
                                <button class="danger" @click="deleteEpisode(episode._id)" >Confirmar</button>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>

        <div v-if="ShowNotification" class="Notification">
            <h4>{{ info }}</h4>
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
    width: fit-content;
    height: 250px;
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
    margin: 25px auto 5px auto;
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

</style>