<script>
  import './style.css';
  import axios from 'axios';
  import Header from './components/Header.vue';
  import AnimeList from './components/AnimeList.vue';
  import SignUp from './pages/SignUp.vue';
  import SignIn from './pages/SignIn.vue';

  export default{
    name: 'App',
    components: {
      Header,
      AnimeList, 
      SignUp,
      SignIn
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
    <!-- <AnimeList /> -->
    <!-- <SignUp /> -->
    <SignIn />
  </div>
</template>

<style>



</style>