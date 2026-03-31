<script setup lang="ts">
import { useClanStore } from '../stores/clan';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import UserCard from '../components/UserCard.vue';
import NavBar from '../components/NavBar.vue';

const clanStore = useClanStore();
const router = useRouter();

onMounted(() => {
  clanStore.refreshMembers();
});
</script>

<template>
  <div class="min-h-screen bg-vintage-paper dark:bg-[#121212] flex flex-col transition-colors duration-300 pb-20 font-serif">
    
    <NavBar />

    <main class="flex-grow p-4 md:p-8 max-w-6xl mx-auto w-full mt-4">

      <div v-if="clanStore.members.length === 0" class="text-center opacity-50 mt-20">
        <p class="text-2xl font-bold dark:text-white">Your family book is empty.</p>
        <button @click="router.push('/home')" class="mt-4 bg-vintage-ink dark:bg-gray-700 text-vintage-paper dark:text-gray-100 px-6 py-2 rounded font-bold hover:bg-vintage-gold dark:hover:bg-gray-600 transition-colors">
          Find Your Roots
        </button>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UserCard v-for="person in clanStore.members" :key="person.id" :user="person">
          <template #top-right>
            <button @click="clanStore.removeMember(person.id)" class="absolute top-2 right-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-bold text-xl" title="Remove">
              &times;
            </button>
          </template>
        </UserCard>
      </div>

    </main>
  </div>
</template>