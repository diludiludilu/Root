<script setup lang="ts">


const bloodGroup = defineModel<string>('bloodGroup', { default: '' });
const location = defineModel<string>('location', { default: '' });

const bloodGroups = [
  'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
];
</script>

<template>
  <div class="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md mb-6 flex flex-col md:flex-row gap-4 items-center">
    
    <div class="w-full md:w-1/3">
      <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Blood Group</label>
      <select 
        v-model="bloodGroup"
        class="w-full rounded-md border border-slate-300 bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
      >
        <option value="">All Blood Groups</option>
        <option v-for="bg in bloodGroups" :key="bg" :value="bg">{{ bg }}</option>
      </select>
    </div>

    <div class="w-full md:w-2/3">
      <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Location (City / State)</label>
      <input 
        v-model="location"
        type="text" 
        placeholder="e.g. Phoenix, Mississippi"
        class="w-full rounded-md border border-slate-300 bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
      />
    </div>

  </div>
</template>
