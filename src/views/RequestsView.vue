<script setup lang="ts">
import { useDonorStore } from '../stores/donors';
import { useHospitalStore } from '../stores/hospitals';
import { useRouter } from 'vue-router';

const donorStore = useDonorStore();
const hospitalStore = useHospitalStore();
const router = useRouter();

const cancelRequest = (id: number) => {
  donorStore.cancelRequest(id);
};

const cancelPledge = (id: number) => {
  hospitalStore.cancelPledge(id);
};
</script>

<template>
  <div class="px-4 py-8 max-w-4xl mx-auto min-h-screen">
    
    <div class="flex items-center gap-4 mb-8">
      <button @click="router.back()" class="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 p-3 rounded-full transition-colors">
        <svg class="w-6 h-6 text-slate-700 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
      </button>
      <div>
        <h2 class="text-3xl font-bold text-slate-800 dark:text-white mb-1">My Activity</h2>
        <p class="text-slate-600 dark:text-slate-400">Manage your blood requests and hospital donation pledges.</p>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="donorStore.requestedDonors.length === 0 && hospitalStore.pledgedHospitals.length === 0" class="bg-white dark:bg-slate-800 rounded-3xl shadow-md p-16 text-center border border-slate-100 dark:border-slate-700">
      <div class="bg-slate-100 dark:bg-slate-700 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-12 h-12 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
      </div>
      <h3 class="text-2xl font-bold text-slate-800 dark:text-white mb-2">No Activity Yet</h3>
      <p class="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8">You haven't requested blood from any donors or pledged to any hospitals yet.</p>
    </div>

    <!-- Pledges List -->
    <div v-if="hospitalStore.pledgedHospitals.length > 0" class="mb-10">
      <h3 class="text-xl font-bold text-slate-800 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">Hospital Pledges</h3>
      <div class="space-y-4">
        <div 
          v-for="hospital in hospitalStore.pledgedHospitals" 
          :key="'h_'+hospital.id"
          class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 flex flex-col sm:flex-row items-center gap-6"
        >
          <img :src="hospital.image" :alt="hospital.name" class="w-20 h-20 rounded-xl border-2 border-slate-100 dark:border-slate-700 object-cover bg-slate-50 dark:bg-slate-900" />
          
          <div class="flex-1 text-center sm:text-left">
            <h3 class="text-xl font-bold text-slate-800 dark:text-white">
              {{ hospital.name }}
              <span class="ml-2 inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-bold uppercase translate-y-[-2px]">{{ hospital.urgencyLevel }} Urgency</span>
            </h3>
            <p class="text-slate-500 dark:text-slate-400 text-sm mt-1">
              {{ hospital.address.city }}, {{ hospital.address.state }}
            </p>
          </div>

          <button 
            @click="cancelPledge(hospital.id)"
            class="bg-slate-100 hover:bg-slate-200 text-slate-600 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-300 font-medium py-2 px-4 rounded-lg transition-colors border border-slate-200 dark:border-slate-600 w-full sm:w-auto"
          >
            Cancel Pledge
          </button>
        </div>
      </div>
    </div>

    <!-- Request List -->
    <div v-if="donorStore.requestedDonors.length > 0">
      <h3 class="text-xl font-bold text-slate-800 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">Blood Requests Sent</h3>
      <div class="space-y-4">
        <div 
          v-for="donor in donorStore.requestedDonors" 
          :key="'d_'+donor.id"
          class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 flex flex-col sm:flex-row items-center gap-6"
        >
          <img :src="donor.image" :alt="donor.firstName" class="w-20 h-20 rounded-full border-2 border-slate-100 dark:border-slate-700 object-contain bg-slate-50 dark:bg-slate-900" />
          
          <div class="flex-1 text-center sm:text-left">
            <h3 class="text-xl font-bold text-slate-800 dark:text-white capitalize">
              {{ donor.firstName }} {{ donor.lastName }}
              <span class="ml-2 inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-bold uppercase translate-y-[-2px]">{{ donor.bloodGroup }}</span>
            </h3>
            <p class="text-slate-500 dark:text-slate-400 text-sm mt-1">
              {{ donor.address.city }}, {{ donor.address.state }}
            </p>
          </div>

          <button 
            @click="cancelRequest(donor.id)"
            class="bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 dark:bg-slate-700 dark:hover:bg-red-900/30 dark:text-slate-300 dark:hover:text-red-400 font-medium py-2 px-4 rounded-lg transition-colors border border-slate-200 dark:border-slate-600 hover:border-red-200 w-full sm:w-auto"
          >
            Cancel Request
          </button>
        </div>
      </div>
    </div>

  </div>
</template>
