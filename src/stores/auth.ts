import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {

    // 1. Get the "Database" of users from memory
    const storedUsers = localStorage.getItem('user_db');
    const users = ref<any[]>(storedUsers ? JSON.parse(storedUsers) : []);

    // 2. The currently logged-in user
    const currentUser = ref<any>(JSON.parse(localStorage.getItem('session_user') || 'null'));

    // --- ACTION: SIGN UP ---
    const register = (username: string, pass: string) => {
        if (users.value.find(u => u.username === username)) {
            alert("⚠️ Username already exists!");
            return false;
        }

        const newUser = { username, pass };
        users.value.push(newUser);

        localStorage.setItem('user_db', JSON.stringify(users.value));
        alert("✅ Account Created! Please Login.");
        return true;
    };

    // --- ACTION: LOGIN ---
    const login = (username: string, pass: string) => {
        const foundUser = users.value.find(u => u.username === username && u.pass === pass);

        if (foundUser) {
            currentUser.value = foundUser;
            localStorage.setItem('session_user', JSON.stringify(foundUser));
            localStorage.setItem('token', 'fake-valid-token');
            return true;
        } else {
            return false;
        }
    };

    const logout = () => {
        currentUser.value = null;
        localStorage.removeItem('session_user');
        localStorage.removeItem('token');
    };

    return { currentUser, register, login, logout };
});