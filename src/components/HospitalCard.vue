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

const urgencyColor = {
    'Normal': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    'High': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
    'Critical': 'bg-red-100 text-red-800 animate-pulse dark:bg-red-900/30 dark:text-red-400'
}[props.hospital.urgencyLevel];
</script>

<template>
  <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col md:flex-row transition-all duration-300 hover:shadow-xl">
    
    <div class="md:w-1/3 relative h-48 md:h-auto">
        <img :src="hospital.image" :alt="hospital.name" class="absolute inset-0 w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-r from-transparent to-black/50 md:hidden"></div>
    </div>

    <div class="p-6 md:w-2/3 flex flex-col flex-1">
        <div class="flex justify-between items-start mb-2">
            <div>
                <h3 class="text-xl font-bold text-slate-800 dark:text-white">{{ hospital.name }}</h3>
                <p class="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-1 mt-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    {{ hospital.address.address }}, {{ hospital.address.city }}, {{ hospital.address.state }}
                </p>
            </div>
            <span :class="['text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider', urgencyColor]">
                {{ hospital.urgencyLevel }}
            </span>
        </div>

        <div class="my-4">
            <p class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Urgently Needs</p>
            <div class="flex flex-wrap gap-2">
                <span v-for="bg in hospital.bloodTypesNeeded" :key="bg" class="bg-red-50 dark:bg-slate-700 text-red-600 dark:text-red-400 font-bold border border-red-200 dark:border-slate-600 px-3 py-1 rounded-md text-sm shadow-sm">
                    {{ bg }}
                </span>
            </div>
        </div>

        <div class="mt-auto flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
            <p class="text-slate-600 dark:text-slate-400 text-sm font-medium">
                <span class="inline-block mr-1">📞</span> {{ hospital.contact }}
            </p>
            
            <button 
                @click="togglePledge"
                :class="hospitalStore.isHospitalPledged(hospital.id) 
                    ? 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 border border-slate-300 dark:border-slate-600' 
                    : 'bg-red-600 hover:bg-red-700 text-white font-bold shadow-md'"
                class="px-6 py-2.5 rounded-xl transition-all duration-300 transform active:scale-95 flex-shrink-0"
            >
                {{ hospitalStore.isHospitalPledged(hospital.id) ? 'Pledge Made' : 'Pledge to Donate' }}
            </button>
        </div>
    </div>
  </div>
</template>
