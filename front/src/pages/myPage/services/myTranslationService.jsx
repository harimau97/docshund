import { axiosJsonInstance } from "../../../utils/axiosInstance";
import propTypes from "prop-types";

const MyTranslationService = {
  async fetchTranslations(userId) {
    try {
      // 좋아요한 번역을 가져오는 api 호출
      const response = await axiosJsonInstance.get(
        `docs/trans?userId=${userId}`
      );

      const data = response.data;

      return data;
    } catch (error) {
      //TODO: error handling -> 에러 페이지 제작후 연결까지 구현
      console.error(error);
      return null;
    }
  },
};

MyTranslationService.fetchTranslations.propTypes = {
  userId: propTypes.number,
};

export default MyTranslationService;
