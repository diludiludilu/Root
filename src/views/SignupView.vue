<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import type { LocalDonorAccount } from '../types/api';

const router = useRouter();
const auth = useAuthStore();

const form = ref({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    bloodGroup: '',
    address: { address: '', city: '', state: '', postalCode: '' },
    phone: '',
    email: ''
});

const error = ref('');
const loading = ref(false);

const handleSignup = async () => {
    error.value = '';
    loading.value = true;

    try {
        const newAccount: LocalDonorAccount = {
            id: Date.now(),
            ...form.value,
            image: `https://dummyjson.com/icon/${form.value.username}/128` // fallback dummy image
        };

        const result = auth.register(newAccount);

        if (result.success) {
            // Log them in immediately after creating
            const loginSuccess = await auth.login(form.value.username, form.value.password);
            if (loginSuccess) {
                router.push('/');
            } else {
                error.value = "Registered successfully but failed to auto-login.";
            }
        } else {
            error.value = result.message;
        }
    } catch (err: any) {
        error.value = err.message || "An error occurred";
    } finally {
        loading.value = false;
    }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4 py-12 transition-colors">
    <div class="max-w-2xl w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
      
      <!-- Header -->
      <div class="bg-slate-800 dark:bg-slate-900 p-6 text-center text-white border-b border-slate-700">
        <h2 class="text-2xl font-bold">Register as a Donor</h2>
        <p class="text-slate-400 mt-1">Join the community and save lives.</p>
      </div>

      <!-- Form -->
      <div class="p-8">
        <form @submit.prevent="handleSignup" class="space-y-6">
          <div v-if="error" class="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-200">
            {{ error }}
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">First Name</label>
              <input v-model="form.firstName" type="text" required class="w-full rounded-lg border border-slate-300 bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-white px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-shadow" />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Last Name</label>
              <input v-model="form.lastName" type="text" required class="w-full rounded-lg border border-slate-300 bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-white px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-shadow" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Username</label>
              <input v-model="form.username" type="text" required class="w-full rounded-lg border border-slate-300 bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-white px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-shadow" />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
              <input v-model="form.password" type="password" required minlength="6" class="w-full rounded-lg border border-slate-300 bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-white px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-shadow" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="sm:col-span-1">
              <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Blood Group</label>
              <select v-model="form.bloodGroup" required class="w-full rounded-lg border border-slate-300 bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-white px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-shadow">
                <option disabled value="">Select</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div class="sm:col-span-2">
              <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
              <input v-model="form.phone" type="tel" required class="w-full rounded-lg border border-slate-300 bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-white px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-shadow" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <div>
              <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">City</label>
              <input v-model="form.address.city" type="text" required class="w-full rounded-lg border border-slate-300 bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-white px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-shadow" />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">State</label>
              <input v-model="form.address.state" type="text" required class="w-full rounded-lg border border-slate-300 bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-white px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-shadow" />
            </div>
          </div>

          <button 
            type="submit" 
            :disabled="loading"
            class="w-full mt-4 bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-4 rounded-lg transition-colors"
            :class="{ 'opacity-70 cursor-not-allowed': loading }"
          >
            {{ loading ? 'Creating Account...' : 'Create Account' }}
          </button>
        </form>
        
        <div class="mt-6 text-center text-sm">
           <router-link to="/login" class="text-red-600 hover:underline font-medium">Already have an account? Sign in</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
