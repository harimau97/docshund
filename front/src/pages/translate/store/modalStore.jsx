import { create } from "zustand";

const modalStore = create((set) => ({
  isEditorOpen: false,
  isArchiveOpen: false,
  openEditor: () => set({ isEditorOpen: true }),
  closeEditor: () => set({ isEditorOpen: false }),
  openArchive: () => set({ isArchiveOpen: true }),
  closeArchive: () => set({ isArchiveOpen: false }),
}));

export default modalStore;
