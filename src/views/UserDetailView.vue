<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useClanStore } from '../stores/clan';
import { useAuthStore } from '../stores/auth';
import { useOverridesStore } from '../stores/overrides';
import NavBar from '../components/NavBar.vue';
import type { User } from '../types';

const route = useRoute();
const router = useRouter();
const clanStore = useClanStore();
const authStore = useAuthStore();
const overridesStore = useOverridesStore();

const user = ref<User | null>(null);
const loading = ref(true);
const imageError = ref(false);

onMounted(async () => {
  const id = parseInt(route.params.id as string);
  try {
    let apiData = null;
    
    // 1. Explicitly trap dynamically assigned synthetic Local IDs
    if (id >= 10000) {
      const syntheticArray = overridesStore.getLocalProfiles(authStore.users);
      const matchedUser = syntheticArray.find(u => u.id === id);
      if (matchedUser) {
        apiData = matchedUser;
      }
    }
    
    // 2. Official standard DummyJSON routing
    if (!apiData && id < 10000) {
      const res = await fetch(`https://dummyjson.com/users/${id}`);
      if (res.ok) apiData = await res.json();
    }

    if (apiData) {
       user.value = overridesStore.applyOverride(apiData);
    }
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
});

const addToClan = (user: User) => {
  clanStore.addMember(user);
};
</script>

<template>
  <div class="min-h-screen bg-vintage-paper dark:bg-[#121212] flex flex-col transition-colors duration-300 pb-20 font-serif">
    <NavBar />
    
    <main class="flex-grow p-4 md:p-8 flex items-center justify-center">
      <div v-if="loading" class="text-xl font-bold dark:text-white">Loading historical records...</div>
      
      <div v-else-if="user" class="bg-white dark:bg-gray-800 w-full max-w-3xl rounded-lg shadow-2xl border-4 border-vintage-ink dark:border-gray-600 relative overflow-hidden p-6 md:p-10 transition-colors duration-300">
        
        <div class="flex flex-col md:flex-row gap-8">
          <div class="flex-shrink-0 mx-auto md:mx-0">
            <img v-if="user.image && !imageError" :src="user.image" @error="imageError = true" class="w-40 h-40 rounded-full border-4 border-vintage-ink dark:border-gray-600 bg-gray-200 shadow-md object-cover">
            <div v-else class="w-40 h-40 rounded-full border-4 border-vintage-ink dark:border-gray-600 bg-gray-200 shadow-md flex items-center justify-center overflow-hidden opacity-80">
              <svg class="w-32 h-32 text-vintage-ink dark:text-gray-500 mt-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          </div>
          
          <div class="flex-grow text-center md:text-left">
            <h2 class="text-3xl md:text-4xl font-bold tracking-wider dark:text-white">{{ user.firstName }} {{ user.lastName }}</h2>
            <p class="font-bold text-vintage-gold dark:text-yellow-500 uppercase tracking-wider mt-2">{{ user.company.title }}</p>
            
            <div class="mt-6 space-y-2 text-sm text-left bg-gray-50 dark:bg-gray-700 p-4 rounded border border-vintage-ink dark:border-gray-600">
                <div class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 items-start text-vintage-ink dark:text-gray-100">
                  <span class="font-bold whitespace-nowrap">📍 Location</span>
                  <span>{{ user.address.city }}, {{ user.address.state }}</span>

                  <span class="font-bold whitespace-nowrap">🩸 Blood Group</span>
                  <span>{{ user.bloodGroup }}</span>

                  <span class="font-bold whitespace-nowrap">🎓 Education</span>
                  <span>{{user.university }}</span>

                  <span class="font-bold whitespace-nowrap">📧 Email</span>
                  <span class="break-all">{{ user.email }}</span>
                </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col md:flex-row gap-4 mt-10">
          <button @click="addToClan(user)" class="flex-1 bg-green-800 dark:bg-green-700 text-white py-3 font-bold uppercase hover:bg-green-700 dark:hover:bg-green-600 shadow-lg border-2 border-vintage-ink dark:border-transparent transition-transform transform active:scale-95">
            ➕ Add to My Family
          </button>
          <button @click="router.back()" class="flex-1 bg-vintage-ink dark:bg-gray-600 text-vintage-paper dark:text-white py-3 font-bold uppercase hover:bg-vintage-gold dark:hover:bg-gray-500 border-2 border-vintage-paper dark:border-transparent transition-colors">
            ⬅ Go Back
          </button>
        </div>
      </div>
    </main>
  </div>
</template>
