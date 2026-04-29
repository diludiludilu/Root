<script setup lang="ts">
import { useRoute } from 'vue-router';
import NavBar from './components/NavBar.vue';

const route = useRoute();
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
    <NavBar v-if="route.name !== 'login' && route.name !== 'signup'" />
    <router-view></router-view>
  </div>
</template>