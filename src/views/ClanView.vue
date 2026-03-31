<script setup lang="ts">
import { useClanStore } from '../stores/clan';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const clanStore = useClanStore();
const router = useRouter();

onMounted(() => {
  clanStore.refreshMembers();
});
</script>

<template>
  <div class="min-h-screen bg-vintage-paper dark:bg-[#121212] text-vintage-ink dark:text-gray-100 font-serif pb-20 transition-colors duration-300">
    
    <nav class="bg-vintage-ink dark:bg-gray-900 text-vintage-paper dark:text-gray-100 p-4 shadow-md flex justify-between items-center sticky top-0 z-50 transition-colors duration-300">
      <div class="flex items-center gap-3">
        <h1 class="text-xl font-bold tracking-widest">MY FAMILY</h1>
      </div>
      <button @click="router.push('/home')" class="text-sm font-bold hover:text-vintage-gold dark:hover:text-gray-300 underline decoration-vintage-gold dark:decoration-gray-300">
        ⬅ Back to Search
      </button>
    </nav>

    <main class="p-8 max-w-6xl mx-auto">
      


      <div v-if="clanStore.members.length === 0" class="text-center opacity-50 mt-20">
        <p class="text-2xl">Your family book is empty.</p>
        <button @click="router.push('/home')" class="mt-4 bg-vintage-ink dark:bg-gray-700 text-vintage-paper dark:text-gray-100 px-6 py-2 rounded font-bold hover:bg-vintage-gold dark:hover:bg-gray-600 transition-colors">
          Find Your Root
        </button>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="person in clanStore.members" :key="person.id" class="bg-white dark:bg-gray-800 p-6 rounded shadow-lg border-l-4 border-vintage-gold dark:border-gray-500 relative transition-colors duration-300">
          
          <button @click="clanStore.removeMember(person.id)" class="absolute top-2 right-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-bold text-xl" title="Remove">
            &times;
          </button>

          <div class="flex items-center gap-4">
            <img :src="person.image" class="w-16 h-16 rounded-full border-2 border-vintage-ink bg-gray-200">
            <div>
              <h4 class="text-xl font-bold dark:text-white">{{ person.firstName }} {{ person.lastName }}</h4>
              <p class="text-sm text-gray-600 dark:text-gray-300">{{ person.company.title }}</p>
            </div>
          </div>
        </div>
      </div>

    </main>
  </div>
</template>