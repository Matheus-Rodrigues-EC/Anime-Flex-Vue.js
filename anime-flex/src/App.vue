<script>
  import './style.css';
  import axios from 'axios';
  import Header from './components/Header.vue';
  import AnimeList from './components/AnimeList.vue';

  export default{
    name: 'App',
    components: {
      Header,
      AnimeList
    },
    data(){
      return {
      }
    }
  }
</script>

<template>
  <div>
    <Header />
    <AnimeList />
  </div>
</template>

<style>



</style>