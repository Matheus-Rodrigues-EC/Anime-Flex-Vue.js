<script>
  import './style.css';
  import axios from 'axios';
  import Navbar from './components/Navbar.vue';
  import AnimeList from './components/AnimeList.vue';

  export default{
    name: 'App',
    components: {
      Navbar,
      AnimeList
    },
    data(){
      return {
        AnimeName: '',
        SeasonNumber: 0,
        EpisodeNumber: 0
      }
    }
  }
</script>

<template>
  <div>
    <Navbar />
    <div>
      <router-view />
    </div>
    <!-- Footer -->
  </div>
  
</template>

<style>



</style>