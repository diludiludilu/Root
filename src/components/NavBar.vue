<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { useDonorStore } from '../stores/donors';
import { useHospitalStore } from '../stores/hospitals';
import ThemeToggle from './ThemeToggle.vue';

const router = useRouter();
const auth = useAuthStore();
const donorStore = useDonorStore();
const hospitalStore = useHospitalStore();

const activityCount = computed(() => {
  return donorStore.requestedDonors.length + hospitalStore.pledgedHospitals.length;
});

const handleLogout = () => {
  auth.logout();
  router.push('/login');
};
</script>

<template>
  <nav class="bg-red-700 dark:bg-slate-900 text-white p-4 shadow-md flex justify-between items-center sticky top-0 z-40 transition-colors duration-300">
    
    <!-- LEFT: Branding -->
    <div class="flex items-center gap-3 cursor-pointer" @click="router.push('/')">
      <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
        <svg class="h-6 w-6 text-red-700 dark:text-red-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,2c0,0-8,6.86-8,12.5C4,18.64,7.58,22,12,22s8-3.36,8-7.5C20,8.86,12,2,12,2z" />
        </svg>
      </div>
      <h1 class="text-xl font-bold uppercase tracking-wider hidden sm:block delay-75">Blood Link</h1>
    </div>
    
    <!-- RIGHT: Actions -->
    <div class="flex items-center justify-end gap-2 sm:gap-4 flex-1">
      
      <!-- Theme Toggle Component -->
      <ThemeToggle />

      <template v-if="auth.currentUser">
        <button 
          @click="router.push('/requests')"
          title="My Activity"
          class="relative p-2 rounded-full hover:bg-red-800 dark:hover:bg-slate-800 transition-colors group"
        >
          <svg class="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span 
            v-if="activityCount > 0" 
            class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/4 -translate-y-1/4 ring-2 ring-white dark:ring-slate-900"
          >
            {{ activityCount }}
          </span>
        </button>
        
        <button 
          @click="handleLogout" 
          title="Logout" 
          class="flex items-center gap-2 px-3 py-2 text-sm font-medium hover:bg-red-800 dark:hover:bg-slate-800 rounded transition-colors"
        >
          <svg class="w-5 h-5 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Logout</span>
        </button>
      </template>

    </div>
  </nav>
</template>
