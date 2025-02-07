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
  },
  toggleReport: () => {
    set((state) => ({
      isReportVisible: !state.isReportVisible,
    }));
  },
}));

export default reportStore;
