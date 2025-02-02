import { create } from "zustand";

const myTranslationStore = create(() => ({
  translations: [
    {
      transId: 1,
      originId: 101,
      userId: 1,
      pOrder: 1,
      documentName: "MyBatis",
      createdAt: "2025.01.22",
      likeCount: 0,
      content: "이것은 번역된 문장입니다.",
      url: "#",
    },
    {
      transId: 2,
      originId: 102,
      userId: 1,
      pOrder: 2,
      documentName: "react",
      createdAt: "2025.01.22",
      likeCount: 30,
      content: "이것은 또 다른 번역 문장입니다.",
      url: "#",
    },
    {
      transId: 3,
      originId: 102,
      userId: 1,
      pOrder: 2,
      documentName: "react12345678901234567890123456789012345678901234567890",
      createdAt: "2025.01.22",
      likeCount: 30,
      content: "이것은 또 다른 번역 문장입니다.",
      url: "#",
    },
    ...Array.from({ length: 50 }, (_, index) => ({
      transId: index + 3,
      originId: 100 + index,
      userId: 1,
      pOrder: index + 1,
      documentName: `Example Doc ${index + 1}`,
      createdAt: `2025.01.${(index % 30) + 1}`,
      likeCount: Math.floor(Math.random() * 50),
      content: "이것은 예제 번역 문장입니다.",
      url: "#",
    })),
  ],
}));

export default myTranslationStore;
