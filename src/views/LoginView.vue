<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const auth = useAuthStore();

const username = ref('emilys');
const password = ref('emilyspass');
const error = ref('');
const loading = ref(false);
const showPassword = ref(false);

const handleLogin = async () => {
  error.value = '';
  loading.value = true;
  
  const success = await auth.login(username.value, password.value);
  
  loading.value = false;
  if (success) {
    router.push('/');
  } else {
    error.value = 'Invalid credentials. Please try again.';
  }
};
</script>

<template>
  <div class="min-h-screen flex bg-slate-50 dark:bg-slate-950 transition-colors">

    <!-- LEFT PANEL — Branding -->
    <div class="hidden lg:flex flex-col justify-between w-1/2 bg-gradient-to-br from-red-700 via-red-800 to-red-950 p-12 relative overflow-hidden">
      <!-- Background decoration circles -->
      <div class="absolute -top-20 -left-20 w-80 h-80 bg-white/5 rounded-full"></div>
      <div class="absolute top-1/3 -right-24 w-96 h-96 bg-white/5 rounded-full"></div>
      <div class="absolute -bottom-16 left-1/4 w-64 h-64 bg-white/5 rounded-full"></div>

      <!-- Logo -->
      <div class="relative flex items-center gap-3">
        <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl">
          <svg class="h-7 w-7 text-red-700" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12,2c0,0-8,6.86-8,12.5C4,18.64,7.58,22,12,22s8-3.36,8-7.5C20,8.86,12,2,12,2z" />
          </svg>
        </div>
        <span class="text-white text-2xl font-extrabold tracking-widest uppercase">Blood Link</span>
      </div>

      <!-- Hero Text -->
      <div class="relative">
        <div class="inline-flex items-center gap-2 bg-white/10 text-red-200 text-xs font-semibold px-4 py-2 rounded-full uppercase tracking-widest mb-6 border border-white/20">
          <span class="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
          Saving Lives, One Drop at a Time
        </div>
        <h1 class="text-5xl font-extrabold text-white leading-tight mb-4">
          Find a Donor.<br/>
          <span class="text-red-300">Be a Hero.</span>
        </h1>
        <p class="text-red-200 text-lg leading-relaxed max-w-sm">
          Connect with thousands of blood donors and hospitals in need. Every donation makes a difference.
        </p>
      </div>

      <!-- Stats row -->
      <div class="relative grid grid-cols-3 gap-4">
        <div class="text-center">
          <p class="text-3xl font-extrabold text-white">200+</p>
          <p class="text-red-300 text-sm mt-1">Active Donors</p>
        </div>
        <div class="text-center border-x border-white/20">
          <p class="text-3xl font-extrabold text-white">8</p>
          <p class="text-red-300 text-sm mt-1">Hospitals</p>
        </div>
        <div class="text-center">
          <p class="text-3xl font-extrabold text-white">8+</p>
          <p class="text-red-300 text-sm mt-1">Blood Types</p>
        </div>
      </div>
    </div>

    <!-- RIGHT PANEL — Login Form -->
    <div class="flex-1 flex items-center justify-center p-6 lg:p-16">
      <div class="w-full max-w-md animate-fade-in-up">

        <!-- Mobile logo -->
        <div class="flex lg:hidden items-center gap-3 mb-8 justify-center">
          <div class="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
            <svg class="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12,2c0,0-8,6.86-8,12.5C4,18.64,7.58,22,12,22s8-3.36,8-7.5C20,8.86,12,2,12,2z" />
            </svg>
          </div>
          <span class="text-slate-800 dark:text-white text-2xl font-extrabold tracking-widest uppercase">Blood Link</span>
        </div>

        <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Welcome back</h2>
        <p class="text-slate-500 dark:text-slate-400 mb-8">Sign in to access your donor dashboard.</p>

        <form @submit.prevent="handleLogin" class="space-y-5">
          <!-- Error Alert -->
          <div v-if="error" class="flex items-center gap-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-xl text-sm border border-red-200 dark:border-red-800">
            <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {{ error }}
          </div>

          <div>
            <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Username</label>
            <input
              id="login-username"
              v-model="username"
              type="text"
              required
              placeholder="e.g. emilys"
              class="w-full rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 dark:text-white px-4 py-3 text-sm focus:ring-0 focus:border-red-500 outline-none transition-colors"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Password</label>
            <div class="relative">
              <input
                id="login-password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                required
                placeholder="••••••••"
                class="w-full rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 dark:text-white px-4 py-3 text-sm focus:ring-0 focus:border-red-500 outline-none transition-colors pr-12"
              />
              <button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
              </button>
            </div>
          </div>

          <button
            id="login-submit"
            type="submit"
            :disabled="loading"
            class="w-full bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-red-500/30 flex justify-center items-center gap-2 text-sm"
          >
            <svg v-if="loading" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ loading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>

        <div class="mt-6 p-4 bg-slate-100 dark:bg-slate-800 rounded-xl text-sm text-slate-600 dark:text-slate-400">
          <p class="font-semibold mb-1 text-slate-700 dark:text-slate-300">🧪 Demo Credentials</p>
          <p>Username: <code class="bg-white dark:bg-slate-700 px-1 rounded">emilys</code> &nbsp; Password: <code class="bg-white dark:bg-slate-700 px-1 rounded">emilyspass</code></p>
        </div>

        <p class="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          New here?
          <router-link to="/signup" class="text-red-600 dark:text-red-400 font-semibold hover:underline ml-1">Create an account</router-link>
        </p>
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
  animation: fadeInUp 0.5s ease-out forwards;
}
</style>