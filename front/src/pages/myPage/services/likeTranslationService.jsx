import axios from "axios";
import propTypes from "prop-types";

const LikeTranslationService = {
  async fetchTranslations(userId) {
    try {
      // 좋아요한 번역을 가져오는 api 호출
      const response = await axios.get(
        `https://f1887553-e372-4944-90d7-8fe76ae8d764.mock.pstmn.io/docs/trans/votes?userId=${userId}`
      );

      const data = response.data;

      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

LikeTranslationService.fetchTranslations.propTypes = {
  userId: propTypes.number,
};

export default LikeTranslationService;
