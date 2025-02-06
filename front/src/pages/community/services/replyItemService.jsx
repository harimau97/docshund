import { axiosJsonInstance } from "../../../utils/axiosInstance";
import propTypes from "prop-types";

const ReplyItemService = {
  async fetchReplyItem(articleId) {
    try {
      const response = await axiosJsonInstance.get(
        `forums/${articleId}/comments`
      );

      const data = response.data;
      return data;
    } catch (error) {
      //TODO: error handling -> 에러 페이지 제작후 연결까지 구현
      console.log(error);
      return null;
    }
  },

  // 원댓글 작성
  async postReplyItem(articleId, content) {
    try {
      const response = await axiosJsonInstance.post(
        `forums/${articleId}/comments`,
        {
          content,
        }
      );

      const data = response.data;

      return data;
    } catch (error) {
      //TODO: error handling -> 에러 페이지 제작후 연결까지 구현
      console.log(error);
      return null;
    }
  },
};

ReplyItemService.fetchReplyItem.propTypes = {
  articleId: propTypes.number.isRequired,
};

export default ReplyItemService;
