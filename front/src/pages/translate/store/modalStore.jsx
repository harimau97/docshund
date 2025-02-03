import { create } from "zustand";
import useEditorStore from "./editorStore";

const modalStore = create((set) => ({
  isEditorOpen: false,
  isArchiveOpen: false,
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
}));

export default modalStore;
