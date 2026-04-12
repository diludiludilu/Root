<script setup lang="ts">
import { ref, computed } from 'vue';
import { useHospitalStore } from '../stores/hospitals';
import HospitalCard from '../components/HospitalCard.vue';
import { useRouter } from 'vue-router';

const hospitalStore = useHospitalStore();
const router = useRouter();

const searchLocation = ref('');
const searchUrgency = ref('');

const filteredHospitals = computed(() => {
    return hospitalStore.hospitals.filter(h => {
        const matchLoc = searchLocation.value 
            ? h.address.city.toLowerCase().includes(searchLocation.value.toLowerCase()) || 
              h.address.state.toLowerCase().includes(searchLocation.value.toLowerCase())
            : true;
        const matchUrg = searchUrgency.value
            ? h.urgencyLevel === searchUrgency.value
            : true;

        return matchLoc && matchUrg;
    });
});
</script>

<template>
  <div class="px-4 py-8 max-w-5xl mx-auto min-h-screen animate-fade-in-up">
    
    <div class="flex items-center gap-4 mb-8">
      <button @click="router.back()" class="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 p-3 rounded-full transition-colors text-slate-700 dark:text-slate-300">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
      </button>
      <div>
        <h2 class="text-3xl font-bold text-slate-800 dark:text-white mb-2">Find Hospitals</h2>
        <p class="text-slate-600 dark:text-slate-400">Pledge your blood directly to medical centers in need.</p>
      </div>
    </div>

    <!-- Filter Component for Hospitals -->
    <div class="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md mb-8 flex flex-col md:flex-row gap-4 items-center border border-slate-100 dark:border-slate-700">
        <div class="w-full md:w-1/3">
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status Urgency</label>
            <select v-model="searchUrgency" class="w-full rounded-md border border-slate-300 bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-white px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 transition-colors cursor-pointer outline-none">
                <option value="">All Urgency Levels</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Normal">Normal</option>
            </select>
        </div>
        <div class="w-full md:w-2/3">
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Location Search</label>
            <input v-model="searchLocation" type="text" placeholder="e.g. San Francisco" class="w-full rounded-md border border-slate-300 bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-white px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 transition-colors outline-none" />
        </div>
    </div>

    <!-- Hospitals List -->
    <div v-if="filteredHospitals.length > 0" class="space-y-6">
        <HospitalCard 
            v-for="hospital in filteredHospitals" 
            :key="hospital.id" 
            :hospital="hospital" 
        />
    </div>

    <!-- Empty Results -->
    <div v-else class="text-center py-20 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
        <svg class="w-16 h-16 mx-auto mb-4 text-slate-300 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
        <h3 class="text-xl font-bold text-slate-800 dark:text-white mb-2">No Hospitals Found</h3>
        <p class="text-slate-500 dark:text-slate-400">We couldn't find any hospitals matching those filters.</p>
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
