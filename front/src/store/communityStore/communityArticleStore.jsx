import { create } from "zustand";

// communityArticleStore 생성
// store를 생성할 때 create 함수를 사용하고, 파라미터로 함수를 전달
const communityArticleStore = create((set) => ({
  // 초기값 설정
  isLoading: false,
  error: null,
  // 메소드 설정
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  // article list의 초기값 설정
  articles: [],
  totalPages: 0,
  currentPage: 1,

  // article list의 메소드 설정
  setArticles: (articles) => set({ articles }),
  setTotalPages: (totalPages) => set({ totalPages }),
  setCurrentPage: (currentPage) => set({ currentPage }),

  // article detail의 초기값 설정
  articleId: 0,
  detailedArticle: {},

  // article detail의 메소드 설정
  setArticleId: (articleId) => set({ articleId }),
  setDetailedArticle: (detailedArticle) => set({ detailedArticle }),
}));

export default communityArticleStore;
