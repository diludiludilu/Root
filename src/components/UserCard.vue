<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { User } from '../types';

defineProps<{
  user: User;
}>();

const router = useRouter();
const imageError = ref(false);
</script>

<template>
  <div class="bg-white dark:bg-gray-800 p-6 rounded shadow-lg border-l-4 border-vintage-ink dark:border-gray-500 flex flex-col h-full gap-4 relative transition-colors duration-300">
    <slot name="top-right"></slot>
    <div class="flex items-start gap-4 flex-1">
      <img v-if="user.image && !imageError" :src="user.image" @error="imageError = true" class="w-16 h-16 rounded-full border-2 border-vintage-ink bg-gray-200 object-cover flex-shrink-0">
      
      <div v-else class="w-16 h-16 rounded-full border-2 border-vintage-ink bg-gray-200 flex items-center justify-center flex-shrink-0 opacity-80 overflow-hidden shadow-inner">
        <svg class="w-12 h-12 text-vintage-ink dark:text-gray-500 mt-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      </div>
      <div class="flex-1 min-w-0 mt-1">
        <h4 class="text-xl font-bold dark:text-white leading-tight truncate" :title="`${user.firstName} ${user.lastName}`">{{ user.firstName }} {{ user.lastName }}</h4>
        <p class="text-sm text-gray-600 dark:text-gray-300 font-medium mb-3 truncate" :title="user.company?.title">{{ user.company?.title || 'Unknown Profession' }}</p>
        <div class="flex flex-wrap gap-2">
            <span class="whitespace-nowrap bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 px-2 py-0.5 rounded text-xs font-bold border border-red-200 dark:border-red-700 shadow-sm">🩸 {{ user.bloodGroup || 'Unknown' }}</span>
            <span class="whitespace-nowrap bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 px-2 py-0.5 rounded text-xs font-bold border border-blue-200 dark:border-blue-700 shadow-sm">🌱 Age: {{ user.age }}</span>
            <span v-if="user.address && user.address.state" class="whitespace-nowrap bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100 px-2 py-0.5 rounded text-xs font-bold border border-indigo-200 dark:border-indigo-700 shadow-sm">📍 {{ user.address.state }}, {{ user.address.city }}</span>
        </div>
      </div>
    </div>
    
    <button 
      @click="router.push(`/user/${user.id}`)"
      class="w-full mt-auto bg-vintage-ink dark:bg-gray-700 text-vintage-paper dark:text-white py-2 font-bold uppercase tracking-wider hover:bg-vintage-gold dark:hover:bg-gray-600 transition-colors rounded flex justify-center items-center gap-2">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
      </svg>
      <span>View Profile</span>
    </button>
  </div>
</template>
