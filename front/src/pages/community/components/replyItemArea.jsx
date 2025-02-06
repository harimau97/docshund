import PropTypes from "prop-types";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import communityArticleStore from "../../../store/communityStore/communityArticleStore";
import ReplyItemService from "../hooks/replyItemService";
import ListRender from "../../../components/pagination/listRender";
import ReplyRenderItem from "./replyRenderItem";

const ReplyItem = () => {
  const { articleId } = useParams();

  // store에서 데이터를 가져오기 위해 정의
  const replyList = communityArticleStore((state) => state.replies);

  // store의 메소드를 가져오기 위해 정의
  const setArticleId = communityArticleStore((state) => state.setArticleId);
  const setReplies = communityArticleStore((state) => state.setReplies);
  const setLoading = communityArticleStore((state) => state.setLoading);
  const setError = communityArticleStore((state) => state.setError);

  useEffect(() => {
    // 댓글 아이템을 가져오는 함수
    const fetchReplyItems = async (articleId) => {
      // 데이터를 가져오기 전에 로딩 상태를 true로 변경
      setLoading(true);

      // 데이터 가져오기
      try {
        const data = await ReplyItemService.fetchReplyItem(articleId);

        if (data?.length > 0) {
          setArticleId(articleId);
          setReplies(data);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    // 댓글 아이템을 가져오는 fetchReplyItems 함수 호출
    fetchReplyItems(articleId);
  }, [articleId]);

  const renderItem = (item) => (
    <div>
      <ReplyRenderItem item={item} />
      {/* 대댓글 렌더링 */}
      {item.replies?.length > 0 && (
        <div className="inline-flex justify-between items-center mt-4 ml-4">
          {/* 대댓글 표시 꺾쇠 */}
          <div className="pb-2 pr-2">
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 mr-2 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M8 4L8 16L20 16M20 16L17 13M20 16L17 19"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          {/* 대댓글 컴포넌트 */}
          {item.replies.map((reply) => (
            <div key={reply.commentId}>
              <ReplyRenderItem item={reply} />
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div>
      <ListRender
        data={replyList}
        renderItem={renderItem}
        totalPages={0}
        currentPage={0}
        setCurrentPage={null}
        itemCategory="comment"
      ></ListRender>
    </div>
  );
};

ReplyItem.propTypes = {
  replyList: PropTypes.array,
};

export default ReplyItem;
