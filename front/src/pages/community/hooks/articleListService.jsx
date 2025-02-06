import axios from "axios";

// import ArticleListExample from "../../../store/communityStore/articleListExample";
// import ArticleListEmptyExample from "../../../store/communityStore/articleListEmptyExample";

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
      const response = await axios.get(
        // postman forked mock server endpoint
        `http://i12a703.p.ssafy.io:8081/api/v1/docshund/forums?sort=${sortType}&filter=${filter}&keyword=${keyword}&searchType=${searchType}&page=${page}&size=${itemsPerPage}`
      );

      const data = response.data;

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

      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

export default ArticleListService;
