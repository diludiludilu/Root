<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Variables to hold user input
const username = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

// This function runs when you click "Login"
const handleLogin = async () => {
  try {
    // 1. Send data to DummyJSON
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      })
    });

    // 2. Check if login worked
    if (!response.ok) throw new Error('Login failed! Check username.');
    
    const data = await response.json();
    
    // 3. Save the token (like a ticket) to remember the user
    localStorage.setItem('token', data.accessToken);
    localStorage.setItem('user', JSON.stringify(data));
    
    // 4. Go to the Home page (we will make this later)
    router.push('/'); 
    
  } catch (err) {
    error.value = 'Invalid credentials! Try username: emilys';
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
          <input v-model="username" type="text" placeholder="e.g. emilys" 
                 class="w-full border-2 border-vintage-ink p-2 rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-vintage-gold" />
        </div>
        
        <div>
          <label class="block mb-1 font-bold">Password</label>
          <input v-model="password" type="password" placeholder="e.g. emilyspass" 
                 class="w-full border-2 border-vintage-ink p-2 rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-vintage-gold" />
        </div>

        <p v-if="error" class="text-red-600 text-sm font-bold text-center">{{ error }}</p>

        <button type="submit" 
                class="w-full bg-vintage-ink text-vintage-paper py-2 font-bold uppercase tracking-widest hover:bg-vintage-gold transition-colors">
          Open Book
        </button>
      </form>

      <div class="mt-4 text-xs text-center text-gray-500">
        (Hint: Use <b>emilys</b> / <b>emilyspass</b>)
      </div>
    </div>
  </div>
</template>