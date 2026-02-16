import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'// <--- Added this
import HomeView from '../views/HomeView.vue'
import ClanView from '../views/ClanView.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/login', name: 'login', component: LoginView },
        { path: '/signup', name: 'signup', component: SignupView }, // <--- Added this
        { path: '/', name: 'home', component: HomeView },
        { path: '/clan', name: 'clan', component: ClanView }
    ]
})

// Security Guard
router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('token');
    if (to.name !== 'login' && to.name !== 'signup' && !isAuthenticated) {
        next({ name: 'login' });
    } else {
        next();
    }
});

export default router