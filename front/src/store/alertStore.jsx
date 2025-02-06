import { create } from "zustand";

const alertStore = create((set) => ({
  isAlertOpen: false,
  toggleAlert: (time) => {
    //알림창이 유지되는 시간을 설정 1초 = 1000ms
    set({ isAlertOpen: true });

    setTimeout(() => set({ isAlertOpen: false }), time);
  },
}));

export default alertStore;
