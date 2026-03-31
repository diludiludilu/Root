import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { User } from '../types';

export const useClanStore = defineStore('clan', () => {
    
    const getStoreKey = () => {
        const storedUser = localStorage.getItem('session_user');
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                return `myClan_${user.username}`;
            } catch (e) {}
        }
        return 'myClan_guest';
    };

    const members = ref<User[]>([]);

    const refreshMembers = () => {
        const key = getStoreKey();
        const saved = localStorage.getItem(key);
        members.value = saved ? JSON.parse(saved) : [];
    };

    const saveMembers = () => {
        const key = getStoreKey();
        localStorage.setItem(key, JSON.stringify(members.value));
    };

    // Initialize once
    refreshMembers();

    const addMember = (person: User) => {
        refreshMembers(); // ENSURE we have latest for this user
        if (!members.value.find(m => m.id === person.id)) {
            members.value.push(person);
            saveMembers();
            alert(`${person.firstName} Added!`);
        } else {
            alert("Already in clan!");
        }
    };

    const removeMember = (id: number) => {
        refreshMembers();
        members.value = members.value.filter(m => m.id !== id);
        saveMembers();
    };

    return { members, addMember, removeMember, refreshMembers };
});