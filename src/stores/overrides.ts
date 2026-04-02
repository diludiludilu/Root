import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import type { User } from '../types';

export const useOverridesStore = defineStore('overrides', () => {
    // Record mapping user IDs to their custom edited fields
    const saved = localStorage.getItem('global_profile_overrides');
    const overrides = ref<Record<number, Partial<User>>>(saved ? JSON.parse(saved) : {});

    watch(overrides, (newVal) => {
        localStorage.setItem('global_profile_overrides', JSON.stringify(newVal));
    }, { deep: true });

    const saveOverride = (id: number, data: any) => {
        const existing = overrides.value[id] || {};
        
        // Pure functional merge ensuring Vue Reactive Proxies don't drop nested keys
        const updated = {
            ...existing,
            ...data,
            address: {
                ...(existing.address || {}),
                ...(data.address || {})
            },
            company: {
                ...(existing.company || {}),
                ...(data.company || {})
            }
        };
        
        overrides.value[id] = updated;
    };

    const applyOverride = (user: User): User => {
        if (!user) return user;
        
        // Force DummyJSON payloads to discard network icons
        const cleanUser = { ...user, image: '' };
        
        const o = overrides.value[user.id];
        if (!o) return cleanUser;
        
        // Merge intelligently
        return {
            ...cleanUser,
            ...o,
            address: { ...cleanUser.address, ...o.address },
            company: { ...cleanUser.company, ...o.company }
        };
    };

    const applyOverrides = (users: User[]): User[] => {
        return users.map(applyOverride);
    };

    const getLocalProfiles = (authUsers: any[]): User[] => {
        return authUsers.map((u, i) => {
            const stableId = u.id || (10000 + i);
            const base = {
                id: stableId,
                firstName: u.username,
                lastName: '',
                image: '',
                email: `${u.username}@example.com`,
                company: { title: 'New Member' },
                address: { city: '', state: '' },
                bloodGroup: 'Unknown',
                university: 'None',
                age: 26 // Maps them to the 'Adults' bracket automatically
            } as User;
            
            return applyOverride(base);
        });
    };

    return { overrides, saveOverride, applyOverride, applyOverrides, getLocalProfiles };
});
