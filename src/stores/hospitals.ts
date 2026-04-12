import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Hospital } from '../types/api';

export const useHospitalStore = defineStore('hospitals', () => {
    
    // Simulate an API Backend of Hospitals
    const hospitals = ref<Hospital[]>([
        {
            id: 1,
            name: "Phoenix General Hospital",
            address: { address: "100 Medical Plaza", city: "Phoenix", state: "Mississippi", postalCode: "29112" },
            urgencyLevel: 'High',
            bloodTypesNeeded: ['O-', 'A-', 'B-'],
            image: "https://images.unsplash.com/photo-1587351021759-3e566d6abe95?w=200&h=200&fit=crop",
            contact: "601-555-0101"
        },
        {
            id: 2,
            name: "San Francisco Memorial",
            address: { address: "400 Health Way", city: "San Francisco", state: "Wisconsin", postalCode: "37657" },
            urgencyLevel: 'Critical',
            bloodTypesNeeded: ['AB-', 'O-', 'A+'],
            image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=200&h=200&fit=crop",
            contact: "415-555-0199"
        },
        {
            id: 3,
            name: "Mercy Care Center",
            address: { address: "89 Hope Blvd", city: "Austin", state: "Texas", postalCode: "73301" },
            urgencyLevel: 'Normal',
            bloodTypesNeeded: ['O+', 'B+'],
            image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=200&h=200&fit=crop",
            contact: "512-555-0122"
        },
        {
            id: 4,
            name: "St. John's City Hospital",
            address: { address: "555 Main Street", city: "New York", state: "New York", postalCode: "10001" },
            urgencyLevel: 'Critical',
            bloodTypesNeeded: ['A+', 'O-'],
            image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=200&h=200&fit=crop",
            contact: "212-555-0144"
        }
    ]);

    // Track "Pledges" User has made to Hospitals
    const pledgedHospitals = ref<Hospital[]>(
        JSON.parse(localStorage.getItem('pledged_hospitals') || '[]')
    );

    const pledgeBlood = (hospital: Hospital) => {
        if (!pledgedHospitals.value.find(h => h.id === hospital.id)) {
            pledgedHospitals.value.push(hospital);
            savePledges();
        }
    };

    const cancelPledge = (hospitalId: number) => {
        pledgedHospitals.value = pledgedHospitals.value.filter(h => h.id !== hospitalId);
        savePledges();
    };

    const savePledges = () => {
        localStorage.setItem('pledged_hospitals', JSON.stringify(pledgedHospitals.value));
    };

    const isHospitalPledged = (id: number) => {
        return pledgedHospitals.value.some(h => h.id === id);
    }

    return { 
        hospitals, pledgedHospitals, 
        pledgeBlood, cancelPledge, isHospitalPledged 
    };
});
