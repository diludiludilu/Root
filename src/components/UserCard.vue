<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { User } from '../types';

defineProps<{
  user: User;
}>();

const router = useRouter();
</script>

<template>
  <div class="bg-white dark:bg-gray-800 p-6 rounded shadow-lg border-l-4 border-vintage-ink dark:border-gray-500 flex flex-col gap-4 relative transition-colors duration-300">
    <slot name="top-right"></slot>
    <div class="flex items-center gap-4">
      <img :src="user.image" class="w-16 h-16 rounded-full border-2 border-vintage-ink bg-gray-200">
      <div>
        <h4 class="text-xl font-bold dark:text-white">{{ user.firstName }} {{ user.lastName }}</h4>
        <p class="text-sm text-gray-600 dark:text-gray-300">{{ user.company.title }}</p>
      </div>
    </div>
    
    <button 
      @click="router.push(`/user/${user.id}`)"
      class="w-full mt-2 bg-vintage-ink dark:bg-gray-700 text-vintage-paper dark:text-white py-2 font-bold uppercase tracking-wider hover:bg-vintage-gold dark:hover:bg-gray-600 transition-colors rounded">
      View Profile ➜
    </button>
  </div>
</template>
