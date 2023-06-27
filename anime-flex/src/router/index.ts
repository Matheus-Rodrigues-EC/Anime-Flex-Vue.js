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
import FormAnime from '../pages/Admin/FormAnime.vue';
import FormSeason from '../pages/Admin/FormSeason.vue';
import FormEpisode from '../pages/Admin/FormEpisode.vue';



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
    
    { path: '/FormAnime', name: 'CreateAnime', component: FormAnime, meta:{ permissions: ['admin']}},
    { path: '/FormSeason', name: 'CreateSeason', component: FormSeason, meta:{ permissions: ['admin']}},
    { path: '/FormEpisode', name: 'CreateEpisode', component: FormEpisode, meta:{ permissions: ['admin']}},
    { path: '/FormAnime/:anime', name: 'UpdateAnime', component: FormAnime, props: true, meta:{ permissions: ['admin']}},
    { path: '/FormSeason/:anime/:season', name: 'UpdateSeason', component: FormSeason, props: true, meta:{ permissions: ['admin']}},
    { path: '/FormEpisode/:anime/:season/:episode', name: 'UpdateEpisode', component: FormEpisode, props: true, meta:{ permissions: ['admin']}},

    

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