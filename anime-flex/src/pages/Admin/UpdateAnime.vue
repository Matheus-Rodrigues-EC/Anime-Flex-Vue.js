<script>
import axios from 'axios';
import { ref } from 'vue';

export default {
    name: 'UpdateAnime',
    components: {

    },
    props:{
        name: ''
    },
    data() {
        return {
            Id: '',
            Cover: '',
            Name: ''
        }
    },
    created() {
        this.getAnimeInfos();
    },
    methods: {
        getAnimeInfos(){
            axios.get(`${import.meta.env.VITE_BASE_URL}/anime/${this.name}`)
                .then((res) => {
                    this.Id = res.data.Anime._id
                    this.Cover = res.data.Anime.Cover
                    this.Name = res.data.Anime.Name
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        updateAnime(e, id, cover, name) {
            e.preventDefault();
            id = this.Id;
            cover = this.Cover;
            name = this.Name;
            console.log(name);

            const body = {cover, name};
            const token = localStorage.getItem('tokenAdmin');

            axios.put(`${import.meta.env.VITE_BASE_URL}/updateAnime`, body, {
                headers: {
                    'Authorization': `Baerer ${token}`,
                    'id': `${id}`
                }
            })
                .then((res) => {
                    console.log("Anime Atualizado.");
                    this.$router.push('/');
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }
}
</script>

<template>
    <div class="cadastro" >
        <form action="" @submit="updateAnime" class="cadastro" >
            <img class="preview" :src="this.Cover" alt="Esperando Imagem..."/>
            <input type="url" required @change="(e) => this.Cover = e.target.value" placeholder="Url da imagem" :value="this.Cover" />
            <input type="text" required @change="(e) => this.Name = e.target.value" placeholder="Nome do Anime" :value="this.Name" />
            <button type="submit">Atualizar Anime</button>
        </form>
    </div>
</template>

<style>

.cadastro{
    display: flex;
    flex-direction: column;
    margin: 7.5rem auto 0 auto; 
    gap: 15px;
}

.preview {
    width: fit-content;
    height: 200px;
    border: 1.5px solid #101010;
    border-radius: 15px;
    margin: auto;
    box-sizing: border-box;
}

</style>