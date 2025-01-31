import axios from "axios";

const articleListService = {
  // fetchArticles 함수는 filter, keyword, page, size를 인자로 받아서 데이터를 가져오는 함수
  async fetchArticles(sortType, filter, keyword, searchType, page, size) {
    try {
      // console.log(sortType, filter, keyword, searchType, page, size)
      const response = await axios.get(
        `https://69889664-709b-4f94-96d0-9ed9a4216ee0.mock.pstmn.io/forums?sort=${sortType}&filter=${filter}&keyword=${keyword}&searchType=${searchType}&page=${page}&size=${size}`
      );
      // console.log(response.data);
      const data = response.data;

      // 게시글이 15개 초과일 경우에 대한 예외처리 필요

      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

export default articleListService;
