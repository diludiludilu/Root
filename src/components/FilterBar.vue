<script setup lang="ts">

const bloodGroup = defineModel<string>('bloodGroup', { default: '' });
const location = defineModel<string>('location', { default: '' });

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const clearFilters = () => {
  bloodGroup.value = '';
  location.value = '';
};

const hasFilters = () => bloodGroup.value !== '' || location.value !== '';
</script>

<template>
  <div class="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-md mb-6 border border-slate-100 dark:border-slate-700">
    <div class="flex flex-col md:flex-row gap-4 items-end">

      <div class="w-full md:w-auto md:min-w-48">
        <label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Blood Group</label>
        <div class="relative">
          <select
            id="filter-blood-group"
            v-model="bloodGroup"
            class="w-full rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white pl-4 pr-8 py-2.5 text-sm font-medium focus:ring-0 focus:border-red-500 transition-colors outline-none appearance-none cursor-pointer"
          >
            <option value="">All Blood Groups</option>
            <option v-for="bg in bloodGroups" :key="bg" :value="bg">{{ bg }}</option>
          </select>
          <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
          </div>
        </div>
      </div>

      <div class="w-full flex-1">
        <label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Location</label>
        <div class="relative">
          <div class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          </div>
          <input
            id="filter-location"
            v-model="location"
            type="text"
            placeholder="Search by city or state..."
            class="w-full rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white pl-10 pr-4 py-2.5 text-sm focus:ring-0 focus:border-red-500 transition-colors outline-none"
          />
        </div>
      </div>

      <!-- Clear Filters Button -->
      <button
        v-if="hasFilters()"
        @click="clearFilters"
        class="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 bg-slate-100 dark:bg-slate-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl border-2 border-slate-200 dark:border-slate-600 hover:border-red-300 dark:hover:border-red-800 transition-all whitespace-nowrap"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        Clear Filters
      </button>

    </div>

    <!-- Active Filter Pills -->
    <div v-if="hasFilters()" class="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
      <span v-if="bloodGroup" class="inline-flex items-center gap-1.5 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs font-semibold px-3 py-1 rounded-full border border-red-200 dark:border-red-800">
        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12,2c0,0-8,6.86-8,12.5C4,18.64,7.58,22,12,22s8-3.36,8-7.5C20,8.86,12,2,12,2z" /></svg>
        Blood: {{ bloodGroup }}
        <button @click="bloodGroup = ''" class="hover:text-red-900 dark:hover:text-red-100 ml-0.5">×</button>
      </span>
      <span v-if="location" class="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
        Location: {{ location }}
        <button @click="location = ''" class="hover:text-blue-900 dark:hover:text-blue-100 ml-0.5">×</button>
      </span>
    </div>
  </div>
</template>
