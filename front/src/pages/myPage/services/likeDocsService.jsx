import axios from "axios";

const LikeDocsService = {
  // 관심 문서 가져오기
  async fetchDocs(userId) {
    try {
      // 좋아요한 게시글을 가져오는 api 호출
      const response = await axios.get(
        `https://f1887553-e372-4944-90d7-8fe76ae8d764.mock.pstmn.io/docs/likes?userId=${userId}`
      );

      const data = response.data;

      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

export default LikeDocsService;
