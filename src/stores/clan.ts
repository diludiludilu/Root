import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useClanStore = defineStore('clan', () => {
    // Safe parsing: if local storage is empty, use an empty list []
    const saved = localStorage.getItem('myClan');
    const savedClan = saved ? JSON.parse(saved) : [];

    const members = ref<any[]>(savedClan);

    const addMember = (person: any) => {
        if (!members.value.find(m => m.id === person.id)) {
            members.value.push(person);
            alert(`${person.firstName} Added!`);
        } else {
            alert("Already in clan!");
        }
    };

    const removeMember = (id: number) => {
        members.value = members.value.filter(m => m.id !== id);
    };

    watch(members, (newVal) => {
        localStorage.setItem('myClan', JSON.stringify(newVal));
    }, { deep: true });

    return { members, addMember, removeMember };
});