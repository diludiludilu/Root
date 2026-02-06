/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'vintage-paper': '#f4e4bc',
                'vintage-ink': '#2c211b',
                'vintage-gold': '#c5a059',
                'sepia-dark': '#4b3b32',
            }
        },
    },
    plugins: [],
}
