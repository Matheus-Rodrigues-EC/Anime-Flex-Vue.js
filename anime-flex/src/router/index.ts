import { RouteLocationNormalized, createRouter, createWebHistory } from 'vue-router';
import { useAdminStore } from '../stores/userStore';

import SignIn from '../pages/SignIn.vue';
import SignUp from '../pages/SignUp.vue';
import Home from '../pages/Home.vue';
import Anime from '../pages/Anime.vue';
import Season from '../pages/Season.vue';
import Episode from '../pages/Episode.vue';
import Profile from '../pages/Profile.vue';

//  Admin Routes
import AdminHome from '../pages/Admin/AdminHome.vue';
import CreateAdmin from '../pages/Admin/CreateAdmin.vue';
import CreateAnime from '../pages/Admin/CreateAnime.vue';
import CreateSeason from '../pages/Admin/CreateSeason.vue';
import CreateEpisode from '../pages/Admin/CreateEpisode.vue';
import UpdateAnime from '../pages/Admin/UpdateAnime.vue';
import UpdateSeason from '../pages/Admin/UpdateSeason.vue';
import UpdateEpisode from '../pages/Admin/UpdateEpisode.vue';



const routes = [
    { path: '/', name: 'Home', component: Home},
    { path: '/signin', name: 'SignIn', component: SignIn},
    { path: '/signup', name: 'SignUp', component: SignUp},
    { path: '/anime/:name', name: 'Anime', component: Anime, props: true},
    { path: '/:name/:season', name: 'Season', component: Season, props: true},
    { path: '/:name/:season/:episode', name: 'Episode', component: Episode, props: true},
    { path: '/profile/:user', name: 'Profile', component: Profile },

//  Admin Routes
    { path: '/adminhome', name: 'AdminHome', component: AdminHome, meta:{ permissions: ['admin']}},
    { path: '/createAdmin', name: 'CreateAdmin', component: CreateAdmin, meta:{ permissions: ['admin']}},
    { path: '/CreateAnime', name: 'CreateAnime', component: CreateAnime, meta:{ permissions: ['admin']}},
    { path: '/CreateSeason', name: 'CreateSeason', component: CreateSeason, meta:{ permissions: ['admin']}},
    { path: '/CreateEpisode', name: 'CreateEpisode', component: CreateEpisode, meta:{ permissions: ['admin']}},
    { path: '/UpdateAnime/:anime', name: 'UpdateAnime', component: UpdateAnime, props: true, meta:{ permissions: ['admin']}},
    { path: '/UpdateSeason/:anime/:season', name: 'UpdateSeason', component: UpdateSeason, props: true, meta:{ permissions: ['admin']}},
    { path: '/UpdateEpisode/:anime/:season/:episode', name: 'UpdateEpisode', component: UpdateEpisode, props: true, meta:{ permissions: ['admin']}},

    

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to: RouteLocationNormalized, _) => {
    const AdminStore = useAdminStore();

    if(to.meta.permissions){
        if(!AdminStore.isLogged){
            return { path: "/admin"}
        }
    }
})

export default router