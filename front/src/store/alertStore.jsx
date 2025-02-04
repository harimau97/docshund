import { create } from "zustand";

const alertStore = create((set) => ({
  isAlertOpen: false,
  toggleAlert: () => {
    set({ isAlertOpen: true });
    setTimeout(() => set({ isAlertOpen: false }), 1500);
  },
}));

export default alertStore;
