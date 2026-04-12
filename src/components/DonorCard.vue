<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { Donor } from '../types/api';
import { useDonorStore } from '../stores/donors';

const props = defineProps<{
  donor: Donor;
}>();

const router = useRouter();
const donorStore = useDonorStore();

const requestBlood = (e: Event) => {
  e.stopPropagation();
  donorStore.requestBlood(props.donor);
};

const goToDetails = () => {
  router.push(`/donor/${props.donor.id}`);
};
</script>

<template>
  <div 
    @click="goToDetails"
    class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
  >
    <!-- Card Header / Image container -->
    <div class="h-32 bg-red-50 dark:bg-slate-900 relative flex justify-center items-end border-b border-slate-100 dark:border-slate-700">
      <!-- Blood Group Badge -->
      <div class="absolute top-3 right-3 bg-red-600 text-white font-bold px-3 py-1 rounded-full shadow-md text-sm">
        {{ donor.bloodGroup }}
      </div>
      
      <!-- Avatar -->
      <img :src="donor.image" :alt="donor.firstName" class="w-24 h-24 rounded-full border-4 border-white dark:border-slate-800 bg-white shadow-md translate-y-1/2 object-contain" />
    </div>

    <!-- Content -->
    <div class="px-5 pt-14 pb-5 flex-1 flex flex-col text-center">
      <h3 class="text-lg font-bold text-slate-800 dark:text-white capitalize truncate mb-1">
        {{ donor.firstName }} {{ donor.lastName }}
      </h3>
      
      <p class="text-slate-500 dark:text-slate-400 text-sm mb-4 truncate flex items-center justify-center gap-1">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
        {{ donor.address.city }}, {{ donor.address.state }}
      </p>

      <div class="mt-auto">
        <button 
          v-if="!donorStore.isDonorRequested(donor.id)"
          @click="requestBlood"
          class="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
          Request Blood
        </button>
        <button 
          v-else
          @click.stop="() => {}"
          class="w-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 cursor-default"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
          Requested
        </button>
      </div>
    </div>
  </div>
</template>
