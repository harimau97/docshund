import axios from "axios";
import proptypes from "prop-types";

const MyCommentService = {
  async fetchComments(userId) {
    try {
      const response = await axios.get(
        `https://f1887553-e372-4944-90d7-8fe76ae8d764.mock.pstmn.io/forums/comments/user/${userId}`
      );

      const data = response.data;

      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

MyCommentService.fetchComments.propTypes = {
  userId: proptypes.number,
};

export default MyCommentService;
