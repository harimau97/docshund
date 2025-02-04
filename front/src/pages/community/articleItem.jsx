import ArticleItemService from "./hooks/articleItemService";
import communityArticleStore from "../../store/communityStore/communityArticleStore";
import CommunityHeader from "./components/communityHeader";
import ReplyList from "./replyList";

import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ArticleItem = () => {
  const { articleId } = useParams();

  const articleData = communityArticleStore((state) => state.articleItems);

  // store의 메소드를 가져오기 위해 정의
  const setArticleId = communityArticleStore((state) => state.setArticleId);
  const setArticleItems = communityArticleStore(
    (state) => state.setArticleItems
  );
  const setLoading = communityArticleStore((state) => state.setLoading);
  const setError = communityArticleStore((state) => state.setError);

  // NOTE: 즉시 store에 접근하여 데이터를 가져오기 위해 useEffect 사용
  useEffect(() => {
    const fetchArticleItems = async (articleId) => {
      // 데이터를 가져오기 전에 로딩 상태를 true로 변경
      setLoading(true);

      // 데이터 가져오기
      try {
        // detailedArticleService.fetchDetailedArticle 함수를 호출하여 데이터를 가져옴
        const data = await ArticleItemService.fetchArticleItem(articleId);

        if (data) {
          setArticleId(articleId);
          setArticleItems(data);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    // 게시글 아이템을 가져오는 fetchArticleItems 함수 호출
    fetchArticleItems(articleId);
  }, [articleId]);

  return (
    <div className="flex justify-center w-full">
      <main className="flex-1 p-8 max-w-[1280px]">
        {/* header */}
        <CommunityHeader />
        {/* main content - bg-white와 rounded 스타일을 상위 div에 적용 */}
        {/* 게시글 전체 박스 영역 */}
        <div className="bg-white rounded-tl-xl rounded-tr-xl border-t rounded-bl-xl rounded-br-xl border-b border-l border-r  border-[#E1E1DF]">
          <div className="p-6">
            {/* TODO: 헤더 구현 */}
            {/* 게시글 헤더 */}
            <div className="border-b border-[#E1E1DF] pb-4 mb-4">
              <h1 className="text-2xl font-bold mb-2">{articleData.title}</h1>
              <div className="flex justify-between items-center text-[#7d7c77]">
                <div className="flex items-center gap-4">
                  <img
                    src={articleData.profileImage}
                    alt="프로필"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="font-medium">{articleData.nickname}</span>
                  {/* TODO: date 양식 변경 */}
                  <span>{articleData.createdAt}</span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <span>조회</span>
                    <span>{articleData.viewCount}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>좋아요</span>
                    <span>{articleData.likeCount}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* TODO: 본문 구현 */}
            {/* 게시글 본문 */}
            <div className="border-b border-[#E1E1DF] pb-4 mb-4">
              <div className="min-h-[200px] whitespace-pre-wrap mb-6">
                {articleData.content}
              </div>
            </div>

            {/* 문서 참조 정보 */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="font-medium mb-2">참조된 문서:</p>
              <p>{articleData.documentName}</p>
              <p className="text-sm text-[#7d7c77]">
                위치: {articleData.position}
              </p>
            </div>

            {/* 본문 footer */}
          </div>
        </div>
        <ReplyList articleData={articleData} />
      </main>
    </div>
  );
};

export default ArticleItem;
