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
const showPassword = ref(false);

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const handleSignup = async () => {
    error.value = '';
    loading.value = true;

    try {
        const newAccount: LocalDonorAccount = {
            id: Date.now(),
            ...form.value,
            image: `https://dummyjson.com/icon/${form.value.username}/128`
        };

        const result = auth.register(newAccount);

        if (result.success) {
            const loginSuccess = await auth.login(form.value.username, form.value.password);
            if (loginSuccess) {
                router.push('/');
            } else {
                error.value = 'Registered successfully but failed to auto-login.';
            }
        } else {
            error.value = result.message;
        }
    } catch (err: unknown) {
        error.value = err instanceof Error ? err.message : 'An error occurred';
    } finally {
        loading.value = false;
    }
};
</script>

<template>
  <div class="min-h-screen flex bg-slate-50 dark:bg-slate-950 transition-colors">

    <!-- LEFT PANEL — Branding -->
    <div class="hidden lg:flex flex-col justify-between w-2/5 bg-gradient-to-br from-slate-800 via-slate-900 to-red-950 p-12 relative overflow-hidden">
      <div class="absolute -top-20 -right-20 w-72 h-72 bg-red-700/20 rounded-full"></div>
      <div class="absolute bottom-10 -left-12 w-56 h-56 bg-red-800/20 rounded-full"></div>

      <div class="relative flex items-center gap-3">
        <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl">
          <svg class="h-7 w-7 text-red-700" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12,2c0,0-8,6.86-8,12.5C4,18.64,7.58,22,12,22s8-3.36,8-7.5C20,8.86,12,2,12,2z" />
          </svg>
        </div>
        <span class="text-white text-2xl font-extrabold tracking-widest uppercase">Blood Link</span>
      </div>

      <div class="relative">
        <h2 class="text-4xl font-extrabold text-white leading-tight mb-4">
          Join the<br/><span class="text-red-400">Community</span>
        </h2>
        <p class="text-slate-300 text-base leading-relaxed">
          Register as a donor and be discoverable by people in urgent need. Your information is securely stored and easy to manage.
        </p>
      </div>

      <div class="relative flex flex-col gap-4">
        <div class="flex items-center gap-3 text-slate-300 text-sm">
          <div class="w-8 h-8 rounded-full bg-red-600/20 border border-red-500/30 flex items-center justify-center shrink-0">
            <svg class="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
          </div>
          Instantly visible to those who need your blood type
        </div>
        <div class="flex items-center gap-3 text-slate-300 text-sm">
          <div class="w-8 h-8 rounded-full bg-red-600/20 border border-red-500/30 flex items-center justify-center shrink-0">
            <svg class="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
          </div>
          Pledge to hospitals in critical need
        </div>
        <div class="flex items-center gap-3 text-slate-300 text-sm">
          <div class="w-8 h-8 rounded-full bg-red-600/20 border border-red-500/30 flex items-center justify-center shrink-0">
            <svg class="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
          </div>
          Track your activity in one place
        </div>
      </div>
    </div>

    <!-- RIGHT PANEL — Form -->
    <div class="flex-1 flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
      <div class="w-full max-w-lg animate-fade-in-up py-8">

        <!-- Mobile logo -->
        <div class="flex lg:hidden items-center gap-3 mb-8 justify-center">
          <div class="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
            <svg class="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12,2c0,0-8,6.86-8,12.5C4,18.64,7.58,22,12,22s8-3.36,8-7.5C20,8.86,12,2,12,2z" />
            </svg>
          </div>
          <span class="text-slate-800 dark:text-white text-2xl font-extrabold">Blood Link</span>
        </div>

        <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">Create your account</h2>
        <p class="text-slate-500 dark:text-slate-400 mb-8">Fill in your details to join as a donor.</p>

        <form @submit.prevent="handleSignup" class="space-y-5">
          <div v-if="error" class="flex items-center gap-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-xl text-sm border border-red-200 dark:border-red-800">
            <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {{ error }}
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">First Name</label>
              <input id="signup-firstname" v-model="form.firstName" type="text" required placeholder="John" class="input-field" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Last Name</label>
              <input id="signup-lastname" v-model="form.lastName" type="text" required placeholder="Doe" class="input-field" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Username</label>
              <input id="signup-username" v-model="form.username" type="text" required placeholder="johndoe" class="input-field" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Password</label>
              <div class="relative">
                <input id="signup-password" v-model="form.password" :type="showPassword ? 'text' : 'password'" required minlength="6" placeholder="••••••••" class="input-field pr-12" />
                <button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                  <svg v-if="!showPassword" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                </button>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Blood Group</label>
              <select id="signup-bloodgroup" v-model="form.bloodGroup" required class="input-field">
                <option disabled value="">Select</option>
                <option v-for="bg in bloodGroups" :key="bg" :value="bg">{{ bg }}</option>
              </select>
            </div>
            <div class="col-span-2">
              <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Phone Number</label>
              <input id="signup-phone" v-model="form.phone" type="tel" required placeholder="+1 555-0100" class="input-field" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
            <input id="signup-email" v-model="form.email" type="email" placeholder="john@example.com" class="input-field" />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">City</label>
              <input id="signup-city" v-model="form.address.city" type="text" required placeholder="Phoenix" class="input-field" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">State</label>
              <input id="signup-state" v-model="form.address.state" type="text" required placeholder="Arizona" class="input-field" />
            </div>
          </div>

          <button
            id="signup-submit"
            type="submit"
            :disabled="loading"
            class="w-full bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-red-500/30 flex justify-center items-center gap-2"
          >
            <svg v-if="loading" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ loading ? 'Creating Account...' : 'Create Account & Sign In' }}
          </button>
        </form>

        <p class="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          Already have an account?
          <router-link to="/login" class="text-red-600 dark:text-red-400 font-semibold hover:underline ml-1">Sign in</router-link>
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
.input-field {
  @apply w-full rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 dark:text-white px-4 py-3 text-sm focus:ring-0 focus:border-red-500 outline-none transition-colors;
}
</style>
