import { create } from "zustand";

const archiveStore = create((set) => ({
  transList: [],
  orderByLike: true,
  orderByUpdatedAt: false,
  orderBy: "like",
  toggledStyle: "text-[#BC5B39] font-bold",
  defaultStyle: "text-black cursor-pointer",
  setTransList: (contents) => {
    set({ transList: contents });
  },
  clearTransList: () => {
    set({ transList: [] });
  },
}));

export default archiveStore;
