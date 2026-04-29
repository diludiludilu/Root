<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { useDonorStore } from '../stores/donors';
import { useHospitalStore } from '../stores/hospitals';
import ThemeToggle from './ThemeToggle.vue';

const router = useRouter();
const auth = useAuthStore();
const donorStore = useDonorStore();
const hospitalStore = useHospitalStore();

const activityCount = computed(() => {
  return donorStore.requestedDonors.length + hospitalStore.pledgedHospitals.length;
});

const handleLogout = () => {
  auth.logout();
  router.push('/login');
};

const userInitials = computed(() => {
  const u = auth.currentUser;
  if (!u) return '?';
  return `${u.firstName?.[0] ?? ''}${u.lastName?.[0] ?? ''}`.toUpperCase();
});
</script>

<template>
  <nav class="bg-gradient-to-r from-red-700 to-red-800 dark:from-slate-900 dark:to-slate-900 text-white shadow-lg flex justify-between items-center px-4 sm:px-6 py-3 sticky top-0 z-40 transition-colors duration-300 border-b border-red-800/50 dark:border-slate-700">

    <!-- LEFT: Branding -->
    <div class="flex items-center gap-3 cursor-pointer group" @click="router.push('/')">
      <div class="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200">
        <svg class="h-5 w-5 text-red-700 dark:text-red-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,2c0,0-8,6.86-8,12.5C4,18.64,7.58,22,12,22s8-3.36,8-7.5C20,8.86,12,2,12,2z" />
        </svg>
      </div>
      <span class="text-lg font-extrabold uppercase tracking-widest hidden sm:block">Blood Link</span>
    </div>

    <!-- RIGHT: Actions -->
    <div class="flex items-center gap-2 sm:gap-3">

      <!-- Nav Links (desktop) -->
      <template v-if="auth.currentUser">
        <router-link
          to="/find-donors"
          class="hidden md:flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg hover:bg-red-800/60 dark:hover:bg-slate-800 transition-colors"
          active-class="bg-red-900/50 dark:bg-slate-700"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          Find Donors
        </router-link>
        <router-link
          to="/find-hospitals"
          class="hidden md:flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg hover:bg-red-800/60 dark:hover:bg-slate-800 transition-colors"
          active-class="bg-red-900/50 dark:bg-slate-700"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
          Hospitals
        </router-link>
      </template>

      <!-- Theme Toggle -->
      <ThemeToggle />

      <template v-if="auth.currentUser">
        <!-- Activity Bell -->
        <button
          @click="router.push('/requests')"
          title="My Activity"
          class="relative p-2 rounded-full hover:bg-red-800/60 dark:hover:bg-slate-800 transition-colors group"
        >
          <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span
            v-if="activityCount > 0"
            class="absolute top-0.5 right-0.5 inline-flex items-center justify-center w-4 h-4 text-xs font-bold leading-none bg-white text-red-600 rounded-full ring-2 ring-red-700 dark:ring-slate-900"
          >
            {{ activityCount > 9 ? '9+' : activityCount }}
          </span>
        </button>

        <!-- User Avatar Pill -->
        <div class="flex items-center gap-2 bg-red-800/50 dark:bg-slate-800 rounded-full pl-1 pr-3 py-1 border border-white/20 dark:border-slate-700">
          <div class="w-7 h-7 rounded-full overflow-hidden bg-white/20 shrink-0">
            <img
              v-if="auth.currentUser.image"
              :src="auth.currentUser.image"
              :alt="auth.currentUser.firstName"
              class="w-full h-full object-cover"
            />
            <span v-else class="w-full h-full flex items-center justify-center text-xs font-bold text-white">{{ userInitials }}</span>
          </div>
          <span class="text-sm font-semibold capitalize hidden sm:block">{{ auth.currentUser.firstName }}</span>
        </div>

        <!-- Logout -->
        <button
          @click="handleLogout"
          title="Logout"
          class="flex items-center gap-1.5 px-3 py-2 text-sm font-medium hover:bg-red-800/60 dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span class="hidden sm:block">Logout</span>
        </button>
      </template>
    </div>
  </nav>
</template>
