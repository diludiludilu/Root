import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { User } from '../types';

export const useAuthStore = defineStore('auth', () => {

    // 1. Get the "Database" of users from memory
    const storedUsers = localStorage.getItem('user_db');
    const users = ref<User[]>(storedUsers ? JSON.parse(storedUsers) : []);

    // 2. The currently logged-in user
    const currentUser = ref<User | null>(JSON.parse(localStorage.getItem('session_user') || 'null'));

    // --- ACTION: SIGN UP ---
    const register = (username: string, pass: string) => {
        if (users.value.find(u => u.username === username)) {
            alert("⚠️ Username already exists!");
            return false;
        }

        const newUser = { username, pass } as any;
        users.value.push(newUser);

        localStorage.setItem('user_db', JSON.stringify(users.value));
        alert("✅ Account Created! Please Login.");
        return true;
    };

    // --- ACTION: LOGIN ---
    const login = async (username: string, pass: string) => {
        try {
            const res = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    password: pass,
                    expiresInMins: 60, // get a fresh 1-hour token
                })
            });
            
            if (!res.ok) return false;
            
            const data = await res.json();
            
            currentUser.value = data;
            localStorage.setItem('session_user', JSON.stringify(data));
            localStorage.setItem('token', data.token); // the real JWT
            
            return true;
        } catch (err) {
            console.error(err);
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