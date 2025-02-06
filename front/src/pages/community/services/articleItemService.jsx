import PropTypes from "prop-types";
import { axiosJsonInstance } from "../../../utils/axiosInstance";

const ArticleItemService = {
  // 게시글 상세 정보를 가져오는 함수
  async fetchArticleItem(articleId) {
    try {
      // TODO: 데이터 axios로 변경 필요
      // axios 헤더 json에 token을 담아주는 객체를 사용하여 서버에 GET 요청
      const response = await axiosJsonInstance.get(`forums/${articleId}`);
      const data = response.data;
      // 가져온 데이터를 반환
      return data;

      // console.log("articleId : ", articleId);
      // const data = tmpDataDetail;

      // return data;
    } catch (error) {
      //TODO: error handling -> 에러 페이지 제작후 연결까지 구현
      console.log(error);
      return error;
    }
  },
};

ArticleItemService.propTypes = {
  articleId: PropTypes.number,
};

export default ArticleItemService;
