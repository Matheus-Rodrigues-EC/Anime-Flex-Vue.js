<script>
import axios from 'axios';

export default {
    name: 'AdminHome',
    data() {
        return{
            verifytoken: '',
            listAdmins: []
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
        }
    }
}
</script>

<template>
    <div class="container">
        <label>Painel de Controle</label>
        <div class="tabela">
            <div>
                <label>Controle de Administradores</label>
                <div class="lista">
                    <button @click="() => {this.$router.push('/createAdmin');}">Adicionar   Administrador</button>
                    <button @click="() => {getAdminsList()}">Listar      Administradores</button>
                </div>
                <ul v-if="listAdmins.length > 0">
                    <li v-for="(admin) in listAdmins" :key="admin._id" >
                        {{ admin.adminName }}
                    </li>
                </ul>
            </div>

            <div> 
                <label>Controle de Conteúdo</label>
                <div class="lista">
                    <button @click="() => {this.$router.push('/');}">Adicionar Anime</button>
                    <button @click="() => {this.$router.push('/');}">Adicionar Temporada</button>
                    <button @click="() => {this.$router.push('/');}">Adicionar Episódio</button>
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
}

.lista{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

button{
    display: flex;
    margin: 5% auto;
    width: 100%;
    justify-content: center;
}


ul{
    width: auto;
    height: 100px;
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
}

li:hover{
    color: #FFF;
}

</style>