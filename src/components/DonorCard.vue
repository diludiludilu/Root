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
    class="group bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-slate-100 dark:border-slate-700 overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
  >
    <!-- Card Header / Image -->
    <div class="h-32 bg-gradient-to-br from-red-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 relative flex justify-center items-end border-b border-slate-100 dark:border-slate-700">

      <!-- Blood Group Badge -->
      <div class="absolute top-3 right-3 bg-red-600 group-hover:bg-red-700 text-white font-extrabold px-3 py-1 rounded-full shadow-md text-sm transition-colors tracking-wide">
        {{ donor.bloodGroup }}
      </div>

      <!-- Avatar -->
      <img
        :src="donor.image"
        :alt="donor.firstName"
        class="w-24 h-24 rounded-full border-4 border-white dark:border-slate-800 bg-white shadow-lg translate-y-1/2 object-contain group-hover:scale-105 transition-transform duration-300"
      />
    </div>

    <!-- Content -->
    <div class="px-5 pt-14 pb-5 flex-1 flex flex-col text-center">
      <h3 class="text-base font-extrabold text-slate-800 dark:text-white capitalize truncate mb-1">
        {{ donor.firstName }} {{ donor.lastName }}
      </h3>

      <p class="text-slate-500 dark:text-slate-400 text-xs mb-4 flex items-center justify-center gap-1">
        <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
        {{ donor.address.city }}, {{ donor.address.state }}
      </p>

      <div class="mt-auto">
        <button
          v-if="!donorStore.isDonorRequested(donor.id)"
          @click="requestBlood"
          class="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-xl transition-all hover:shadow-md hover:shadow-red-500/30 flex items-center justify-center gap-2 text-sm"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          Request Blood
        </button>
        <button
          v-else
          @click.stop="() => {}"
          class="w-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-semibold py-2 px-4 rounded-xl flex items-center justify-center gap-2 cursor-default border-2 border-emerald-200 dark:border-emerald-800 text-sm"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
          Requested
        </button>
      </div>
    </div>
  </div>
</template>
