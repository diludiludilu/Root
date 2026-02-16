<script setup lang="ts">
import { useClanStore } from '../stores/clan';
import { useRouter } from 'vue-router';

const clanStore = useClanStore();
const router = useRouter();
</script>

<template>
  <div class="min-h-screen bg-vintage-paper text-vintage-ink font-serif pb-20">
    
    <nav class="bg-vintage-ink text-vintage-paper p-4 shadow-md flex justify-between items-center sticky top-0 z-50">
      <div class="flex items-center gap-3">
        <h1 class="text-xl font-bold tracking-widest">MY SAVED CLAN</h1>
      </div>
      <button @click="router.push('/')" class="text-sm font-bold hover:text-vintage-gold underline decoration-vintage-gold">
        ⬅ Back to Search
      </button>
    </nav>

    <main class="p-8 max-w-6xl mx-auto">
      
      <div class="text-center mb-12 mt-4">
        <h2 class="text-5xl font-bold mb-4">Your Saved Family</h2>
        <p class="italic text-gray-600">"Keeping the legacy alive..."</p>
      </div>

      <div v-if="clanStore.members.length === 0" class="text-center opacity-50 mt-20">
        <p class="text-2xl">Your clan book is empty.</p>
        <button @click="router.push('/')" class="mt-4 bg-vintage-ink text-vintage-paper px-6 py-2 rounded font-bold hover:bg-vintage-gold">
          Go Find People
        </button>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="person in clanStore.members" :key="person.id" class="bg-white p-6 rounded shadow-lg border-l-4 border-vintage-gold relative">
          
          <button @click="clanStore.removeMember(person.id)" class="absolute top-2 right-2 text-red-600 hover:text-red-800 font-bold text-xl" title="Remove">
            &times;
          </button>

          <div class="flex items-center gap-4">
            <img :src="person.image" class="w-16 h-16 rounded-full border-2 border-vintage-ink bg-gray-200">
            <div>
              <h4 class="text-xl font-bold">{{ person.firstName }} {{ person.lastName }}</h4>
              <p class="text-sm text-gray-600">{{ person.company.title }}</p>
            </div>
          </div>
        </div>
      </div>

    </main>
  </div>
</template>