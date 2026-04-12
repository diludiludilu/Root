<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const auth = useAuthStore();
</script>

<template>
  <div class="px-4 py-12 max-w-4xl mx-auto min-h-screen text-center flex flex-col justify-center animate-fade-in-up">
    
    <div class="mb-12">
      <h1 class="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-white mb-4">
        Welcome to Blood Link, <span class="text-red-600 dark:text-red-500 capitalize">{{ auth.currentUser?.firstName || 'Hero' }}</span>
      </h1>
      <p class="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
        Every drop counts. Choose how you want to make an impact today.
      </p>
    </div>

    <!-- Simple Buttons Layout -->
    <div class="flex flex-col sm:flex-row justify-center items-center gap-6">
      
      <button 
        @click="router.push('/find-donors')"
        class="w-full sm:w-auto px-10 py-5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xl font-bold shadow-lg transition-transform transform hover:scale-105 flex flex-col items-center gap-2 border-2 border-red-700"
      >
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        <span>I Need Blood</span>
        <span class="text-sm font-normal text-red-200 block">Search Donors Nearby</span>
      </button>

      <div class="text-slate-400 dark:text-slate-600 font-medium italic">OR</div>

      <button 
        @click="router.push('/find-hospitals')"
        class="w-full sm:w-auto px-10 py-5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-white border-2 border-slate-200 dark:border-slate-600 rounded-xl text-xl font-bold shadow-lg transition-transform transform hover:scale-105 flex flex-col items-center gap-2"
      >
        <svg class="w-8 h-8 text-red-600 dark:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
        <span>I Want to Donate</span>
        <span class="text-sm font-normal text-slate-500 block">Find Hospitals Needed</span>
      </button>

    </div>
  </div>
</template>

<style scoped>
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out forwards;
}
</style>
