<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import UserDetailModal from '../components/UserDetailModal.vue';

// 1. Strict User Type
interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  image: string;
  email: string;
  phone: string;
  bloodGroup: string;
  height: number;
  university: string;
  address: {
    address: string;
    city: string;
    state: string;
    coordinates: { lat: number; lng: number };
  };
  company: {
    title: string;
  };
}

const router = useRouter();
const searchQuery = ref('');
const loading = ref(false);
const users = ref<User[]>([]);
const hasSearched = ref(false);

// Modal State
const isModalOpen = ref(false);
const selectedUser = ref<User | null>(null);

const openModal = (user: User) => {
  selectedUser.value = user;
  isModalOpen.value = true;
};

// Generation Logic
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

const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  router.push('/login');
};
</script>

<template>
  <div class="min-h-screen bg-vintage-paper text-vintage-ink font-serif pb-20 relative">
    
    <nav class="bg-vintage-ink text-vintage-paper p-4 shadow-md flex justify-between items-center sticky top-0 z-40">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 bg-vintage-gold rounded-full flex items-center justify-center text-vintage-ink font-bold border-2 border-vintage-paper">R</div>
        <h1 class="text-xl font-bold tracking-widest hidden md:block">FAMILY ROOT</h1>
      </div>
      
      <div class="flex items-center gap-4">
        <button @click="router.push('/clan')" class="bg-vintage-gold text-vintage-ink px-4 py-2 rounded font-bold hover:bg-white transition-colors text-sm shadow-md border border-vintage-paper">
          📜 My Clan
        </button>
        <button @click="handleLogout" class="text-sm font-bold hover:text-vintage-gold underline decoration-vintage-gold">
          Close Book
        </button>
      </div>
    </nav>

    <main class="p-8 max-w-6xl mx-auto">
      
      <div class="text-center mb-12 mt-4">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">Find Your Clan</h2>
        <p class="italic text-gray-600 mb-8">"Search for a name to reveal the generations..."</p>
        
        <form @submit.prevent="handleSearch" class="relative max-w-lg mx-auto transform hover:scale-105 transition-transform duration-300">
          <input v-model="searchQuery" type="text" placeholder="Try 'Smith'..." 
            class="w-full p-4 pl-6 rounded-full border-4 border-vintage-ink bg-white shadow-2xl focus:ring-4 focus:ring-vintage-gold focus:outline-none text-xl font-bold placeholder-gray-400" />
          <button type="submit" class="absolute right-2 top-2 bottom-2 px-6 bg-vintage-ink text-vintage-paper rounded-full font-bold hover:bg-vintage-gold hover:text-vintage-ink transition-colors uppercase tracking-wider">
            {{ loading ? '...' : 'Seek' }}
          </button>
        </form>
      </div>

      <div v-if="users.length > 0" class="space-y-12 animate-fade-in">
        
        <section v-for="(group, name) in clans" :key="name">
          <div v-if="group.length > 0">
            <div class="flex items-center gap-4 mb-6">
              <div class="h-1 bg-vintage-ink flex-grow opacity-20"></div>
              <h3 class="text-2xl md:text-3xl font-bold text-vintage-ink uppercase tracking-widest">
                {{ name === 'elders' ? '📜 The Elders (60+)' : name === 'adults' ? '⚒️ The Adults (25-59)' : '🌱 The Youth (<25)' }}
              </h3>
              <div class="h-1 bg-vintage-ink flex-grow opacity-20"></div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div v-for="person in group" :key="person.id" @click="openModal(person)" 
                   class="bg-white p-6 rounded shadow-lg border-l-4 hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-1 flex items-center gap-4"
                   :class="name === 'elders' ? 'border-vintage-gold' : name === 'adults' ? 'border-gray-500' : 'border-green-600'">
                
                <img :src="person.image" alt="User" class="w-16 h-16 rounded-full border-2 border-vintage-ink bg-gray-200">
                <div>
                  <h4 class="text-xl font-bold">{{ person.firstName }} {{ person.lastName }}</h4>
                  <p class="text-sm text-gray-600">{{ person.company.title }}</p>
                  <p class="text-xs font-bold text-vintage-gold mt-1">Click to View ➜</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      <div v-else-if="hasSearched && !loading" class="text-center mt-12 opacity-50">
        <p class="text-2xl">No family records found for "{{ searchQuery }}".</p>
      </div>

    </main>

    <UserDetailModal 
      v-if="selectedUser" 
      :isOpen="isModalOpen" 
      :user="selectedUser" 
      @close="isModalOpen = false" 
    />

  </div>
</template>