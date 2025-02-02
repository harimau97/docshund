import { create } from "zustand";

const myCommentStore = create(() => ({
  comments: [
    {
      articleId: 1,
      commentContent: "좋은 글 감사합니다!",
      createdAt: "2025-01-20",
    },
    {
      articleId: 2,
      commentContent: "유익한 정보네요!",
      createdAt: "2025-01-22",
    },
    {
      articleId: 3,
      commentContent:
        "ㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅㄱㅅ",
      createdAt: "2025-01-22",
    },
  ],
}));

export default myCommentStore;
