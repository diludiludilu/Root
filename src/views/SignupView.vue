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
  <div class="min-h-screen flex items-center justify-center bg-vintage-paper text-vintage-ink font-serif">
    
    <div class="bg-white p-8 rounded shadow-2xl border-2 border-vintage-gold w-96 relative">
      <div class="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-green-800 border-2 border-black"></div>

      <h1 class="text-3xl font-bold text-center mb-2 underline decoration-vintage-gold">Join the Clan</h1>
      <p class="text-center text-sm text-gray-600 mb-6 italic">"Create your own legacy..."</p>

      <form @submit.prevent="handleSignup" class="space-y-4">
        <div>
          <label class="block mb-1 font-bold">Choose Username</label>
          <input v-model="username" type="text" placeholder="NewUser123" required
                 class="w-full border-2 border-vintage-ink p-2 rounded bg-gray-50 focus:ring-2 focus:ring-green-600 outline-none" />
        </div>
        
        <div>
          <label class="block mb-1 font-bold">Password</label>
          <input v-model="password" type="password" placeholder="******" required
                 class="w-full border-2 border-vintage-ink p-2 rounded bg-gray-50 focus:ring-2 focus:ring-green-600 outline-none" />
        </div>

        <div>
          <label class="block mb-1 font-bold">Confirm Password</label>
          <input v-model="confirmPassword" type="password" placeholder="******" required
                 class="w-full border-2 border-vintage-ink p-2 rounded bg-gray-50 focus:ring-2 focus:ring-green-600 outline-none" />
        </div>

        <button type="submit" 
                class="w-full bg-green-800 text-white py-2 font-bold uppercase tracking-widest hover:bg-green-700 transition-colors shadow-lg">
          Create Account
        </button>
      </form>

      <div class="mt-4 text-center text-sm">
        <p>Already have a book?</p>
        <router-link to="/login" class="font-bold underline text-vintage-ink hover:text-vintage-gold">
          Open Existing Book (Login)
        </router-link>
      </div>
    </div>
  </div>
</template>