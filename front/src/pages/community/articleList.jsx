import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import articleListService from "./hooks/articleListService";
import ArticleListRender from "./components/articleListRender.jsx";
import RectBtn from "../../components/button/rectBtn";
import communityArticleStore from "./stores/communityArticleStore.jsx";

import like from "../../assets/icon/heartFilled24.png";
import view from "../../assets/icon/viewCnt.png";
import comment from "../../assets/icon/commentCnt.png";

const ArticleList = () => {
  const navigate = useNavigate();

  //  store에서 데이터를 가져오기 위해 store의 상태와 메소드를 가져옴
  const articles = communityArticleStore((state) => state.articles);
  const totalPages = communityArticleStore((state) => state.totalPages);
  const setArticles = communityArticleStore((state) => state.setArticles);
  const setTotalPage = communityArticleStore((state) => state.setTotalPage);
  const setLoading = communityArticleStore((state) => state.setLoading);
  const setError = communityArticleStore((state) => state.setError);

  const [isLoggedIn] = useState(true); // 임시로 로그인 상태 true로 설정
  const [sortType, setSortBy] = useState("latest");
  const [pageNumber, setPageNumber] = useState(1);
  const [itemsPerPage, setItmesPerPage] = useState(15);

  // 즉시 store에 접근하여 데이터를 가져오기 위해 useEffect 사용
  useEffect(() => {
    // 비동기 함수를 만들어서 데이터를 가져오는 로직을 작성
    const fetchArticles = async () => {
      // 데이터를 가져오기 전에 로딩 상태를 true로 변경
      setLoading(true);

      // 데이터 가져오기
      try {
        // articleListService.fetchArticles 함수를 호출하여 데이터를 가져옴
        const data = await articleListService.fetchArticles(
          sortType,
          "",
          "",
          "title",
          pageNumber,
          itemsPerPage
        );

        // 가져온 데이터를 store에 저장
        if (data) {
          setArticles(data.articles);
          setTotalPage(data.totalPages);

          setItmesPerPage(data.articles.length);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    // fetchArticles 함수를 실행
    fetchArticles();
  }, [
    sortType,
    pageNumber,
    itemsPerPage,
    setArticles,
    setTotalPage,
    setLoading,
    setError,
  ]);

  const sortOptions = [
    { value: "latest", label: "최신순" },
    { value: "likes", label: "좋아요 순" },
    { value: "views", label: "조회수순" },
  ];

  const handleSort = (value) => {
    setSortBy(value);
    // Add your sorting logic here
  };

  // 리스트 아이템 렌더링
  const renderItem = (item) => (
    <div className="flex justify-between text-lg px-3">
      <div className="flex-1 min-w-0 mr-3 flex flex-col justify-between">
        {/* // Link 컴포넌트를 사용하여 글 제목을 클릭하면 해당 글로 이동하도록 설정 */}
        <Link
          to={`/article/${item.id}`}
          className="font-semibold line-clamp-1 break-all text-[#7d7c77] hover:text-[#bc5b39]"
        >
          {item.title}
        </Link>
        <p className="text-base line-clamp-1 break-all">{item.content}</p>
        <p className="text-base">{item.createdAt}</p>
      </div>
      <div className="flex space-x-6 items-bottom">
        <p className="self-end">{item.nickname}</p>
        <div className="flex flex-col justify-between">
          <div className="flex items-center">
            <img className="mr-2" src={like} alt="좋아요수 아이콘" />
            <p className="w-8 text-right">{item.likesCnt}</p>
          </div>
          <div className="flex items-center">
            <img className="mr-2" src={view} alt="조회수 아이콘" />
            <p className="w-8 text-right">{item.viewCnt}</p>
          </div>
          <div className="flex items-center">
            <img className="mr-2" src={comment} alt="댓글수 아이콘" />
            <p className="w-8 text-right">{item.commentCnt}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex">
      {/* 1. 좌측 네비게이션 */}
      <nav className="w-[240px] min-h-screen bg-[#F8F8F7] p-4">
        <ul className="space-y-2">
          <li className="cursor-pointer p-2 hover:bg-[#bc5b39] hover:text-white rounded">
            전체
          </li>
          <li className="cursor-pointer p-2 hover:bg-[#bc5b39] hover:text-white rounded">
            질문
          </li>
          <li className="cursor-pointer p-2 hover:bg-[#bc5b39] hover:text-white rounded">
            정보
          </li>
          <li className="cursor-pointer p-2 hover:bg-[#bc5b39] hover:text-white rounded">
            자유
          </li>
        </ul>
      </nav>

      {/* 2. 메인 영역 */}
      <main className="flex-1 p-8">
        {/* 2-1. 헤더 영역 */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">커뮤니티</h1>
            {isLoggedIn && (
              <RectBtn
                onClick={() => navigate("/community/write")}
                text="글쓰기"
              />
            )}
          </div>
        </div>

        {/* 2-2. 글 목록 */}
        {/* 글 목록이 있을 때 */}
        <div className="pt-4 pl-6 bg-white rounded-tl-xl rounded-tr-xl border-t border-l border-r border-[#E1E1DF]">
          <div className="flex justify-between items-center">
            {/* 검색 바 */}
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              className="border p-2 rounded"
              style={{ width: "800px", height: "30px" }}
            />
            {/* 정렬 드롭다운 */}
            <select
              value={sortType}
              onChange={(e) => handleSort(e.target.value)}
              className="px-4 rounded-lg border border-gray-300 bg-white"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 글 목록, 페이지네이션 */}
        <ArticleListRender
          data={articles}
          renderItem={renderItem}
          totalPages={totalPages}
        />
      </main>
    </div>
  );
};

export default ArticleList;
