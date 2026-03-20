<script setup lang="ts">
import { useClanStore } from '../stores/clan';

// We do NOT need to import defineProps or defineEmits manually in <script setup>

const props = defineProps<{
  isOpen: boolean;
  user: any;
}>();

const emit = defineEmits(['close']);
const clanStore = useClanStore();

const addToClan = (user: any) => {
  clanStore.addMember(user);
};
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 transition-colors duration-300" @click.self="emit('close')">
    <div class="bg-vintage-paper dark:bg-gray-800 w-full max-w-2xl rounded-lg shadow-2xl border-4 border-vintage-ink dark:border-gray-600 relative overflow-hidden p-6 transition-colors duration-300">
      
      <div class="flex justify-between items-center mb-6 border-b-2 border-vintage-ink dark:border-gray-600 pb-2">
        <h2 class="text-2xl md:text-3xl font-bold tracking-wider dark:text-white">{{ user.firstName }} {{ user.lastName }}</h2>
        <button @click="emit('close')" class="text-3xl font-bold hover:text-vintage-gold dark:hover:text-gray-400 dark:text-white">&times;</button>
      </div>

      <div class="flex flex-col md:flex-row gap-6">
        <img :src="user.image" class="w-32 h-32 rounded-full border-4 border-vintage-ink dark:border-gray-600 bg-gray-200 mx-auto md:mx-0">
        <div class="flex-grow text-center md:text-left">
          <p class="font-bold text-vintage-gold dark:text-yellow-500 uppercase tracking-wider">{{ user.company.title }}</p>
          
          <div class="mt-4 space-y-2 text-sm text-left bg-white dark:bg-gray-700 p-3 rounded border border-vintage-ink dark:border-gray-600 bg-opacity-50 dark:bg-opacity-50">
             <div class="mt-4 bg-white dark:bg-gray-700 p-4 rounded border border-vintage-ink dark:border-gray-600 bg-opacity-50 dark:bg-opacity-50 text-sm text-left text-vintage-ink dark:text-gray-100">
              <div class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 items-start">

                <span class="font-bold whitespace-nowrap">📍 Location</span>
                <span>{{ user.address.city }}, {{ user.address.state }}</span>

                <span class="font-bold whitespace-nowrap">🩸 Blood Group</span>
                <span>{{ user.bloodGroup }}</span>

                <span class="font-bold whitespace-nowrap">🎓 Education</span>
                <span>{{user.university }}</span>

                <span class="font-bold whitespace-nowrap">📧 Email</span>
                <span class="truncate" :title="user.email">{{ user.email }}</span>
                
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col md:flex-row gap-4 mt-8">
        <button @click="addToClan(user)" class="flex-1 bg-green-800 dark:bg-green-700 text-white py-3 font-bold uppercase hover:bg-green-700 dark:hover:bg-green-600 shadow-lg border-2 border-vintage-ink dark:border-transparent transition-transform transform active:scale-95">
          ➕ Add to My Family
        </button>
        <button @click="emit('close')" class="flex-1 bg-vintage-ink dark:bg-gray-600 text-vintage-paper dark:text-white py-3 font-bold uppercase hover:bg-vintage-gold dark:hover:bg-gray-500 border-2 border-vintage-paper dark:border-transparent transition-colors">
          Close File
        </button>
      </div>

    </div>
  </div>
</template>