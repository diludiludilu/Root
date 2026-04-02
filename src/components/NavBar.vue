<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const auth = useAuthStore();

const handleLogout = () => {
  auth.logout();
  router.push('/');
};
</script>
<template>
  <nav class="bg-vintage-ink dark:bg-gray-900 text-vintage-paper dark:text-gray-100 p-4 shadow-md flex items-center sticky top-0 z-40 transition-colors duration-300">
    
    <!-- LEFT ALIGNED GROUP (Logo) -->
    <div class="flex flex-1 items-center gap-3">
      <div class="w-8 h-8 bg-vintage-gold rounded-full flex items-center justify-center border-2 border-vintage-ink dark:border-gray-800 shadow-sm overflow-hidden">
        <svg class="h-5 w-5 text-vintage-ink dark:text-gray-900" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 1L6 9H9L3 20H10V24H14V20H21L15 9H18L12 1Z" />
        </svg>
      </div>
      <h1 class="text-xl font-bold tracking-widest hidden md:block">FAMILY ROOT</h1>
    </div>
    
    <!-- CENTER ALIGNED GROUP (Navigation Symbols) -->
    <div class="flex items-center justify-center gap-6">
      <button key="btn-home" @click="router.push('/home')" title="Directory Home" class="bg-gray-200 dark:bg-gray-400 p-2 rounded-full border-2 border-vintage-ink dark:border-gray-800 shadow h-10 w-10 flex items-center justify-center hover:bg-vintage-gold dark:hover:bg-gray-200 transition-colors group">
        <svg class="w-5 h-5 text-vintage-ink dark:text-gray-900 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
        </svg>
      </button>
      
      <button key="btn-clan" @click="router.push('/clan')" title="My Family Cart" class="bg-gray-200 dark:bg-gray-400 p-2 rounded-full border-2 border-vintage-ink dark:border-gray-800 shadow h-10 w-10 flex items-center justify-center hover:bg-vintage-gold dark:hover:bg-gray-200 transition-colors group">
        <svg class="w-5 h-5 text-vintage-ink dark:text-gray-900 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
      </button>

      <button key="btn-profile" @click="router.push('/profile')" title="My Profile" class="bg-gray-200 dark:bg-gray-400 p-2 rounded-full border-2 border-vintage-ink dark:border-gray-800 shadow h-10 w-10 flex items-center justify-center hover:bg-vintage-gold dark:hover:bg-gray-200 transition-colors group">
        <svg class="w-5 h-5 text-vintage-ink dark:text-gray-900 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
        </svg>
      </button>
    </div>

    <!-- RIGHT ALIGNED GROUP (Logout) -->
    <div class="flex flex-1 justify-end">
      <button @click="handleLogout" title="Logout" class="flex items-center gap-2 text-sm font-bold hover:text-vintage-gold dark:hover:text-gray-300 transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
        </svg>
        <span class="underline decoration-vintage-gold dark:decoration-gray-300">Close Book</span>
      </button>
    </div>

  </nav>
</template>
