import { create } from "zustand";

// communityArticleStore 생성
// store를 생성할 때 create 함수를 사용하고, 파라미터로 함수를 전달
const communityArticleStore = create((set) => ({
  // store의 초기값 설정
  articles: [],
  totalPages: 0,
  currentPage: 1,
  isLoading: false,
  error: null,

  // store의 메소드 설정
  setArticles: (articles) => set({ articles }),
  setTotalPage: (totalPages) => set({ totalPages }),
  setCurrentPage: (currentPage) => set({ currentPage }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));

export default communityArticleStore;
