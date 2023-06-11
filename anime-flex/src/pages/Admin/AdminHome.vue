<script>
import axios from 'axios';

export default {
    name: 'AdminHome',
    data() {
        return{
            verifytoken: '',
            listAdmins: [],
            listMembers: [],
            showConfirmAdmin: false,
            showConfirmBan: false
        }
    },
    created() {
        this.verify();
    },
    methods: {
        verify(){
            this.verifytoken = localStorage.getItem('tokenAdmin');
            if(!this.verifytoken) this.$router.push('/');
        },
        getAdminsList() {
            const token = localStorage.getItem('tokenAdmin');
            axios.get(`${import.meta.env.VITE_BASE_URL}/getadmins`, {
                headers: {
                    'Authorization': `Baerer ${token}` 
                }
            })
                .then((res) => {
                    this.listAdmins = res.data;
                })
                .catch((error) => {
                    alert(error);
                })
        },
        deleteAdmin(name){
            const token = localStorage.getItem('tokenAdmin');   
            axios.delete(`${import.meta.env.VITE_BASE_URL}/deleteAdmin`, {
                headers: {
                    'Authorization': `Baerer ${token}`,
                    'adminName': `${name}`
                }
            })
                .then((res) => {
                    console.log(res.data);
                    this.getAdminsList();
                    this.showConfirmAdmin = false;
                })
                .catch((error) => {
                    alert(error.response.data);
                    this.showConfirmAdmin = false;
                })
        },
        getMembersList(){
            const token = localStorage.getItem('tokenAdmin');
            axios.get(`${import.meta.env.VITE_BASE_URL}/getMembers`, {
                headers: {
                    'Authorization': `Baerer ${token}` 
                }
            })
                .then((res) => {
                    this.listMembers = res.data;
                })
                .catch((error) => {
                    alert(error);
                })
        },
        banMember(name){
            const token = localStorage.getItem('tokenAdmin');   
            axios.delete(`${import.meta.env.VITE_BASE_URL}/banMember`, {
                headers: {
                    'Authorization': `Baerer ${token}`,
                    'name': `${name}`
                }
            })
                .then((res) => {
                    console.log(res.data);
                    this.getMembersList();
                    this.showConfirmBan = false;
                })
                .catch((error) => {
                    alert(error.response.data);
                    this.showConfirmBan = false;
                })
        }
    }
}
</script>

<template>
    <div class="container">
        <h2>Painel de Controle</h2>
        <div class="tabela">
            <div>
                <label>Controle de Administradores</label>
                <div class="lista">
                    <button @click="() => {this.$router.push('/createAdmin');}">Adicionar   Administrador</button>
                    <button @click="() => {getAdminsList()}">Listar Administradores</button>
                </div>
                <ul v-if="listAdmins.length > 0">
                    <li v-for="(admin) in listAdmins" :key="admin._id" >
                        <p>{{ admin.adminName }}</p>
                        <button class="danger" @click="() => this.showConfirmAdmin = true" >Remover</button>

                        <div class="ContainerBox" v-show="showConfirmAdmin">
                            <div class="confirmBox">
                                <div>
                                    <h2>Confirmar remoção desse Administrador ?</h2>
                                </div>
                                <div class="buttons">
                                    <button class="Cancel" @click="() => this.showConfirmAdmin = false">Cancelar</button>
                                    <button class="danger" @click="() => deleteAdmin(admin.adminName)" >Confirmar</button>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <div> 
                <label>Controle de Conteúdo</label>
                <div class="lista">
                    <button @click="() => {this.$router.push('/createAnime');}">Adicionar Anime</button>
                    <button @click="() => {this.$router.push('/createSeason');}">Adicionar Temporada</button>
                    <button @click="() => {this.$router.push('/createEpisode');}">Adicionar Episódio</button>
                </div>
            </div>
            <div>
                <label>Controle de Membros</label>
                <div class="lista">
                    <button @click="() => getMembersList()" >Listar Membros</button>
                    <ul v-if="listMembers.length > 0">
                        <li v-for="(member) in listMembers" :key="member._id" >
                            <p>{{ member.name }}</p>
                            <button class="danger" @click="() => this.showConfirmBan = true" >Ban</button>

                            <div class="ContainerBox" v-show="showConfirmBan">
                            <div class="confirmBox">
                                <div>
                                    <h2>Confirmar Banimento desse Membro ?</h2>
                                </div>
                                <div class="buttons">
                                    <button class="Cancel" @click="() => this.showConfirmBan = false">Cancelar</button>
                                    <button class="danger" @click="() => banMember(member.name)" >Confirmar</button>
                                </div>
                            </div>
                        </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>


.container{
    display: flex;
    flex-direction: column;
    margin: 150px auto 0 auto;
}

label{
    color: #FFF;
}
.tabela{
    display: flex;
    flex-direction: row;
    gap: 25px;
    width: 100%;
}

.lista{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 15rem;
}

button{
    display: flex;
    margin: 5% auto;
    width: 100%;
    justify-content: center;
}


ul{
    width: 100%;
    height: 200px;
    border: 1px solid #000;
    border-radius: 15px;
    background-color: #181818;
    padding: 5px;
    margin: 5% auto;
    box-sizing: border-box;
    list-style-type: none;
    overflow-y: scroll;
    
    animation: surgir 1s;
    
}
ul::-webkit-scrollbar{
    display: none;
}

li{
    transition: .5s;
    animation: surgir 1.5s;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
}

li p{
    margin: 3px auto;
}

li button{
    width: 30%;
    margin: 3px auto;
}

li:hover{
    color: #FFF;
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
    height: 50px;
}
:hover.Cancel{
    border-color: #00AA00;
    color: #00AA00;
}

</style>