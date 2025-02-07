import { create } from "zustand";

const alertStore = create((set) => ({
  isAlertOpen: true,
  toggleAlert: () => {
    set((state) => ({
      isAlertOpen: !state.isAlertOpen,
    }));
  },
}));

export default alertStore;
