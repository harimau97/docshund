import axios from "axios";

const ReplyItemService = {
  async fetchReplyItem(articleId) {
    try {
      // TODO: axios로 변경 필요
      const response = await axios.get(
        `https://f1887553-e372-4944-90d7-8fe76ae8d764.mock.pstmn.io/forums/${articleId}/comments`
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
