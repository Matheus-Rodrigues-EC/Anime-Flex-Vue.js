<script >
import AnimeList from '../components/AnimeList.vue';

export default {
    name: 'Home', 
    components: {
        AnimeList
    },
    props: {
        AnimeName: String
    }
}
</script>

<template>
    <div>
        <AnimeList />
    </div>
</template>

<style>

h1{
    margin: auto;
}

</style>