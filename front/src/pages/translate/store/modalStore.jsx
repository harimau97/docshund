import { create } from "zustand";
import useEditorStore from "./editorStore";

const modalStore = create((set) => ({
  isEditorOpen: false,
  isArchiveOpen: false,
  isAlertOpen: false,
  openEditor: () => {
    set({ isEditorOpen: true });
  },
  closeEditor: () => {
    set({ isEditorOpen: false });
    useEditorStore.getState().clearAll();
  },
  openArchive: () => {
    set({ isArchiveOpen: true });
  },
  closeArchive: () => {
    set({ isArchiveOpen: false });
    useEditorStore.getState().clearAll();
  },
  toggleAlert: () => {
    set({ isAlertOpen: true });
    setTimeout(() => set({ isAlertOpen: false }), 1500);
  },
}));

export default modalStore;
