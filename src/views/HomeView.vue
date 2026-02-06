<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

// --- 1. STRICT TYPES (Requirement) ---
interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  image: string;
  address: {
    city: string;
    state: string; // The API uses 'state' for some addresses
  };
  company: {
    title: string;
  };
}

const router = useRouter();
const searchQuery = ref('');
const loading = ref(false);
const users = ref<User[]>([]); // Store the raw list of people
const hasSearched = ref(false); // To know if we should show "No results"

// --- 2. LOGIC: GENERATION SORTER ---
// This automatically groups people when 'users' data changes
const clans = computed(() => {
  return {
    elders: users.value.filter(u => u.age >= 60), // The Grandparents
    adults: users.value.filter(u => u.age >= 25 && u.age < 60), // The Parents
    youth: users.value.filter(u => u.age < 25), // The Children
  };
});

// --- 3. FETCH DATA ---
const handleSearch = async () => {
  if (!searchQuery.value) return;
  
  loading.value = true;
  hasSearched.value = true;
  
  try {
    // Search the API for the name
    const res = await fetch(`https://dummyjson.com/users/search?q=${searchQuery.value}`);
    const data = await res.json();
    users.value = data.users; // Save the result
  } catch (error) {
    console.error("Error fetching clan:", error);
  } finally {
    loading.value = false;
  }
};

const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  router.push('/login');
};
</script>

<template>
  <div class="min-h-screen bg-vintage-paper text-vintage-ink font-serif pb-20">
    
    <nav class="bg-vintage-ink text-vintage-paper p-4 shadow-md flex justify-between items-center sticky top-0 z-50">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 bg-vintage-gold rounded-full flex items-center justify-center text-vintage-ink font-bold border-2 border-vintage-paper">R</div>
        <h1 class="text-xl font-bold tracking-widest">FAMILY ROOT</h1>
      </div>
      <button @click="handleLogout" class="text-sm font-bold hover:text-vintage-gold transition-colors underline decoration-vintage-gold">
        Close Book
      </button>
    </nav>

    <main class="p-8 max-w-6xl mx-auto">
      
      <div class="text-center mb-12 mt-4">
        <h2 class="text-5xl font-bold mb-4">Find Your Clan</h2>
        <p class="italic text-gray-600 mb-8">"Search for a name to reveal the generations..."</p>
        
        <form @submit.prevent="handleSearch" class="relative max-w-lg mx-auto transform hover:scale-105 transition-transform duration-300">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Try 'Smith', 'Jones', or 'Brown'..." 
            class="w-full p-4 pl-6 rounded-full border-4 border-vintage-ink bg-white shadow-2xl focus:ring-4 focus:ring-vintage-gold focus:outline-none text-xl font-bold placeholder-gray-400"
          />
          <button type="submit" class="absolute right-2 top-2 bottom-2 px-8 bg-vintage-ink text-vintage-paper rounded-full font-bold hover:bg-vintage-gold hover:text-vintage-ink transition-colors uppercase tracking-wider">
            {{ loading ? '...' : 'Seek' }}
          </button>
        </form>
      </div>

      <div v-if="users.length > 0" class="space-y-12 animate-fade-in">
        
        <section v-if="clans.elders.length > 0">
          <div class="flex items-center gap-4 mb-6">
            <div class="h-1 bg-vintage-ink flex-grow opacity-20"></div>
            <h3 class="text-3xl font-bold text-vintage-ink uppercase tracking-widest">📜 The Elders (60+)</h3>
            <div class="h-1 bg-vintage-ink flex-grow opacity-20"></div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="person in clans.elders" :key="person.id" class="bg-white p-6 rounded shadow-lg border-l-4 border-vintage-gold hover:shadow-2xl transition-shadow flex items-center gap-4">
              <img :src="person.image" alt="User" class="w-16 h-16 rounded-full border-2 border-vintage-ink bg-gray-200">
              <div>
                <h4 class="text-xl font-bold">{{ person.firstName }} {{ person.lastName }}</h4>
                <p class="text-sm text-gray-600">{{ person.company.title }}</p>
                <p class="text-xs font-bold text-vintage-gold mt-1">{{ person.address.city }}</p>
              </div>
            </div>
          </div>
        </section>

        <section v-if="clans.adults.length > 0">
          <div class="flex items-center gap-4 mb-6">
            <div class="h-1 bg-vintage-ink flex-grow opacity-20"></div>
            <h3 class="text-3xl font-bold text-vintage-ink uppercase tracking-widest">⚒️ The Adults (25-59)</h3>
            <div class="h-1 bg-vintage-ink flex-grow opacity-20"></div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="person in clans.adults" :key="person.id" class="bg-white p-6 rounded shadow-lg border-l-4 border-gray-400 hover:shadow-2xl transition-shadow flex items-center gap-4">
              <img :src="person.image" alt="User" class="w-16 h-16 rounded-full border-2 border-vintage-ink bg-gray-200">
              <div>
                <h4 class="text-xl font-bold">{{ person.firstName }} {{ person.lastName }}</h4>
                <p class="text-sm text-gray-600">{{ person.company.title }}</p>
                <p class="text-xs font-bold text-vintage-gold mt-1">{{ person.address.city }}</p>
              </div>
            </div>
          </div>
        </section>

        <section v-if="clans.youth.length > 0">
          <div class="flex items-center gap-4 mb-6">
            <div class="h-1 bg-vintage-ink flex-grow opacity-20"></div>
            <h3 class="text-3xl font-bold text-vintage-ink uppercase tracking-widest">🌱 The Youth (<25)</h3>
            <div class="h-1 bg-vintage-ink flex-grow opacity-20"></div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="person in clans.youth" :key="person.id" class="bg-white p-6 rounded shadow-lg border-l-4 border-green-700 hover:shadow-2xl transition-shadow flex items-center gap-4">
              <img :src="person.image" alt="User" class="w-16 h-16 rounded-full border-2 border-vintage-ink bg-gray-200">
              <div>
                <h4 class="text-xl font-bold">{{ person.firstName }} {{ person.lastName }}</h4>
                <p class="text-sm text-gray-600">Student / Junior</p>
                <p class="text-xs font-bold text-vintage-gold mt-1">{{ person.address.city }}</p>
              </div>
            </div>
          </div>
        </section>

      </div>

      <div v-else-if="hasSearched && !loading" class="text-center mt-12 opacity-50">
        <p class="text-2xl">No family records found for "{{ searchQuery }}".</p>
        <p>Try searching for specific API names like <b>"James"</b>, <b>"Michael"</b>, or just type <b>"a"</b> to see many people.</p>
      </div>

    </main>
  </div>
</template>