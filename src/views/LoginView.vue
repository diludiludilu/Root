<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const auth = useAuthStore();

const username = ref('emilys'); // Pre-filled with valid DummyJSON user
const password = ref('emilyspass');
const error = ref('');
const loading = ref(false);

const handleLogin = async () => {
  error.value = '';
  loading.value = true;
  
  const success = await auth.login(username.value, password.value);
  
  loading.value = false;
  if (success) {
    router.push('/');
  } else {
    error.value = 'Invalid Credentials. Use emilys / emilyspass';
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4 transition-colors">
    <div class="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
      
      <!-- Header -->
      <div class="bg-red-700 p-6 text-center text-white">
        <svg class="h-12 w-12 mx-auto text-white mb-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,2c0,0-8,6.86-8,12.5C4,18.64,7.58,22,12,22s8-3.36,8-7.5C20,8.86,12,2,12,2z" />
        </svg>
        <h2 class="text-2xl font-bold">Blood Link</h2>
        <p class="text-red-200 mt-1">Sign in to find and request donors</p>
      </div>

      <!-- Form -->
      <div class="p-8">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div v-if="error" class="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-200">
            {{ error }}
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Username</label>
            <input 
              v-model="username" 
              type="text" 
              required
              class="w-full rounded-lg border border-slate-300 bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-white px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-shadow"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
            <input 
              v-model="password" 
              type="password" 
              required
              class="w-full rounded-lg border border-slate-300 bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-white px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-shadow"
            />
          </div>

          <button 
            type="submit" 
            :disabled="loading"
            class="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex justify-center items-center gap-2"
            :class="{ 'opacity-70 cursor-not-allowed': loading }"
          >
            <svg v-if="loading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ loading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>
        
        <div class="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          DummyJSON test account: emilys / emilyspass
        </div>
      </div>
    </div>
  </div>
</template>