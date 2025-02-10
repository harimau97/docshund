import { create } from "zustand";

const reportStore = create((set) => ({
  isReportOpen: false,
  isReportVisible: false,
  originContent: "",
  reportedUser: "",
  chatId: "",
  articleId: "",
  transId: "",
  commentId: "",
  openReport: () => {
    set({ isReportOpen: true });
  },
  closeReport: () => {
    set({ isReportOpen: false });
    clearReportContent();
  },
  toggleReport: () => {
    set((state) => ({
      isReportVisible: !state.isReportVisible,
    }));
  },
  clearReportContent: () => {
    set({
      originContent: "",
      reportedUser: "",
      chatId: "",
      articleId: "",
      transId: "",
      commentId: "",
    });
  },
}));

export default reportStore;
