import { create } from "zustand";

const showButton = create((set) => ({
  isButtonShown: false,
  toggleButton: () =>
    set((state) => ({
      isButtonShown: !state.isButtonShown,
    })),
}));

export default showButton;
