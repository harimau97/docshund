import { create } from "zustand";

const editorStore = create((set) => ({
  docsPart: "",
  bestTrans: "",
  porder: 0,
  docsId: 0,
  originId: 0,
  currentUserText: "",
  tempSave: "",
  submitData: "",
  isEditorVisible: false,

  toggleEditor: () => {
    set((state) => ({
      isEditorVisible: !state.isEditorVisible,
    }));
  },
  clearDocsPart: () => {
    set({ docsPart: "" });
  },

  clearBestTrans: () => {
    set({ bestTrans: "" });
  },

  clearPorder: () => {
    set({ porder: 0 });
  },

  clearDocsId: () => {
    set({ docsId: 0 });
  },

  clearOriginId: () => {
    set({ originId: 0 });
  },
  setCurrentUserText: (text) => {
    set({ currentUserText: text });
  },
  clearCurrentUserText: () => {
    set({ currentUserText: "" });
  },

  clearTempSave: () => {
    set({ tempSave: "" });
  },

  clearSubmitData: () => {
    set({ submitData: "" });
  },
  clearEditor: () => {
    set({
      docsPart: "",
      bestTrans: "",
      porder: 0,
      tempSave: "",
      submitData: "",
    });
  },
  clearAll: () => {
    set({
      docsPart: "",
      bestTrans: "",
      porder: 0,
      docsId: 0,
      originId: 0,
      currentUserText: "",
      tempSave: "",
      submitData: "",
    });
  },
}));

export default editorStore;
