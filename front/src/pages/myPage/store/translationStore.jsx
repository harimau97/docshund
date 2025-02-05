import { create } from "zustand";

const TranslationStore = create((set) => ({
  // 초기값 설정
  isLoading: false,
  error: null,
  // 메소드 설정
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  // state 정의
  translations: [], // 좋아요한 번역 목록

  // set(메소드) 정의
  setTranslations: (translations) => set({ translations }),
}));

export default TranslationStore;
