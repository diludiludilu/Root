<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { useDonorStore } from '../stores/donors';
import { useHospitalStore } from '../stores/hospitals';

const router = useRouter();
const auth = useAuthStore();
const donorStore = useDonorStore();
const hospitalStore = useHospitalStore();

onMounted(() => {
  if (donorStore.donors.length === 0) {
    donorStore.fetchDonors();
  }
});

const totalDonors = computed(() => donorStore.donors.length);
const totalHospitals = computed(() => hospitalStore.hospitals.length);
const myActivity = computed(() => donorStore.requestedDonors.length + hospitalStore.pledgedHospitals.length);
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">

    <!-- Hero Section -->
    <div class="relative bg-gradient-to-br from-red-700 via-red-800 to-red-950 overflow-hidden">
      <!-- Background decorations -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-8 right-1/4 w-64 h-64 bg-white rounded-full"></div>
        <div class="absolute -bottom-20 -left-10 w-80 h-80 bg-white rounded-full"></div>
        <div class="absolute top-1/2 right-10 w-40 h-40 bg-white rounded-full"></div>
      </div>

      <div class="relative max-w-5xl mx-auto px-6 py-16 md:py-24 text-center">

        <!-- Pulse badge -->
        <div class="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-red-200 text-xs font-semibold px-4 py-2 rounded-full uppercase tracking-widest mb-8">
          <span class="w-2 h-2 bg-red-300 rounded-full animate-pulse"></span>
          Real-Time Donor Network
        </div>

        <h1 class="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6 animate-fade-in-up">
          Welcome back,
          <span class="text-red-300 block md:inline capitalize"> {{ auth.currentUser?.firstName || 'Hero' }}</span>
        </h1>

        <p class="text-red-200 text-lg md:text-xl max-w-2xl mx-auto mb-12 animate-fade-in-up" style="animation-delay: 0.1s">
          Every drop counts. Choose how you want to make an impact today.
        </p>

        <!-- CTA Cards -->
        <div class="flex flex-col sm:flex-row justify-center gap-6 animate-fade-in-up" style="animation-delay: 0.2s">

          <button
            id="cta-find-donors"
            @click="router.push('/find-donors')"
            class="group relative flex flex-col items-center gap-3 bg-white text-red-700 px-10 py-7 rounded-2xl font-bold shadow-2xl hover:shadow-white/30 hover:scale-105 transition-all duration-300 min-w-52 border-2 border-transparent hover:border-white"
          >
            <div class="w-14 h-14 bg-red-50 group-hover:bg-red-100 rounded-full flex items-center justify-center transition-colors">
              <svg class="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <div>
              <p class="text-lg font-extrabold">I Need Blood</p>
              <p class="text-sm font-normal text-red-500 mt-0.5">Search Nearby Donors</p>
            </div>
          </button>

          <div class="flex items-center justify-center">
            <span class="text-white/50 font-medium text-sm uppercase tracking-widest">or</span>
          </div>

          <button
            id="cta-find-hospitals"
            @click="router.push('/find-hospitals')"
            class="group relative flex flex-col items-center gap-3 bg-white/10 hover:bg-white/20 text-white px-10 py-7 rounded-2xl font-bold border-2 border-white/20 hover:border-white/50 hover:scale-105 transition-all duration-300 min-w-52 backdrop-blur-sm"
          >
            <div class="w-14 h-14 bg-white/10 group-hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            </div>
            <div>
              <p class="text-lg font-extrabold">I Want to Donate</p>
              <p class="text-sm font-normal text-red-200 mt-0.5">Find Hospitals in Need</p>
            </div>
          </button>

        </div>
      </div>
    </div>

    <!-- Stats Bar -->
    <div class="max-w-5xl mx-auto px-6 -mt-8 relative z-10 animate-fade-in-up" style="animation-delay: 0.3s">
      <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 grid grid-cols-3 divide-x divide-slate-100 dark:divide-slate-700">
        <div class="p-6 text-center">
          <p class="text-3xl font-extrabold text-red-600 dark:text-red-500">
            {{ donorStore.loading ? '—' : totalDonors.toLocaleString() }}
          </p>
          <p class="text-slate-500 dark:text-slate-400 text-sm mt-1 font-medium">Available Donors</p>
        </div>
        <div class="p-6 text-center">
          <p class="text-3xl font-extrabold text-red-600 dark:text-red-500">{{ totalHospitals }}</p>
          <p class="text-slate-500 dark:text-slate-400 text-sm mt-1 font-medium">Hospitals Listed</p>
        </div>
        <div class="p-6 text-center">
          <p class="text-3xl font-extrabold text-red-600 dark:text-red-500">{{ myActivity }}</p>
          <p class="text-slate-500 dark:text-slate-400 text-sm mt-1 font-medium">My Activity</p>
        </div>
      </div>
    </div>

    <!-- Quick Info Row -->
    <div class="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-6">

      <!-- How it Works -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 shadow-sm">
        <h2 class="text-lg font-bold text-slate-800 dark:text-white mb-4">How It Works</h2>
        <div class="space-y-4">
          <div class="flex items-start gap-4">
            <div class="w-8 h-8 rounded-full bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center font-bold text-sm shrink-0">1</div>
            <div>
              <p class="font-semibold text-slate-800 dark:text-white text-sm">Search Donors</p>
              <p class="text-slate-500 dark:text-slate-400 text-xs mt-0.5">Filter by blood type and location to find the right match.</p>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div class="w-8 h-8 rounded-full bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center font-bold text-sm shrink-0">2</div>
            <div>
              <p class="font-semibold text-slate-800 dark:text-white text-sm">Send a Request</p>
              <p class="text-slate-500 dark:text-slate-400 text-xs mt-0.5">Click a donor to view their profile and send a blood request.</p>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div class="w-8 h-8 rounded-full bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center font-bold text-sm shrink-0">3</div>
            <div>
              <p class="font-semibold text-slate-800 dark:text-white text-sm">Track Activity</p>
              <p class="text-slate-500 dark:text-slate-400 text-xs mt-0.5">View all your requests and hospital pledges in one place.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Blood Type Info -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 shadow-sm">
        <h2 class="text-lg font-bold text-slate-800 dark:text-white mb-4">Blood Types Available</h2>
        <div class="grid grid-cols-4 gap-2">
          <div v-for="bt in ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']" :key="bt"
            class="flex flex-col items-center justify-center p-3 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-900/40 hover:scale-105 transition-transform cursor-pointer"
            @click="router.push(`/find-donors`)"
          >
            <span class="text-red-700 dark:text-red-400 font-extrabold text-base">{{ bt }}</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fadeInUp 0.55s ease-out both;
}
</style>
