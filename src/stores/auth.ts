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

        const newUser = { username, pass, id: Date.now() } as any;
        users.value.push(newUser);

        localStorage.setItem('user_db', JSON.stringify(users.value));
        alert("✅ Account Created! Please Login.");
        return true;
    };

    // --- ACTION: LOGIN ---
    const login = async (username: string, pass: string) => {
            // 1. First check if it's a locally created account via the Signup page
            const localUser = users.value.find(u => u.username === username && u.pass === pass);
            if (localUser) {
                // Synthesize dummy structural data for the new account so the app doesn't crash on undefined properties
                if (!localUser.id) localUser.id = 10000 + users.value.indexOf(localUser);
                
                const syntheticData = {
                    ...localUser,
                    id: localUser.id,
                    firstName: localUser.username, // placeholder name
                    lastName: "",
                    image: '',
                    token: `local-token-${localUser.id}`
                } as any;
                
                currentUser.value = syntheticData;
                localStorage.setItem('session_user', JSON.stringify(syntheticData));
                localStorage.setItem('token', syntheticData.token);
                return true;
            }

            // 2. If no local account is recognized, execute the university grading rubric requirement: 
            // Query the remote DummyJSON API
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

    const deleteAccount = () => {
        if (!currentUser.value) return false;
        
        // Target specifically local accounts to scrub them from the credential directory
        if (currentUser.value.id >= 10000) {
            users.value = users.value.filter(u => u.id !== currentUser.value!.id);
            localStorage.setItem('user_db', JSON.stringify(users.value));
        }

        // Scrub session
        logout();
        return true;
    };

    return { users, currentUser, register, login, logout, deleteAccount };
});