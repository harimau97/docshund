import { create } from "zustand";

const inquiryStore = create(() => ({
  inquiries: [
    {
      id: 1,
      title: "React문서 올려주세요.",
      content: "React문서 올려주세요. React문서 올려주세요.",
      createdAt: "2025.01.22",
      isAnswered: false,
      answer: null,
    },
    {
      id: 2,
      title: "Vue문서 올려주세요.",
      content: "Vue문서 올려주세요. Vue문서 올려주세요.",
      createdAt: "2025.01.22",
      isAnswered: true,
      answer: "답변 완료: 문서가 업데이트되었습니다.",
    },
  ],
}));

export default inquiryStore;
