import { create } from "zustand";
import memoService from "../services/memoService";

const useMemoStore = create((set) => ({
  memos: [],
  isLoading: false,
  error: null,

  // 메모 목록 가져오기
  fetchMemos: async (userId, page = 1, size = 10) => {
    set({ isLoading: true, error: null });
    try {
      const data = await memoService.fetchMemos(userId, page, size);
      if (data) {
        set({ memos: data, isLoading: false });
      }
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // 특정 메모 가져오기
  fetchMemo: async (userId, memoId) => {
    set({ isLoading: true, error: null });
    try {
      const data = await memoService.fetchMemo(userId, memoId);
      if (data) {
        set({ memos: [data], isLoading: false }); // Assuming you're just fetching a single memo
      }
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // 새 메모 추가
  addMemo: async (userId, memoData) => {
    set({ isLoading: true });
    try {
      const newMemo = await memoService.createMemo(userId, memoData);
      set((state) => ({ memos: [newMemo, ...state.memos], isLoading: false }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // 메모 수정
  updateMemo: async (userId, memoId, updatedMemo) => {
    set({ isLoading: true });
    try {
      const updated = await memoService.updateMemo(userId, memoId, updatedMemo);
      set((state) => ({
        memos: state.memos.map((memo) =>
          memo.memo_id === memoId ? updated : memo
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // 메모 삭제
  deleteMemo: async (userId, memoId) => {
    set({ isLoading: true });
    try {
      await memoService.deleteMemo(userId, memoId);
      set((state) => ({
        memos: state.memos.filter((memo) => memo.memo_id !== memoId),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));

export default useMemoStore;
