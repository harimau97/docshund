import { create } from "zustand";

const viewModalStore = create((set) => ({
  openId: null,
  setOpenId: (id) => set({ openId: id }),
  closeModal: () => set({ openId: null }),
}));

export default viewModalStore;
