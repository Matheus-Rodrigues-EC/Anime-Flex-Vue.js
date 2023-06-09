import { createRouter, createWebHistory } from 'vue-router';
import SignIn from '../pages/SignIn.vue';
import SignUp from '../pages/SignUp.vue';
import Home from '../pages/Home.vue';
import Anime from '../pages/Anime.vue';
import Season from '../pages/Season.vue';
import Episode from '../pages/Episode.vue';

import AdminLogin from '../pages/Admin/AdminLogin.vue';
import AdminHome from '../pages/Admin/AdminHome.vue';
import CreateAdmin from '../pages/Admin/CreateAdmin.vue';
import CreateAnime from '../pages/Admin/CreateAnime.vue';
import CreateSeason from '../pages/Admin/CreateSeason.vue';
import CreateEpisode from '../pages/Admin/CreateEpisode.vue';


const routes = [
    { path: '/', name: 'Home', component: Home},
    { path: '/signin', name: 'SignIn', component: SignIn},
    { path: '/signup', name: 'SignUp', component: SignUp},
    { path: '/anime/:name', name: 'Anime', component: Anime, props: true},
    { path: '/:name/:season', name: 'Season', component: Season, props: true},
    { path: '/:name/:season/:episode', name: 'Episode', component: Episode, props: true},

//  Admin Routes
    { path: '/admin', name: 'AdminLogin', component: AdminLogin},
    { path: '/adminhome', name: 'AdminHome', component: AdminHome},
    { path: '/createAdmin', name: 'CreateAdmin', component: CreateAdmin},
    { path: '/CreateAnime', name: 'CreateAnime', component: CreateAnime},
    { path: '/CreateSeason', name: 'CreateSeason', component: CreateSeason},
    { path: '/CreateEpisode', name: 'CreateEpisode', component: CreateEpisode},
    

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router