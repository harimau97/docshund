import axios from "axios";

const ReplyItemService = {
  async fetchReplyItem(articleId) {
    try {
      // TODO: axios로 변경 필요
      const response = await axios.get(
        `http://i12a703.p.ssafy.io:8081/api/v1/docshund/forums/${articleId}/comments`
      );

      const data = response.data;
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};

export default ReplyItemService;
