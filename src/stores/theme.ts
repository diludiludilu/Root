import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
    // Check local storage or system preference
    const isDark = ref(
        localStorage.getItem('theme') === 'dark' || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    )

    const toggleTheme = () => {
        isDark.value = !isDark.value
    }

    // Apply the class and save to localStorage on change
    watch(isDark, (val) => {
        if (val) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }, { immediate: true })

    return {
        isDark,
        toggleTheme
    }
})
