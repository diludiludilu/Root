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
    router.push('/find-donors');
  }
});

const handleRequest = () => {
  if (donor.value) {
    donorStore.requestBlood(donor.value);
  }
};

const handleCancel = () => {
  if (donor.value) {
    donorStore.cancelRequest(donor.value.id);
  }
};
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">

    <!-- Loading -->
    <div v-if="!donor" class="flex flex-col items-center justify-center py-32 gap-4">
      <svg class="animate-spin h-10 w-10 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p class="text-slate-500 dark:text-slate-400 text-sm">Loading donor profile...</p>
    </div>

    <template v-else>
      <!-- Hero Banner -->
      <div class="bg-gradient-to-br from-red-700 via-red-800 to-red-950 h-56 md:h-64 relative overflow-hidden">
        <div class="absolute inset-0 opacity-10">
          <div class="absolute -bottom-20 -left-10 w-80 h-80 bg-white rounded-full"></div>
          <div class="absolute top-8 right-1/4 w-48 h-48 bg-white rounded-full"></div>
        </div>
        <!-- Back button -->
        <div class="absolute top-4 left-4">
          <button
            @click="router.back()"
            class="flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-xl border border-white/20 transition-all"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back
          </button>
        </div>
        <!-- Blood Type Badge -->
        <div class="absolute top-4 right-4 bg-white/15 backdrop-blur-md text-white px-5 py-2 rounded-2xl font-extrabold text-2xl border border-white/20 shadow-xl">
          {{ donor.bloodGroup }}
        </div>
        <!-- Avatar -->
        <div class="absolute -bottom-16 left-1/2 md:left-8 -translate-x-1/2 md:translate-x-0">
          <img
            :src="donor.image"
            :alt="donor.firstName"
            class="w-32 h-32 rounded-full border-4 border-white dark:border-slate-900 bg-white object-contain shadow-2xl"
          />
        </div>
      </div>

      <!-- Content Card -->
      <div class="max-w-4xl mx-auto px-4 pt-24 md:pt-10 pb-12">
        <div class="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden animate-fade-in-up">

          <!-- Profile Header -->
          <div class="px-8 pt-8 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-slate-100 dark:border-slate-700">
            <div class="md:ml-36">
              <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white capitalize">
                {{ donor.firstName }} {{ donor.lastName }}
              </h1>
              <p class="text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2 text-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                {{ donor.address.address }}, {{ donor.address.city }}, {{ donor.address.state }} {{ donor.address.postalCode }}
              </p>
            </div>

            <!-- Request / Cancel Button -->
            <div class="shrink-0">
              <button
                v-if="!donorStore.isDonorRequested(donor.id)"
                @click="handleRequest"
                class="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-2xl transition-all hover:shadow-lg hover:shadow-red-500/30"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                Send Blood Request
              </button>
              <button
                v-else
                @click="handleCancel"
                class="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-bold py-3 px-8 rounded-2xl border-2 border-emerald-200 dark:border-emerald-800 hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-900/30 dark:hover:text-red-400 dark:hover:border-red-800 transition-all"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                Request Sent — Cancel
              </button>
            </div>
          </div>

          <!-- Contact Info Grid -->
          <div class="p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-slate-50 dark:bg-slate-700/50 p-5 rounded-2xl flex items-center gap-4 border border-slate-100 dark:border-slate-700">
              <div class="bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 p-3 rounded-xl shrink-0">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div class="min-w-0">
                <p class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email</p>
                <p class="text-sm font-bold text-slate-800 dark:text-white truncate mt-0.5">{{ donor.email }}</p>
              </div>
            </div>

            <div class="bg-slate-50 dark:bg-slate-700/50 p-5 rounded-2xl flex items-center gap-4 border border-slate-100 dark:border-slate-700">
              <div class="bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 p-3 rounded-xl shrink-0">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              <div>
                <p class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Phone</p>
                <p class="text-sm font-bold text-slate-800 dark:text-white mt-0.5">{{ donor.phone }}</p>
              </div>
            </div>

            <div class="bg-slate-50 dark:bg-slate-700/50 p-5 rounded-2xl flex items-center gap-4 border border-slate-100 dark:border-slate-700">
              <div class="bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 p-3 rounded-xl shrink-0">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12,2c0,0-8,6.86-8,12.5C4,18.64,7.58,22,12,22s8-3.36,8-7.5C20,8.86,12,2,12,2z" /></svg>
              </div>
              <div>
                <p class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Blood Type</p>
                <p class="text-sm font-bold text-slate-800 dark:text-white mt-0.5">{{ donor.bloodGroup }}</p>
              </div>
            </div>

            <div class="bg-slate-50 dark:bg-slate-700/50 p-5 rounded-2xl flex items-center gap-4 border border-slate-100 dark:border-slate-700">
              <div class="bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 p-3 rounded-xl shrink-0">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              </div>
              <div>
                <p class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Location</p>
                <p class="text-sm font-bold text-slate-800 dark:text-white mt-0.5">{{ donor.address.city }}, {{ donor.address.state }}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </template>
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
