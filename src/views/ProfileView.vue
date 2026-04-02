<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { useOverridesStore } from '../stores/overrides';
import NavBar from '../components/NavBar.vue';
import type { User } from '../types';

const authStore = useAuthStore();
const overridesStore = useOverridesStore();
const router = useRouter();

const user = ref<User | null>(null);
const loading = ref(true);
const saving = ref(false);
const editMode = ref(false);
const imageError = ref(false);

const ALL_BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const form = ref({
  companyTitle: '',
  city: '',
  state: '',
  bloodGroup: '',
  university: '',
  email: '',
  image: ''
});

onMounted(async () => {
  if (!authStore.currentUser) {
    router.push('/');
    return;
  }
  
  const id = authStore.currentUser.id;
  try {
    // 1. Start with whatever data the session has locally
    let baseData = { ...authStore.currentUser };
    
    // 2. We only fetch DummyJSON if it's a realistic genuine ID (synthetic local IDs are > 10,000)
    if (id < 10000) {
      const res = await fetch(`https://dummyjson.com/users/${id}`);
      if (res.ok) {
        baseData = await res.json();
      }
    }

    // 3. Guarantee that deep nested properties exist before Vue tries to render them!
    if (!baseData.company) baseData.company = { title: '' };
    if (!baseData.address) baseData.address = { city: '', state: '' } as any;
    if (!baseData.bloodGroup) baseData.bloodGroup = 'Unknown';
    if (!baseData.university) baseData.university = 'None';

    // 4. Apply any previously saved local overrides so editing builds upon them
    user.value = overridesStore.applyOverride(baseData as User);
    
    // Pre-fill form
    if (user.value) {
      form.value = {
        companyTitle: user.value.company?.title || '',
        city: user.value.address?.city || '',
        state: user.value.address?.state || '',
        bloodGroup: user.value.bloodGroup || '',
        university: user.value.university || '',
        email: user.value.email || '',
        image: user.value.image || ''
      };
    }
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
});

const saveProfile = () => {
  if (!user.value) return;
  saving.value = true;
  
  const patchData = {
    email: form.value.email,
    bloodGroup: form.value.bloodGroup,
    university: form.value.university,
    company: { title: form.value.companyTitle },
    address: { city: form.value.city, state: form.value.state },
    image: form.value.image
  };

  imageError.value = false;

  overridesStore.saveOverride(user.value.id, patchData);
  
  // Re-apply to reactive view
  user.value = overridesStore.applyOverride(user.value);
  
  editMode.value = false;
  saving.value = false;
};

const handleDelete = () => {
  if (confirm("Are you absolutely sure you want to permanently destroy your account? This action cannot be reversed.")) {
    if (authStore.deleteAccount()) {
      router.push('/');
    }
  }
};

const displayImage = computed(() => {
  return (editMode.value && form.value.image) ? form.value.image : user.value?.image;
});
</script>

<template>
  <div class="min-h-screen bg-vintage-paper dark:bg-[#121212] flex flex-col transition-colors duration-300 pb-20 font-serif">
    <NavBar />

    <main class="flex-grow p-4 md:p-8 flex items-center justify-center">
      <div v-if="loading" class="text-xl font-bold dark:text-white">Loading your profile...</div>
      
      <div v-else-if="user" class="bg-white dark:bg-gray-800 w-full max-w-3xl rounded-lg shadow-2xl border-4 border-vintage-ink dark:border-gray-600 relative p-6 md:p-10 transition-colors duration-300">
        
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 class="text-3xl md:text-4xl font-bold tracking-wider dark:text-white border-b-2 border-vintage-gold pb-2 inline-block">My Profile Room</h2>
          <div class="flex items-center gap-3 w-full md:w-auto">
             <button @click="handleDelete" class="flex-1 md:flex-none text-red-600 dark:text-red-400 font-bold uppercase hover:bg-red-50 dark:hover:bg-red-900/30 px-3 py-2 rounded transition-colors text-sm shadow-sm border border-red-200 dark:border-red-800">
               ⚠️ Delete
             </button>
             <button @click="editMode = !editMode" class="flex-1 md:flex-none bg-vintage-gold text-vintage-ink px-4 py-2 font-bold uppercase rounded hover:bg-yellow-600 transition-colors shadow">
               {{ editMode ? 'Cancel Edit' : '✏️ Edit Record' }}
             </button>
          </div>
        </div>

        <div class="flex flex-col md:flex-row gap-8 items-start">
          <div class="flex flex-col items-center">
            <div class="flex-shrink-0">
              <img v-if="displayImage && displayImage.startsWith('data:image') && !imageError" :src="displayImage" @error="imageError = true" class="w-40 h-40 rounded-full border-4 border-vintage-ink dark:border-gray-600 bg-gray-200 shadow-md object-cover">
              <div v-else class="w-40 h-40 rounded-full border-4 border-vintage-ink dark:border-gray-600 bg-gray-200 shadow-md flex items-center justify-center overflow-hidden opacity-80">
                <svg class="w-32 h-32 text-vintage-ink dark:text-gray-500 mt-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            </div>
            <h3 class="text-2xl font-bold tracking-wider dark:text-white mt-4 text-center">{{ user.firstName }} {{ user.lastName }}</h3>
          </div>
          
          <div class="flex-grow w-full">
            
            <!-- READ ONLY MODE -->
            <div v-if="!editMode" class="space-y-4 text-left bg-gray-50 dark:bg-gray-700 p-6 rounded border border-vintage-ink dark:border-gray-600 shadow-inner">
               <p class="font-bold text-vintage-gold dark:text-yellow-500 uppercase tracking-wider text-xl mb-4">{{ user.company.title }}</p>
               
               <div class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 items-start text-vintage-ink dark:text-gray-100 text-lg">
                  <span class="font-bold whitespace-nowrap">📍 Location</span>
                  <span>{{ user.address.city }}, {{ user.address.state }}</span>

                  <span class="font-bold whitespace-nowrap">🩸 Blood Group</span>
                  <span>{{ user.bloodGroup }}</span>

                  <span class="font-bold whitespace-nowrap">🎓 Education</span>
                  <span>{{user.university }}</span>

                  <span class="font-bold whitespace-nowrap">📧 Email</span>
                  <span class="break-all">{{ user.email }}</span>
               </div>
            </div>

            <!-- EDIT MODE -->
            <form v-else @submit.prevent="saveProfile" class="space-y-4 text-left bg-gray-50 dark:bg-gray-700 p-6 rounded border-2 border-vintage-gold dark:border-yellow-600 shadow-inner">
              
              <div>
                <label class="block font-bold dark:text-white mb-1 uppercase text-sm">Professional Title</label>
                <input v-model="form.companyTitle" type="text" class="w-full p-2 border border-gray-400 rounded dark:bg-gray-800 dark:text-white" required>
              </div>
              


              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block font-bold dark:text-white mb-1 uppercase text-sm">City</label>
                  <input v-model="form.city" type="text" class="w-full p-2 border border-gray-400 rounded dark:bg-gray-800 dark:text-white" required>
                </div>
                <div>
                  <label class="block font-bold dark:text-white mb-1 uppercase text-sm">State</label>
                  <input v-model="form.state" type="text" class="w-full p-2 border border-gray-400 rounded dark:bg-gray-800 dark:text-white" required>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block font-bold dark:text-white mb-1 uppercase text-sm">Blood Group</label>
                  <select v-model="form.bloodGroup" class="w-full p-2 border border-gray-400 rounded dark:bg-gray-800 dark:text-white cursor-pointer" required>
                    <option value="" disabled>Select Type</option>
                    <option value="Unknown">Unknown</option>
                    <option v-for="bg in ALL_BLOOD_GROUPS" :key="bg" :value="bg">{{ bg }}</option>
                  </select>
                </div>
                <div>
                  <label class="block font-bold dark:text-white mb-1 uppercase text-sm">Email Address</label>
                  <input v-model="form.email" type="email" class="w-full p-2 border border-gray-400 rounded dark:bg-gray-800 dark:text-white" required>
                </div>
              </div>

              <div>
                <label class="block font-bold dark:text-white mb-1 uppercase text-sm">University / Education</label>
                <input v-model="form.university" type="text" class="w-full p-2 border border-gray-400 rounded dark:bg-gray-800 dark:text-white" required>
              </div>

              <button type="submit" class="w-full mt-4 bg-green-800 dark:bg-green-700 text-white py-3 font-bold uppercase tracking-wider hover:bg-green-700 dark:hover:bg-green-600 transition-colors rounded shadow flex justify-center items-center gap-2">
                <span>{{ saving ? 'Saving...' : '💾 Save Override Globally' }}</span>
              </button>
            </form>

          </div>
        </div>
      </div>
    </main>
  </div>
</template>
