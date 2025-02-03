import { create } from "zustand";

const archiveStore = create((set) => ({
  transList: [],
  setTransList: (contents) => {
    set({ transList: contents });
  },
  clearTransList: () => {
    set({ transList: [] });
  },
}));

export default archiveStore;
