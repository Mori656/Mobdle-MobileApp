import { create } from 'zustand';

const useGameStore = create((set) => ({
    options: [],
    chosenMob: null,

    fetchOptions: async () => {
        try {
            const response = await fetch('https://api.jsonbin.io/v3/b/680388658561e97a5002fc51');
            const data = await response.json();
            const mobs = data.record.Mobs;

            const randomMob = mobs && mobs.length > 0
                ? mobs[Math.floor(Math.random() * mobs.length)]
                : null;
            set({ 
                options: mobs,
                chosenMob: randomMob,
            });
        } catch (error) {
            console.error('Failed to fetch options:', error);
        }
    },

    removeOption: (itemToRemove) => {
        set((state) => ({
            options: state.options.filter((item) => JSON.stringify(item) !== JSON.stringify(itemToRemove)),
        }));
    },

    triedOptions: [],

    modifyTriedOptions: (itemToAdd) => {
        set((state) => ({
            triedOptions: [itemToAdd, ...state.triedOptions],
        }));
    },

    clearTriedOptions: () => set({ triedOptions: [] }),
}));

export default useGameStore;