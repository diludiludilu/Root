import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Donor, ApiResponse, LocalDonorAccount } from '../types/api';

export const useDonorStore = defineStore('donors', () => {
    const donors = ref<Donor[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    // Cart Simulation: Requested Blood
    const requestedDonors = ref<Donor[]>(
        JSON.parse(localStorage.getItem('requested_donors') || '[]')
    );

    const fetchDonors = async () => {
        loading.value = true;
        error.value = null;
        try {
            // Using limit=0 to get all 200+ users for good filtering
            const response = await fetch('https://dummyjson.com/users?limit=0');
            if (!response.ok) throw new Error('Failed to fetch donors');
            
            const data: ApiResponse<Donor> = await response.json();
            
            // Merge with local accounts
            const localAccounts: LocalDonorAccount[] = JSON.parse(localStorage.getItem('local_accounts') || '[]');
            const safeLocalDonors: Donor[] = localAccounts.map(a => {
                const { password, username, ...safeDonor } = a;
                return safeDonor;
            });

            donors.value = [...safeLocalDonors, ...data.users];
        } catch (err: any) {
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    };

    const requestBlood = (donor: Donor) => {
        if (!requestedDonors.value.find(d => d.id === donor.id)) {
            requestedDonors.value.push(donor);
            saveRequests();
        }
    };

    const cancelRequest = (donorId: number) => {
        requestedDonors.value = requestedDonors.value.filter(d => d.id !== donorId);
        saveRequests();
    };

    const saveRequests = () => {
        localStorage.setItem('requested_donors', JSON.stringify(requestedDonors.value));
    };

    const getDonorById = (id: number) => {
        return donors.value.find(d => d.id === id);
    };
    
    const isDonorRequested = (id: number) => {
        return requestedDonors.value.some(d => d.id === id);
    }

    return { 
        donors, loading, error, requestedDonors, 
        fetchDonors, requestBlood, cancelRequest, getDonorById, isDonorRequested
    };
});
