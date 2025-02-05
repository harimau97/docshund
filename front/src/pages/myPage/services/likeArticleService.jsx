import axios from "axios";
import proptypes from "prop-types";

const LikeArticleService = {
  async fetchArticles(currentPage, itemsPerPage) {
    try {
      // 좋아요한 게시글을 가져오는 api 호출
      const response = await axios.get(
        `https://f1887553-e372-4944-90d7-8fe76ae8d764.mock.pstmn.io/forums/liikes?page=${currentPage}&size=${itemsPerPage}`
      );

      const data = response.data;

      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

LikeArticleService.fetchArticles.propTypes = {
  currentPage: proptypes.number,
  itemsPerPage: proptypes.number,
};

export default LikeArticleService;
