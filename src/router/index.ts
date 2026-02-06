import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'

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
        }
    ]
})

// SECURITY GUARD:
// This checks if you have a "token" before letting you see the Home page.
router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('token');

    if (to.name !== 'login' && !isAuthenticated) {
        next({ name: 'login' }); // Kick them to login if no token
    } else {
        next(); // Let them pass
    }
});

export default router