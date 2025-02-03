import axios from "axios";

import tmpDataDetail from "../../../store/communityStore/tmpDataDetail";

const DetailedArticleService = {
  // 게시글 상세 정보를 가져오는 함수
  async fetchDetailedArticle(articleId) {
    try {
      // TODO: 데이터 axios로 변경 필요
      // axios를 사용하여 서버에 GET 요청
      //   const response = await axios.get(
      //     `https://f1887553-e372-4944-90d7-8fe76ae8d764.mock.pstmn.io/forums/${articleId}`
      //   );
      //   const data = response.data;
      //   // 가져온 데이터를 반환
      //   return data;

      const data = tmpDataDetail;

      return data;
    } catch (error) {
      // 에러가 발생하면 에러를 반환
      return error;
    }
  },
};

export default DetailedArticleService;
