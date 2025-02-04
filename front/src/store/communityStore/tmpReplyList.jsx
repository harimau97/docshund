const TmpReplyList = [
  {
    articleId: 101,
    commentId: 1,
    content: "좋은 글이네요! 도움이 많이 되었습니다.",
    createdAt: "2024-02-03T12:00:00",
    updatedAt: "2024-02-03T12:15:00",
    userId: 1001,
    nickname: "dev_john",
    profileImage: "https://example.com/profiles/1001.png",
    replies: [
      {
        articleId: 101,
        commentId: 3,
        content: "저도 동의합니다! Spring Boot에 대한 설명이 좋네요.",
        createdAt: "2024-02-03T12:30:00",
        updatedAt: "2024-02-03T12:35:00",
        userId: 1002,
        nickname: "backend_lee",
        profileImage: "https://example.com/profiles/1002.png",
        replies: [],
      },
    ],
  },
  {
    articleId: 101,
    commentId: 2,
    content: "몇 가지 질문이 있습니다. REST API에서 JWT를 어떻게 적용하시나요?",
    createdAt: "2024-02-03T12:05:00",
    updatedAt: "2024-02-03T12:20:00",
    userId: 1003,
    nickname: "security_guru",
    profileImage: "https://example.com/profiles/1003.png",
    replies: [
      {
        articleId: 101,
        commentId: 4,
        content:
          "Spring Security와 JWT를 함께 사용하면 됩니다. Bearer Token 방식으로 적용할 수 있어요!",
        createdAt: "2024-02-03T12:40:00",
        updatedAt: "2024-02-03T12:45:00",
        userId: 1001,
        nickname: "dev_john",
        profileImage: "https://example.com/profiles/1001.png",
        replies: [],
      },
    ],
  },
];

export default TmpReplyList;
