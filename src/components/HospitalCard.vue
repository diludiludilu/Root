<script setup lang="ts">
import type { Hospital } from '../types/api';
import { useHospitalStore } from '../stores/hospitals';

const props = defineProps<{
    hospital: Hospital;
}>();

const hospitalStore = useHospitalStore();

const togglePledge = (e: Event) => {
    e.stopPropagation();
    if (hospitalStore.isHospitalPledged(props.hospital.id)) {
        hospitalStore.cancelPledge(props.hospital.id);
    } else {
        hospitalStore.pledgeBlood(props.hospital);
    }
};

const isPledged = () => hospitalStore.isHospitalPledged(props.hospital.id);

const urgencyConfig = {
    'Normal':   { classes: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-blue-200 dark:border-blue-800', dot: 'bg-blue-400' },
    'High':     { classes: 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300 border-orange-200 dark:border-orange-800', dot: 'bg-orange-400' },
    'Critical': { classes: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 border-red-200 dark:border-red-800', dot: 'bg-red-500 animate-pulse' },
}[props.hospital.urgencyLevel];
</script>

<template>
  <div class="group bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col md:flex-row transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">

    <!-- Image Panel -->
    <div class="md:w-72 relative h-48 md:h-auto shrink-0 overflow-hidden">
        <img
          :src="hospital.image"
          :alt="hospital.name"
          class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div class="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 via-black/20 to-transparent"></div>
        <!-- Urgency badge on image -->
        <div class="absolute top-3 left-3">
          <span :class="['inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border', urgencyConfig.classes]">
            <span :class="['w-1.5 h-1.5 rounded-full', urgencyConfig.dot]"></span>
            {{ hospital.urgencyLevel }}
          </span>
        </div>
    </div>

    <!-- Content Panel -->
    <div class="p-6 flex flex-col flex-1 justify-between">
        <div>
          <div class="flex justify-between items-start mb-3">
            <div class="flex-1 min-w-0 pr-4">
              <h3 class="text-xl font-extrabold text-slate-800 dark:text-white truncate">{{ hospital.name }}</h3>
              <p class="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-1.5 mt-1">
                <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                {{ hospital.address.address }}, {{ hospital.address.city }}, {{ hospital.address.state }}
              </p>
            </div>
          </div>

          <!-- Blood Types Needed -->
          <div class="mb-4">
            <p class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Blood Types Urgently Needed</p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="bt in hospital.bloodTypesNeeded"
                :key="bt"
                class="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs font-extrabold px-2.5 py-1 rounded-lg border border-red-100 dark:border-red-900"
              >
                {{ bt }}
              </span>
            </div>
          </div>

          <!-- Contact -->
          <div class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            <span class="font-medium">{{ hospital.contact }}</span>
          </div>
        </div>

        <!-- Pledge Button -->
        <div class="mt-5 pt-5 border-t border-slate-100 dark:border-slate-700">
          <button
            @click="togglePledge"
            :class="[
              'w-full sm:w-auto flex items-center justify-center gap-2 font-bold py-2.5 px-6 rounded-xl transition-all duration-200',
              isPledged()
                ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-2 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100'
                : 'bg-red-600 hover:bg-red-700 text-white hover:shadow-lg hover:shadow-red-500/30'
            ]"
          >
            <svg v-if="!isPledged()" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
            {{ isPledged() ? 'Pledged ✓' : 'Pledge Blood' }}
          </button>
        </div>
    </div>
  </div>
</template>
