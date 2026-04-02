<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { User } from '../types';
import NavBar from '../components/NavBar.vue';
import UserCard from '../components/UserCard.vue';
import { useOverridesStore } from '../stores/overrides';
import { useAuthStore } from '../stores/auth';

const overridesStore = useOverridesStore();
const authStore = useAuthStore();
const searchQuery = ref('');
const loading = ref(false);
const users = ref<User[]>([]);
const hasSearched = ref(false);

const sortBy = ref('');
const filterBloodGroup = ref('');
const filterJobTitle = ref('');

// Generate universally standard blood types rather than exclusively relying on current DOM view existence.
const ALL_BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const processedUsers = computed(() => {
  let result = [...users.value];
  
  if (filterBloodGroup.value) {
    result = result.filter(u => u.bloodGroup === filterBloodGroup.value);
  }
  
  if (filterJobTitle.value) {
    const qt = filterJobTitle.value.toLowerCase();
    result = result.filter(u => u.company?.title?.toLowerCase().includes(qt));
  }
  
  if (sortBy.value === 'name-asc') {
    result.sort((a, b) => a.firstName.localeCompare(b.firstName));
  } else if (sortBy.value === 'name-desc') {
    result.sort((a, b) => b.firstName.localeCompare(a.firstName));
  } else if (sortBy.value === 'age-asc') {
    result.sort((a, b) => a.age - b.age);
  } else if (sortBy.value === 'loc-asc') {
    result.sort((a, b) => {
      const locA = `${a.address?.state || ''} ${a.address?.city || ''}`;
      const locB = `${b.address?.state || ''} ${b.address?.city || ''}`;
      return locA.localeCompare(locB);
    });
  } else if (sortBy.value === 'loc-desc') {
    result.sort((a, b) => {
      const locA = `${a.address?.state || ''} ${a.address?.city || ''}`;
      const locB = `${b.address?.state || ''} ${b.address?.city || ''}`;
      return locB.localeCompare(locA);
    });
  }
  
  return result;
});

const handleSearch = async () => {
  loading.value = true;
  hasSearched.value = true;
  try {
    const selectStr = 'select=id,firstName,lastName,age,company,bloodGroup,address';
    const endpoint = searchQuery.value 
      ? `https://dummyjson.com/users/search?q=${searchQuery.value}&${selectStr}&t=${Date.now()}`
      : `https://dummyjson.com/users?limit=0&${selectStr}&t=${Date.now()}`; // Force deep extraction
      
    const res = await fetch(endpoint);
    const data = await res.json();
    
    // Official remote DummyJSON users (overridden by local storage edits)
    const apiUsers = overridesStore.applyOverrides(data.users);
    
    // Custom synthetic users originating exclusively from local registration
    const syntheticUsers = overridesStore.getLocalProfiles(authStore.users);
    
    // Filter the custom users down to match the search query identically
    const queryStr = searchQuery.value.toLowerCase();
    const matchingCustom = queryStr
      ? syntheticUsers.filter(u => 
          u.firstName?.toLowerCase().includes(queryStr) || 
          u.lastName?.toLowerCase().includes(queryStr)
        )
      : syntheticUsers; // Return everyone if the search bar is empty!
    
    // Concatenate both categories so custom users flawlessly show up!
    users.value = [...matchingCustom, ...apiUsers];
  } catch (error) {
    console.error("Error fetching clan:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  handleSearch(); // Auto-load every profile immediately upon opening
});

</script>

<template>
  <div class="min-h-screen bg-vintage-paper dark:bg-[#121212] text-vintage-ink dark:text-gray-100 font-serif pb-20 relative transition-colors duration-300">
    
    <NavBar />

    <main class="p-8 max-w-6xl mx-auto">
      
      <div class="mb-8 mt-2">
        <!-- Minimalist Horizontal Control Ribbon -->
        <div class="flex flex-col lg:flex-row justify-between items-center gap-4 bg-white dark:bg-gray-800 p-3 rounded shadow-sm border border-gray-300 dark:border-gray-600 transition-colors duration-300">
          
          <!-- LEFT: Search Bar -->
          <form @submit.prevent="handleSearch" class="relative w-full lg:w-1/3 xl:w-1/4">
            <input v-model="searchQuery" type="text" placeholder="Search profiles..." 
              class="w-full py-2 pl-3 pr-16 rounded border border-gray-300 dark:border-gray-500 bg-gray-50 dark:bg-gray-700 shadow-inner focus:ring-1 focus:ring-vintage-gold dark:focus:ring-gray-400 focus:outline-none text-sm text-vintage-ink dark:text-white transition-colors duration-300" />
            <button type="submit" class="absolute right-1 top-1 bottom-1 px-3 bg-vintage-ink dark:bg-gray-600 text-vintage-paper dark:text-white rounded text-xs font-bold hover:bg-vintage-gold dark:hover:bg-gray-500 transition-colors uppercase">
              {{ loading ? '...' : 'Find' }}
            </button>
          </form>
          
          <!-- RIGHT: Sorting Sectors -->
          <div v-if="users.length > 0" class="flex flex-wrap lg:flex-nowrap items-center justify-end gap-3 w-full lg:w-2/3 xl:w-3/4">
            
            <select v-model="sortBy" class="py-2 px-2 text-sm border border-gray-300 rounded bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-500 outline-none focus:border-vintage-gold dark:focus:border-gray-400 cursor-pointer w-full sm:w-auto">
              <option value="">↕️ Sort By Default</option>
              <option value="name-asc">🔤 Name (A-Z)</option>
              <option value="name-desc">🔤 Name (Z-A)</option>
              <option value="age-asc">🌱 Age (Young)</option>
              <option value="age-desc">🌲 Age (Old)</option>
              <option value="loc-asc">📍 Location (A-Z)</option>
              <option value="loc-desc">📍 Location (Z-A)</option>
            </select>
            
            <select v-model="filterBloodGroup" class="py-2 px-2 text-sm border border-gray-300 rounded bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-500 outline-none focus:border-vintage-gold dark:focus:border-gray-400 cursor-pointer w-full sm:w-auto">
              <option value="">🩸 All Blood</option>
              <option v-for="bg in ALL_BLOOD_GROUPS" :key="bg" :value="bg">{{ bg }}</option>
            </select>
            
            <input v-model="filterJobTitle" type="text" placeholder="Filter jobs..." 
              class="py-2 px-3 text-sm border border-gray-300 rounded bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-500 outline-none focus:border-vintage-gold dark:focus:border-gray-400 flex-grow max-w-full sm:max-w-[200px]" />
              
          </div>
        </div>
      </div>

      <div v-if="processedUsers.length > 0" class="space-y-12">
        <section>
          <div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <UserCard 
                v-for="person in processedUsers" 
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