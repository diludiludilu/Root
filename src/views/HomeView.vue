<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import UserDetailModal from '../components/UserDetailModal.vue';
import { useAuthStore } from '../stores/auth';

// 1. Types
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
const auth = useAuthStore();
const searchQuery = ref('');
const loading = ref(false);
const users = ref<User[]>([]);
const hasSearched = ref(false);

// --- MODAL STATE ---
const isModalOpen = ref(false);
const selectedUser = ref<User | null>(null);

// This function opens the popup
const openModal = (user: User) => {
  console.log("CLICK DETECTED! Opening modal for:", user.firstName); // <--- DEBUG LOG
  selectedUser.value = user;
  isModalOpen.value = true;
};

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

const handleLogout = () => {
  auth.logout();
  router.push('/');
};
</script>

<template>
  <div class="min-h-screen bg-vintage-paper dark:bg-[#121212] text-vintage-ink dark:text-gray-100 font-serif pb-20 relative transition-colors duration-300">
    
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
              <div v-for="person in group" :key="person.id" 
                   class="bg-white dark:bg-gray-800 p-6 rounded shadow-lg border-l-4 border-vintage-ink dark:border-gray-500 flex flex-col gap-4 transition-colors duration-300">
                
                <div class="flex items-center gap-4">
                  <img :src="person.image" class="w-16 h-16 rounded-full border-2 border-vintage-ink bg-gray-200">
                  <div>
                    <h4 class="text-xl font-bold">{{ person.firstName }} {{ person.lastName }}</h4>
                    <p class="text-sm text-gray-600">{{ person.company.title }}</p>
                  </div>
                </div>

                <button 
                  @click="openModal(person)"
                  class="w-full mt-2 bg-vintage-ink dark:bg-gray-700 text-vintage-paper dark:text-white py-2 font-bold uppercase tracking-wider hover:bg-vintage-gold dark:hover:bg-gray-600 transition-colors rounded">
                  View Profile ➜
                </button>

              </div>
              </div>
          </div>
        </section>
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