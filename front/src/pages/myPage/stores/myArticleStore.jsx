import { create } from "zustand";

const myArticleStore = create(() => ({
  articles: [
    {
      id: 1,
      category: "기술",
      title: "React와 Tailwind를 사용한 프로젝트",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      nickname: "user123",
      viewCnt: 120,
      likesCnt: 15,
      commentCnt: 5,
      createAt: "2025-01-01",
      url: "#",
    },
    {
      id: 2,
      category: "여행",
      title: "제주도 여행 후기",
      nickname: "user456",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      viewCnt: 300,
      likesCnt: 45,
      commentCnt: 20,
      createAt: "2025-01-15",
      url: "#",
    },
    {
      id: 3,
      category: "여행",
      title:
        "React와 Tailwind를 사용한 프로젝트 설날 자율개발인데 설날에 개발만 하고 있는거 같음",
      content: "Lorem Ipsum ",
      nickname: "user456",
      viewCnt: 300,
      likesCnt: 45,
      commentCnt: 20,
      createAt: "2025-01-15",
      url: "#",
    },
  ],
}));

export default myArticleStore;
