<script>
import axios from 'axios';

export default {
    name: 'CreateAnime',
    components: {

    },
    data() {
        return {
            cover: '',
            name: ''
        }
    },
    methods: {
        createAnime(e, cover, name) {
            e.preventDefault();
            cover = this.cover;
            name = this.name;

            const body = {cover, name};
            const token = localStorage.getItem('tokenAdmin');

            axios.post(`${import.meta.env.VITE_BASE_URL}/createAnime`, body, {
                headers: {
                    'Authorization': `Baerer ${token}` 
                }
            })
                .then((res) => {
                    console.log("Anime Cadastrado.");
                    this.cover = '';
                    this.name = '';
                    this.$router.push('/adminHome');
                })
                .catch((error) => {
                    console.log(error.response.data);
                })
        }
    }
}
</script>

<template>
    <div class="cadastro" >
        <form action="" @submit="createAnime" class="cadastro" >
            <img class="preview" :src="this.cover" alt="Esperando Imagem..."/>
            <input type="url" required @change="e => this.cover = e.target.value" placeholder="Url da imagem" value="" />
            <input type="text" required @change="e => this.name = e.target.value" placeholder="Nome do Anime" value="" />
            <button type="submit">Adicionar Anime</button>
        </form>
    </div>
</template>

<style>

.cadastro{
    display: flex;
    flex-direction: column;
    margin: 5rem auto;
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