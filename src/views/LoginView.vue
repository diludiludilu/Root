<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth'; // Import the new store

const username = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();
const auth = useAuthStore();

const handleLogin = () => {
  const success = auth.login(username.value, password.value);
  
  if (success) {
    router.push('/'); // Go to Home
  } else {
    error.value = 'Please, check your username / password.';
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-vintage-paper dark:bg-[#121212] text-vintage-ink dark:text-gray-100 font-serif transition-colors duration-300">
    
    <div class="bg-white dark:bg-gray-800 p-8 rounded shadow-2xl border-2 border-vintage-gold dark:border-gray-600 w-96 relative transition-colors duration-300">
      <div class="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-800 border-2 border-black"></div>

      <h1 class="text-3xl font-bold text-center mb-6 underline decoration-vintage-gold">Family Root Finder</h1>
      
      <p class="mb-4 text-center italic text-sm text-gray-600">"Connect with your past..."</p>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block mb-1 font-bold">Username</label>
          <input v-model="username" type="text" placeholder="Enter username" 
                 class="w-full border-2 border-vintage-ink dark:border-gray-600 p-2 rounded bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-vintage-gold transition-colors duration-300" />
        </div>
        
        <div>
          <label class="block mb-1 font-bold">Password</label>
          <input v-model="password" type="password" placeholder="Enter password" 
                 class="w-full border-2 border-vintage-ink dark:border-gray-600 p-2 rounded bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-vintage-gold transition-colors duration-300" />
        </div>

        <p v-if="error" class="text-red-600 text-sm font-bold text-center">{{ error }}</p>

        <button type="submit" 
                class="w-full bg-vintage-ink dark:bg-gray-700 text-vintage-paper dark:text-white py-2 font-bold uppercase tracking-widest hover:bg-vintage-gold dark:hover:bg-gray-600 transition-colors shadow-md">
          Open Book
        </button>
      </form>

      <div class="mt-6 text-center text-sm border-t border-gray-300 dark:border-gray-600 pt-4">
        <p class="text-gray-600 dark:text-gray-400 mb-2">New to the family?</p>
        <router-link to="/signup" class="block w-full bg-white dark:bg-gray-700 border-2 border-vintage-ink dark:border-gray-500 text-vintage-ink dark:text-white py-2 font-bold uppercase hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-center decoration-0">
          Create New Account
        </router-link>
      </div>

    </div>
  </div>
</template>