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
  <nav class="bg-vintage-ink dark:bg-gray-900 text-vintage-paper dark:text-gray-100 p-4 shadow-md flex justify-between items-center sticky top-0 z-40 transition-colors duration-300">
    <div class="flex items-center gap-3">
      <div class="w-8 h-8 bg-vintage-gold rounded-full flex items-center justify-center text-vintage-ink font-bold border-2 border-vintage-paper">R</div>
      <h1 class="text-xl font-bold tracking-widest hidden md:block">FAMILY ROOT</h1>
    </div>
    <div class="flex items-center gap-4">
      <button @click="router.push('/clan')" class="bg-vintage-gold dark:bg-gray-700 text-vintage-ink dark:text-white px-4 py-2 rounded font-bold hover:bg-white dark:hover:bg-gray-600 transition-colors text-sm shadow-md border border-vintage-paper dark:border-gray-600">
        📜 My Family 
      </button>
      <button @click="handleLogout" class="text-sm font-bold hover:text-vintage-gold dark:hover:text-gray-300 underline decoration-vintage-gold dark:decoration-gray-300">
        Close Book
      </button>
    </div>
  </nav>
</template>
