import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import DashboardView from '../views/DashboardView.vue'
import FindDonorsView from '../views/FindDonorsView.vue'
import DonorDetailView from '../views/DonorDetailView.vue'
import FindHospitalsView from '../views/FindHospitalsView.vue'
import RequestsView from '../views/RequestsView.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/login', name: 'login', component: LoginView },
        { path: '/signup', name: 'signup', component: SignupView },
        { path: '/', name: 'dashboard', component: DashboardView },
        { path: '/find-donors', name: 'findDonors', component: FindDonorsView },
        { path: '/find-hospitals', name: 'findHospitals', component: FindHospitalsView },
        { path: '/donor/:id', name: 'donorDetail', component: DonorDetailView },
        { path: '/requests', name: 'requests', component: RequestsView }
    ]
})

// Security Guard
router.beforeEach((to, _from, next) => {
    const isAuthenticated = localStorage.getItem('token');
    
    if (to.name !== 'login' && to.name !== 'signup' && !isAuthenticated) {
        next({ name: 'login' });
    } else {
        next();
    }
});

export default router