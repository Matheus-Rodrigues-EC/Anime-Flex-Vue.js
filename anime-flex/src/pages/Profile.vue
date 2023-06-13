<script>
import axios from 'axios';
import { useUserStore } from '../stores/userStore.js'

export default {
    name: 'Profile',
    data() {
        const UserStore = useUserStore();
        return {
            UserStore,
            editing: false,
            showConfirm: false,

            name: '',
            image: ''
        }
    },
    methods:{
        getInfoProfile(){
            this.name = this.UserStore.userName;
            this.image = this.UserStore.userImage;
        },
        updateProfile(id, name, image){
            id = this.UserStore.userId;
            name = this.name;
            image = this.image;
            const token = this.UserStore.userToken;
            const body = { name, image };
            axios.put(`${import.meta.env.VITE_BASE_URL}/updateMember`, body, {
                headers: {
                    'Authorization': `Baerer ${token}`,
                    'Id': `${id}`
                }
            })
                .then((res) => {
                    const User = JSON.stringify(res.data);
                    localStorage.setItem("configuration", User);
                    this.UserStore.setUser(res.data.token, res.data.Id, res.data.Name, res.data.Image, res.data.Email);
                    this.editing = false;
                })
                .catch((error) => {
                    alert(error);
                })
            // alert(token);
        },
        deleteAccount(){
            const token = this.UserStore.userToken;
            axios.delete(`${import.meta.env.VITE_BASE_URL}/unsubscribe`,{
                headers: {
                    'Authorization': `Baerer ${token}` 
                }
            })
                .then((res) => {
                    alert("Conta Deletada");
                    this.UserStore.clearUser();
                    localStorage.removeItem('configuration');
                    this.$router.push('/');
                })
                .catch((error) => {
                    alert(error)
                })
        }
    }

}
</script>

<template>
    <div class="Container">
        <div class="EditOn" v-if="editing">
            <img :src="this.image" />
            <input placeholder="Url da Imagem" @change="(e) => this.image = e.target.value" :value="this.image" />
            <input placeholder="Nome de Usuário" @change="(e) => this.name = e.target.value" :value="this.name" />
            <div class="buttons">
                <button class="Cancel" @click="() => this.editing = false">Cancelar</button>
                <button class="warning" @click="() => updateProfile()" >Confirmar</button>
            </div>
        </div>
        <div class="Infos" v-else>
            <img :src="this.UserStore.userImage" alt="Imagem de Perfil">
            <h2>Olá, {{ this.UserStore.userName }}.</h2>
            <label>Email: {{ this.UserStore.userEmail }}</label>
            <div class="buttons">
                <button>Favoritos</button>
                <button class="warning" @click="() => {this.editing = true, this.getInfoProfile()}">Editar Perfil</button>
                <button class="danger" @click="() => this.showConfirm = true">Excluir Conta</button>
            </div>
        </div>
        

        <div class="ContainerBox" v-show="showConfirm">
            <div class="confirmBox">
                <div>
                    <h2>Confirmar exclusão de conta ?</h2>
                </div>
                <div class="buttons">
                    <button class="Cancel" @click="() => this.showConfirm = false">Cancelar</button>
                    <button class="danger" @click="() => deleteAccount()" >Confirmar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.Container{
    margin: 5rem auto;
}

img{
    width: 15rem;
    height: fit-content;
    border-radius: 15px;
    margin: 15px auto;
    animation: esmaecer 2s;
}
.Infos{
    display: flex;
    flex-direction: column;
    margin: 25px auto;
    gap: 15px;
    animation: esmaecer 2s;
}

.buttons{
    display: flex;
    gap: 15px;
    animation: surgir 2s;
}

.EditOn{
    animation: surgir 2.5s;
    display: flex;
    flex-direction: column;
    gap: 25px;
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
}
:hover.Cancel{
    border-color: #00AA00;
    color: #00AA00;
}
</style>