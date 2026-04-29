import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Hospital } from '../types/api';

export const useHospitalStore = defineStore('hospitals', () => {

    const hospitals = ref<Hospital[]>([
        {
            id: 1,
            name: "Phoenix General Hospital",
            address: { address: "100 Medical Plaza", city: "Phoenix", state: "Arizona", postalCode: "85001" },
            urgencyLevel: 'High',
            bloodTypesNeeded: ['O-', 'A-', 'B-'],
            image: "https://images.unsplash.com/photo-1587351021759-3e566d6abe95?w=600&h=400&fit=crop",
            contact: "601-555-0101"
        },
        {
            id: 2,
            name: "San Francisco Memorial",
            address: { address: "400 Health Way", city: "San Francisco", state: "California", postalCode: "94102" },
            urgencyLevel: 'Critical',
            bloodTypesNeeded: ['AB-', 'O-', 'A+'],
            image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop",
            contact: "415-555-0199"
        },
        {
            id: 3,
            name: "Mercy Care Center",
            address: { address: "89 Hope Blvd", city: "Austin", state: "Texas", postalCode: "73301" },
            urgencyLevel: 'Normal',
            bloodTypesNeeded: ['O+', 'B+'],
            image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&h=400&fit=crop",
            contact: "512-555-0122"
        },
        {
            id: 4,
            name: "St. John's City Hospital",
            address: { address: "555 Main Street", city: "New York", state: "New York", postalCode: "10001" },
            urgencyLevel: 'Critical',
            bloodTypesNeeded: ['A+', 'O-'],
            image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&h=400&fit=crop",
            contact: "212-555-0144"
        },
        {
            id: 5,
            name: "Sunrise Medical Center",
            address: { address: "221 Sunrise Ave", city: "Miami", state: "Florida", postalCode: "33101" },
            urgencyLevel: 'High',
            bloodTypesNeeded: ['B-', 'AB+', 'O+'],
            image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&h=400&fit=crop",
            contact: "305-555-0200"
        },
        {
            id: 6,
            name: "Metro Health Institute",
            address: { address: "700 Metro Pkwy", city: "Chicago", state: "Illinois", postalCode: "60601" },
            urgencyLevel: 'Normal',
            bloodTypesNeeded: ['A+', 'B+', 'O+'],
            image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&h=400&fit=crop",
            contact: "312-555-0310"
        },
        {
            id: 7,
            name: "Pacific Coast Hospital",
            address: { address: "1 Ocean Drive", city: "Los Angeles", state: "California", postalCode: "90001" },
            urgencyLevel: 'Critical',
            bloodTypesNeeded: ['O-', 'AB-', 'B-'],
            image: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=600&h=400&fit=crop",
            contact: "213-555-0420"
        },
        {
            id: 8,
            name: "Green Valley Community Hospital",
            address: { address: "300 Valley Rd", city: "Seattle", state: "Washington", postalCode: "98101" },
            urgencyLevel: 'High',
            bloodTypesNeeded: ['A-', 'O-', 'AB+'],
            image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
            contact: "206-555-0512"
        }
    ]);

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
    };

    return {
        hospitals, pledgedHospitals,
        pledgeBlood, cancelPledge, isHospitalPledged
    };
});
