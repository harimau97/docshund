import PropTypes from "prop-types";
import axios from "axios";

const ArticleItemService = {
  // 게시글 상세 정보를 가져오는 함수
  async fetchArticleItem(articleId) {
    try {
      // TODO: 데이터 axios로 변경 필요
      // axios를 사용하여 서버에 GET 요청
      const response = await axios.get(
        `http://i12a703.p.ssafy.io:8081/api/v1/docshund/forums/${articleId}`
      );
      const data = response.data;
      // 가져온 데이터를 반환
      return data;

      // console.log("articleId : ", articleId);
      // const data = tmpDataDetail;

      // return data;
    } catch (error) {
      // 에러가 발생하면 에러를 반환
      return error;
    }
  },
};

ArticleItemService.propTypes = {
  articleId: PropTypes.number,
};

export default ArticleItemService;
