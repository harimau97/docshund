import { create } from "zustand";

const editorStore = create((set) => ({
  docsPart: "",
  bestTrans: "",
  porder: 0,
  docsId: 0,
  originId: 0,
  tempSave: "",
  submitData: "",

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

  clearTempSave: () => {
    set({ tempSave: "" });
  },

  clearSubmitData: () => {
    set({ submitData: "" });
  },
  clearAll: () => {
    set({
      docsPart: "",
      bestTrans: "",
      porder: 0,
      docsId: 0,
      originId: 0,
      tempSave: "",
      submitData: "",
    });
  },
}));

export default editorStore;
