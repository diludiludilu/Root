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
  // Use our store to check credentials
  const success = auth.login(username.value, password.value);
  
  if (success) {
    router.push('/'); // Go to Home
  } else {
    error.value = 'Unknown traveler. Check your spelling.';
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-vintage-paper text-vintage-ink font-serif">
    
    <div class="bg-white p-8 rounded shadow-2xl border-2 border-vintage-gold w-96 relative">
      <div class="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-800 border-2 border-black"></div>

      <h1 class="text-3xl font-bold text-center mb-6 underline decoration-vintage-gold">Family Root</h1>
      
      <p class="mb-4 text-center italic text-sm text-gray-600">"Connect with your past..."</p>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block mb-1 font-bold">Username</label>
          <input v-model="username" type="text" placeholder="Enter username" 
                 class="w-full border-2 border-vintage-ink p-2 rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-vintage-gold" />
        </div>
        
        <div>
          <label class="block mb-1 font-bold">Password</label>
          <input v-model="password" type="password" placeholder="Enter password" 
                 class="w-full border-2 border-vintage-ink p-2 rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-vintage-gold" />
        </div>

        <p v-if="error" class="text-red-600 text-sm font-bold text-center">{{ error }}</p>

        <button type="submit" 
                class="w-full bg-vintage-ink text-vintage-paper py-2 font-bold uppercase tracking-widest hover:bg-vintage-gold transition-colors shadow-md">
          Open Book
        </button>
      </form>

      <div class="mt-6 text-center text-sm border-t border-gray-300 pt-4">
        <p class="text-gray-600 mb-2">New to the family?</p>
        <router-link to="/signup" class="block w-full bg-white border-2 border-vintage-ink text-vintage-ink py-2 font-bold uppercase hover:bg-gray-100 transition-colors text-center decoration-0">
          Create New Account
        </router-link>
      </div>

    </div>
  </div>
</template>