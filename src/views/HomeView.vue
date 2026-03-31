<script setup lang="ts">
import { ref, computed } from 'vue';
import type { User } from '../types';
import NavBar from '../components/NavBar.vue';
import UserCard from '../components/UserCard.vue';

const searchQuery = ref('');
const loading = ref(false);
const users = ref<User[]>([]);
const hasSearched = ref(false);

// --- LOGIC ---
const clans = computed(() => {
  return {
    elders: users.value.filter(u => u.age >= 60),
    adults: users.value.filter(u => u.age >= 25 && u.age < 60),
    youth: users.value.filter(u => u.age < 25),
  };
});

const handleSearch = async () => {
  if (!searchQuery.value) return;
  loading.value = true;
  hasSearched.value = true;
  try {
    const res = await fetch(`https://dummyjson.com/users/search?q=${searchQuery.value}`);
    const data = await res.json();
    users.value = data.users;
  } catch (error) {
    console.error("Error fetching clan:", error);
  } finally {
    loading.value = false;
  }
};

</script>

<template>
  <div class="min-h-screen bg-vintage-paper dark:bg-[#121212] text-vintage-ink dark:text-gray-100 font-serif pb-20 relative transition-colors duration-300">
    
    <NavBar />

    <main class="p-8 max-w-6xl mx-auto">
      
      <div class="text-center mb-12 mt-4">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">Find Your Family</h2>
        <form @submit.prevent="handleSearch" class="relative max-w-lg mx-auto">
          <input v-model="searchQuery" type="text" placeholder="Your family name? eg:- 'Smith'..." 
            class="w-full p-4 pl-6 rounded-full border-4 border-vintage-ink dark:border-gray-600 bg-white dark:bg-gray-800 shadow-2xl focus:ring-4 focus:ring-vintage-gold dark:focus:ring-gray-400 focus:outline-none text-xl font-bold transition-colors duration-300" />
          <button type="submit" class="absolute right-2 top-2 bottom-2 px-6 bg-vintage-ink dark:bg-gray-700 text-vintage-paper dark:text-white rounded-full font-bold hover:bg-vintage-gold dark:hover:bg-gray-600 transition-colors uppercase">
            {{ loading ? '...' : 'Find' }}
          </button>
        </form>
      </div>

      <div v-if="users.length > 0" class="space-y-12">
        <section v-for="(group, name) in clans" :key="name">
          <div v-if="group.length > 0">
            <h3 class="text-2xl font-bold text-vintage-ink dark:text-gray-200 uppercase tracking-widest mb-4 border-b-2 border-vintage-ink dark:border-gray-600 inline-block">
              {{ name }}
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <UserCard 
                v-for="person in group" 
                :key="person.id" 
                :user="person" 
              />
              </div>
          </div>
        </section>
      </div>
    </main>

  </div>
</template>