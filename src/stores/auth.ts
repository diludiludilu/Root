import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { UserLoginResponse, LocalDonorAccount } from '../types/api';

export const useAuthStore = defineStore('auth', () => {

    const currentUser = ref<UserLoginResponse | LocalDonorAccount | null>(
        JSON.parse(localStorage.getItem('session_user') || 'null')
    );

    const getLocalAccounts = (): LocalDonorAccount[] => {
        return JSON.parse(localStorage.getItem('local_accounts') || '[]');
    };

    const register = (accountData: LocalDonorAccount) => {
        const accounts = getLocalAccounts();
        if (accounts.some(a => a.username === accountData.username)) {
            return { success: false, message: 'Username already exists' };
        }
        accounts.push(accountData);
        localStorage.setItem('local_accounts', JSON.stringify(accounts));
        return { success: true, message: 'Registered successfully' };
    };

    const login = async (username: string, pass: string) => {
        try {
            // First check local accounts
            const localAccounts = getLocalAccounts();
            const localMatch = localAccounts.find(a => a.username === username && a.password === pass);

            if (localMatch) {
                // Ensure we don't save password in session state
                const { password: _pw, ...safeUser } = localMatch;
                const sessionUser: UserLoginResponse = {
                    ...safeUser,
                    token: `local-token-${safeUser.id}`,
                    refreshToken: '',
                };

                currentUser.value = sessionUser;
                localStorage.setItem('session_user', JSON.stringify(sessionUser));
                localStorage.setItem('token', sessionUser.token);
                return true;
            }

            // Fallback to DummyJSON
            const res = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    password: pass,
                    expiresInMins: 60, 
                })
            });
            
            if (!res.ok) return false;
            
            const data: UserLoginResponse = await res.json();
            
            currentUser.value = data;
            localStorage.setItem('session_user', JSON.stringify(data));
            localStorage.setItem('token', data.token); 
            
            return true;
        } catch (err) {
            console.error('Login error:', err);
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