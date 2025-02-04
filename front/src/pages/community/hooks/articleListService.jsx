import axios from "axios";

import ArticleListExample from "../../../store/communityStore/articleListExample";
import ArticleListEmptyExample from "../../../store/communityStore/articleListEmptyExample";

const ArticleListService = {
  // fetchArticles 함수는 filter, keyword, page, size를 인자로 받아서 데이터를 가져오는 함수
  async fetchArticles(
    sortType,
    filter,
    keyword,
    searchType,
    page,
    itemsPerPage
  ) {
    try {
      // TODO: 데이터 axios로 변경 필요
      // const response = await axios.get(
      //   // postman forked mock server endpoint
      //   `https://f1887553-e372-4944-90d7-8fe76ae8d764.mock.pstmn.io/forums?sort=${sortType}&filter=${filter}&keyword=${keyword}&searchType=${searchType}&page=${page}&size=${itemsPerPage}`
      // );
      // // console.log(response.data);
      // const data = response.data;

      // TODO: 게시글이 15개 초과일 경우에 대한 예외처리 필요
      console.log(
        "input parameter => ",
        sortType,
        filter,
        keyword,
        searchType,
        page,
        itemsPerPage
      );
      // console.log("output data => ", data);

      // return data;

      return ArticleListExample;
      // return ArticleListEmptyExample;

      // NOTE: page(현재 페이지)에 따라 종속된 tmp 데이터 반환
      // if (page == 1) {
      //   return tmpData1;
      // } else if (page == 2) {
      //   return tmpData2;
      // } else {
      //   return null;
      // }

      // NOTE: 정렬 기준에 따라 다른 tmp 데이터 반환
      // if (sortType === "latest") {
      //   return tmpData1;
      // } else if (sortType === "likes") {
      //   return tmpData2;
      // }

      // NOTE: 검색어에 따라 다른 tmp 데이터 반환
      // if (keyword === "test") {
      //   return tmpData1;
      // } else {
      //   return tmpData2;
      // }
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

export default ArticleListService;
