import PropTypes from "prop-types";
import {
  axiosJsonInstance,
  axiosMultipartInstance,
} from "../../../utils/axiosInstance";

const ArticleItemService = {
  // 게시글 상세 정보를 가져오는 함수
  async fetchArticleItem(articleId) {
    try {
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

  async modifyArticleItem(articleId) {
    try {
      const response = await axiosJsonInstance.patch(`forums/${articleId}`);
      const data = response.data;

      return data;
    } catch (error) {
      //TODO: error handling -> 에러 페이지 제작후 연결까지 구현
      console.log(error);
      return error;
    }
  },

  async deleteArticleItem(articleId) {
    try {
      const response = await axiosJsonInstance.delete(`forums/${articleId}`);
      const data = response.data;

      return data;
    } catch (error) {
      // TODO: error handling -> 에러 페이지 제작후 연결까지 구현
      console.log(error);
      return error;
    }
  },

  async likeArticleItem(articleId) {
    try {
      const response = await axiosJsonInstance.post(
        `forums/${articleId}/likes`
      );

      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  async uploadImageFile(file) {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axiosMultipartInstance.post(
        `/forums/image`,
        formData
      );

      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  async postArticleItem(title, category, content) {
    try {
      const response = await axiosJsonInstance.post("/forums", {
        title,
        category,
        content,
      });

      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};

ArticleItemService.propTypes = {
  articleId: PropTypes.number,
  file: PropTypes.object,
};

export default ArticleItemService;
