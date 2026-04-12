<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDonorStore } from '../stores/donors';
import type { Donor } from '../types/api';

const route = useRoute();
const router = useRouter();
const donorStore = useDonorStore();

const donorId = Number(route.params.id);
const donor = ref<Donor | null>(null);

onMounted(async () => {
  if (donorStore.donors.length === 0) {
    await donorStore.fetchDonors();
  }
  
  const found = donorStore.getDonorById(donorId);
  if (found) {
    donor.value = found;
  } else {
    // Navigate back if not found
    router.push('/');
  }
});

const handleRequest = () => {
  if (donor.value) {
    donorStore.requestBlood(donor.value);
  }
};
</script>

<template>
  <div class="px-4 py-8 max-w-4xl mx-auto min-h-screen">
    <button @click="router.back()" class="mb-6 flex flex-row items-center gap-2 text-slate-500 hover:text-red-600 transition-colors dark:text-slate-400 dark:hover:text-red-400 font-medium">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
      Back to Search
    </button>
    
    <div v-if="!donor" class="text-center py-20 text-slate-500">
       Loading donor details...
    </div>

    <div v-else class="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden animate-fade-in-up">
      <!-- Header Area -->
      <div class="bg-gradient-to-r from-red-800 to-red-600 h-40 relative">
        <div class="absolute -bottom-16 left-8 flex items-end">
          <img :src="donor.image" :alt="donor.firstName" class="w-32 h-32 rounded-full border-4 border-white dark:border-slate-800 bg-white object-contain shadow-lg" />
        </div>
        <div class="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full font-bold shadow-md text-xl border border-white/30">
          {{ donor.bloodGroup }} Blood Type
        </div>
      </div>
      
      <!-- Content Area -->
      <div class="pt-20 px-8 pb-8">
        <div class="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-8">
          <div>
            <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white capitalize">
              {{ donor.firstName }} {{ donor.lastName }}
            </h2>
            <p class="text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
              <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              {{ donor.address.address }}, {{ donor.address.city }}, {{ donor.address.state }} {{ donor.address.postalCode }}
            </p>
          </div>
          
          <button 
            v-if="!donorStore.isDonorRequested(donor.id)"
            @click="handleRequest"
            class="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-xl shrink-0 transition-transform hover:scale-105 shadow-md flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
            Send Request
          </button>
          <div 
            v-else
            class="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 font-bold py-3 px-8 rounded-xl shrink-0 border border-emerald-200 dark:border-emerald-800 flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            Request Sent
          </div>
        </div>

        <!-- Contact Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-slate-50 dark:bg-slate-700/50 p-5 rounded-2xl flex items-center gap-4">
            <div class="bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 p-3 rounded-full">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </div>
            <div>
              <p class="text-sm font-medium text-slate-500 dark:text-slate-400">Email Address</p>
              <p class="text-base font-bold text-slate-800 dark:text-white">{{ donor.email }}</p>
            </div>
          </div>
          
          <div class="bg-slate-50 dark:bg-slate-700/50 p-5 rounded-2xl flex items-center gap-4">
            <div class="bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 p-3 rounded-full">
               <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
            </div>
            <div>
              <p class="text-sm font-medium text-slate-500 dark:text-slate-400">Phone Number</p>
              <p class="text-base font-bold text-slate-800 dark:text-white">{{ donor.phone }}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out forwards;
}
</style>
