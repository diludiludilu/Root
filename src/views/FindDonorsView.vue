<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useDonorStore } from '../stores/donors';
import FilterBar from '../components/FilterBar.vue';
import DonorCard from '../components/DonorCard.vue';
import SkeletonCard from '../components/SkeletonCard.vue';

const donorStore = useDonorStore();

const searchBloodGroup = ref('');
const searchLocation = ref('');
const currentPage = ref(1);
const pageSize = 12;

onMounted(() => {
  if (donorStore.donors.length === 0) {
    donorStore.fetchDonors();
  }
});

const filteredDonors = computed(() => {
  currentPage.value = 1; // reset page on filter change
  return donorStore.donors.filter(donor => {
    const matchBg = searchBloodGroup.value
      ? donor.bloodGroup === searchBloodGroup.value
      : true;
    const matchLoc = searchLocation.value
      ? (donor.address.city.toLowerCase().includes(searchLocation.value.toLowerCase()) ||
         donor.address.state.toLowerCase().includes(searchLocation.value.toLowerCase()))
      : true;
    return matchBg && matchLoc;
  });
});

const totalPages = computed(() => Math.ceil(filteredDonors.value.length / pageSize));

const paginatedDonors = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return filteredDonors.value.slice(start, start + pageSize);
});

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

// Visible page numbers (max 5 around current)
const visiblePages = computed(() => {
  const total = totalPages.value;
  const cur = currentPage.value;
  const pages: number[] = [];
  const start = Math.max(1, cur - 2);
  const end = Math.min(total, cur + 2);
  for (let i = start; i <= end; i++) pages.push(i);
  return pages;
});

const firstVisiblePage = computed(() => visiblePages.value[0] ?? 1);
const lastVisiblePage = computed(() => visiblePages.value[visiblePages.value.length - 1] ?? 1);
</script>

<template>
  <div class="px-4 py-8 max-w-7xl mx-auto min-h-screen">

    <!-- Page Header -->
    <div class="mb-8">
      <div class="inline-flex items-center gap-2 text-red-600 dark:text-red-400 text-xs font-semibold uppercase tracking-widest mb-3">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12,2c0,0-8,6.86-8,12.5C4,18.64,7.58,22,12,22s8-3.36,8-7.5C20,8.86,12,2,12,2z" /></svg>
        Donor Network
      </div>
      <h1 class="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">Find Blood Donors</h1>
      <p class="text-slate-500 dark:text-slate-400">Search and connect with life-saving blood donors near you.</p>
    </div>

    <!-- Filter Component -->
    <FilterBar v-model:bloodGroup="searchBloodGroup" v-model:location="searchLocation" />

    <!-- Loading State — Skeleton -->
    <div v-if="donorStore.loading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <SkeletonCard v-for="n in 12" :key="n" />
    </div>

    <!-- Error State -->
    <div v-else-if="donorStore.error" class="flex flex-col items-center justify-center py-20 gap-4 text-center">
      <div class="w-16 h-16 bg-red-50 dark:bg-red-900/30 rounded-full flex items-center justify-center">
        <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      </div>
      <div>
        <h3 class="text-xl font-bold text-slate-800 dark:text-white mb-1">Failed to Load Donors</h3>
        <p class="text-slate-500 dark:text-slate-400 text-sm">{{ donorStore.error }}</p>
      </div>
      <button @click="donorStore.fetchDonors()" class="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors">Try Again</button>
    </div>

    <!-- Results -->
    <template v-else>
      <!-- Result Count Bar -->
      <div class="flex items-center justify-between mb-5">
        <p class="text-sm text-slate-500 dark:text-slate-400 font-medium">
          <span v-if="filteredDonors.length > 0">
            Showing <span class="font-bold text-slate-800 dark:text-white">{{ (currentPage - 1) * pageSize + 1 }}–{{ Math.min(currentPage * pageSize, filteredDonors.length) }}</span>
            of <span class="font-bold text-red-600 dark:text-red-400">{{ filteredDonors.length }}</span> donors
          </span>
        </p>
        <span v-if="totalPages > 1" class="text-xs text-slate-400 dark:text-slate-500">Page {{ currentPage }} of {{ totalPages }}</span>
      </div>

      <!-- Donors Grid -->
      <div v-if="paginatedDonors.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <DonorCard
          v-for="donor in paginatedDonors"
          :key="donor.id"
          :donor="donor"
        />
      </div>

      <!-- No Results -->
      <div v-else class="flex flex-col items-center justify-center py-20 gap-4 text-center">
        <div class="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
          <svg class="w-10 h-10 text-slate-300 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
        <div>
          <h3 class="text-xl font-bold text-slate-800 dark:text-white mb-1">No Donors Found</h3>
          <p class="text-slate-500 dark:text-slate-400 text-sm">Try adjusting your search filters.</p>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex justify-center items-center gap-2 mt-12">
        <button
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="w-10 h-10 rounded-xl flex items-center justify-center border-2 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-red-400 hover:text-red-600 dark:hover:text-red-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
        </button>

        <button
          v-if="firstVisiblePage > 1"
          @click="goToPage(1)"
          class="w-10 h-10 rounded-xl text-sm font-semibold border-2 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-red-400 hover:text-red-600 transition-all"
        >1</button>
        <span v-if="firstVisiblePage > 2" class="text-slate-400 px-1">…</span>

        <button
          v-for="page in visiblePages"
          :key="page"
          @click="goToPage(page)"
          :class="[
            'w-10 h-10 rounded-xl text-sm font-semibold border-2 transition-all',
            page === currentPage
              ? 'bg-red-600 border-red-600 text-white shadow-md shadow-red-500/30'
              : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-red-400 hover:text-red-600 dark:hover:text-red-400'
          ]"
        >{{ page }}</button>

        <span v-if="lastVisiblePage < totalPages - 1" class="text-slate-400 px-1">…</span>
        <button
          v-if="lastVisiblePage < totalPages"
          @click="goToPage(totalPages)"
          class="w-10 h-10 rounded-xl text-sm font-semibold border-2 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-red-400 hover:text-red-600 transition-all"
        >{{ totalPages }}</button>

        <button
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="w-10 h-10 rounded-xl flex items-center justify-center border-2 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-red-400 hover:text-red-600 dark:hover:text-red-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

    </template>
  </div>
</template>