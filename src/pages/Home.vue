<script >
import AnimeList from '../components/AnimeList.vue';


export default {
    name: 'Home', 
    components: {
        AnimeList,
    },
    props: {
        AnimeName: String
    }
}
</script>

<template>
    <div class="Container">
        <AnimeList />
    </div>
</template>

<style>

.Container{
    width: auto;
    height: 75vh;
}

h1{
    margin: auto;
}

</style>