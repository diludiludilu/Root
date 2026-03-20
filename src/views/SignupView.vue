<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const auth = useAuthStore();
const router = useRouter();

const username = ref('');
const password = ref('');
const confirmPassword = ref('');

const handleSignup = () => {
  // 1. Validation
  if (password.value !== confirmPassword.value) {
    alert("⚠️ Passwords do not match!");
    return;
  }
  if (username.value.length < 3) {
    alert("⚠️ Username is too short!");
    return;
  }
  
  // 2. Register via Store
  const success = auth.register(username.value, password.value);
  
  // 3. If successful, go to login
  if (success) {
    router.push('/login');
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-vintage-paper dark:bg-[#121212] text-vintage-ink dark:text-gray-100 font-serif transition-colors duration-300">
    
    <div class="bg-white dark:bg-gray-800 p-8 rounded shadow-2xl border-2 border-vintage-gold dark:border-gray-600 w-96 relative transition-colors duration-300">
      <div class="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-green-800 border-2 border-black"></div>

      <h1 class="text-3xl font-bold text-center mb-2 underline decoration-vintage-gold">Family Root Finder</h1>
      <p class="text-center text-sm text-gray-600 mb-6 italic">"Connect with your past..."</p>

      <form @submit.prevent="handleSignup" class="space-y-4">
        <div>
          <label class="block mb-1 font-bold">Your Name</label>
          <input v-model="username" type="text" placeholder="NewUser123" required
                 class="w-full border-2 border-vintage-ink dark:border-gray-600 p-2 rounded bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-600 outline-none transition-colors duration-300" />
        </div>
        
        <div>
          <label class="block mb-1 font-bold">Create New Password</label>
          <input v-model="password" type="password" placeholder="******" required
                 class="w-full border-2 border-vintage-ink dark:border-gray-600 p-2 rounded bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-600 outline-none transition-colors duration-300" />
        </div>

        <div>
          <label class="block mb-1 font-bold">Confirm Password</label>
          <input v-model="confirmPassword" type="password" placeholder="******" required
                 class="w-full border-2 border-vintage-ink dark:border-gray-600 p-2 rounded bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-600 outline-none transition-colors duration-300" />
        </div>

        <button type="submit" 
                class="w-full bg-vintage-ink dark:bg-gray-700 text-vintage-paper dark:text-white py-2 font-bold uppercase tracking-widest hover:bg-vintage-gold dark:hover:bg-gray-600 transition-colors shadow-md">
          Create Account
        </button>
      </form>

      <div class="mt-4 text-center text-sm">
        <p>Already have a book?</p>
        <router-link to="/login" class="font-bold underline text-vintage-ink dark:text-gray-300 hover:text-vintage-gold dark:hover:text-white">
          Open Existing Book (Login)
        </router-link>
      </div>
    </div>
  </div>
</template>