import { title } from "framer-motion/client";
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
  sortType: "latest",
  keyword: "",
  totalPages: 0,
  currentPage: 0,

  // article list의 메소드 설정
  setArticles: (articles) => set({ articles }),
  setSortType: (sortType) => set({ sortType }),
  setKeyword: (keyword) => set({ keyword }),
  setTotalPages: (totalPages) => set({ totalPages }),
  setCurrentPage: (currentPage) => set({ currentPage }),

  // article item의 초기값 설정
  articleId: 0,
  articleItems: {},
  likeCount: 0,

  // article item의 메소드 설정
  setArticleId: (articleId) => set({ articleId }),
  setArticleItems: (articleItems) => set({ articleItems }),
  setLikeCount: (likeCount) => set({ likeCount }),

  // 좋아요한 article list의 초기값 설정
  likeArticles: [],
  setLikeArticles: (likeArticles) => set({ likeArticles }),

  // 내가 작성한 article list의 초기값 설정
  myArticles: [],
  setMyArticles: (myArticles) => set({ myArticles }),

  // 글 작성에 필요한 데이터 저장
  title: "",
  position: "", // 문서(대분류) 제목
  category: "", // 문서(소분류) 제목
  content: "",
  fileUrl: "", // 파일 URL

  // 글 작성에 필요한 메소드 설정
  setTitle: (title) => set({ title }),
  setPosition: (position) => set({ position }), // 문서(대분류) 제목 수정
  setCategory: (category) => set({ category }), // 문서(소분류) 제목 수정
  setContent: (content) => set({ content }),
  setFileUrl: (fileUrl) => set({ fileUrl }),

  // reply list의 초기값 설정
  replies: [], // 댓글 리스트
  commentCount: 0, // 댓글 개수

  // reply list의 메소드 설정
  setReplies: (replies) => set({ replies }),
  setCommentCount: (commentCount) => set({ commentCount }),
}));

export default communityArticleStore;
