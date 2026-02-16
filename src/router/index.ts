import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import ClanView from '../views/ClanView.vue' // <--- This was likely missing!

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: LoginView
        },
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/clan', // <--- This tells the app that "/clan" is a real page
            name: 'clan',
            component: ClanView
        }
    ]
})

// Security Check (Don't change this part)
router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('token');
    if (to.name !== 'login' && !isAuthenticated) {
        next({ name: 'login' });
    } else {
        next();
    }
});

export default router