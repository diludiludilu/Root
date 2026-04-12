<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useDonorStore } from '../stores/donors';
import FilterBar from '../components/FilterBar.vue';
import DonorCard from '../components/DonorCard.vue';

const donorStore = useDonorStore();

const searchBloodGroup = ref('');
const searchLocation = ref('');

onMounted(() => {
  if (donorStore.donors.length === 0) {
    donorStore.fetchDonors();
  }
});

const filteredDonors = computed(() => {
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
</script>

<template>
  <div class="px-4 py-8 max-w-7xl mx-auto min-h-screen">
    
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-slate-800 dark:text-white mb-2">Find Blood Donors</h2>
      <p class="text-slate-600 dark:text-slate-400">Search and request life-saving blood donations near you.</p>
    </div>

    <!-- Filter Component -->
    <FilterBar v-model:bloodGroup="searchBloodGroup" v-model:location="searchLocation" />

    <!-- Loading State -->
    <div v-if="donorStore.loading" class="flex justify-center py-20">
      <svg class="animate-spin h-10 w-10 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 00 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>

    <!-- Error State -->
    <div v-else-if="donorStore.error" class="bg-red-50 text-red-600 p-4 rounded-xl text-center">
      Failed to load donors: {{ donorStore.error }}
    </div>

    <!-- Donors Grid -->
    <div v-else-if="filteredDonors.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <DonorCard 
        v-for="donor in filteredDonors" 
        :key="donor.id" 
        :donor="donor" 
      />
    </div>

    <!-- No Results State -->
    <div v-else class="text-center py-20 text-slate-500 dark:text-slate-400">
      <svg class="w-16 h-16 mx-auto mb-4 text-slate-300 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <h3 class="text-xl font-medium mb-1">No Donors Found</h3>
      <p>Try adjusting your search filters.</p>
    </div>

  </div>
</template>