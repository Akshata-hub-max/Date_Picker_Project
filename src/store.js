// src/store.js
import create from 'zustand';

const useStore = create((set, get) => ({
    startDate: new Date(),
    endDate: new Date(),
    recurrence: {
        pattern: 'daily', // Default pattern
        selectedDays: [], // Array to hold selected days for weekly
        nthDay: null, // For nth occurrence
        interval: 1, // Default interval
    },
    setStartDate: (date) => set({ startDate: date }),
    setEndDate: (date) => {
        if (date >= get().startDate) {
            set({ endDate: date });
        } else {
            console.error("End date must be after start date");
        }
    },
    setRecurrence: (recurrence) => set({ recurrence }),
}));

export default useStore;
