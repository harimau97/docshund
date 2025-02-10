import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import communityArticleStore from "../../../store/communityStore/communityArticleStore";
import ReplyItemService from "../services/replyItemService";
import ListRender from "../../../components/pagination/listRender";
import ReplyRenderItem from "./replyRenderItem";

const ReplyItem = ({
  replyTextareaFlag,
  setReplyTextareaFlag,
  reCommentFlag,
  setReCommentFlag,
}) => {
  const { articleId } = useParams();

  // store에서 데이터를 가져오기 위해 정의
  const [replyList, setReplyList] = useState([]);

  // store의 메소드를 가져오기 위해 정의
  const setArticleId = communityArticleStore((state) => state.setArticleId);
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
          setReplyList(data);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    // 댓글 아이템을 가져오는 fetchReplyItems 함수 호출
    fetchReplyItems(articleId);
  }, [articleId, replyTextareaFlag]);

  const renderItem = (item) => (
    <div className="w-full">
      {/* 원댓글 렌더링 */}
      <ReplyRenderItem
        item={item}
        replyTextareaFlag={replyTextareaFlag}
        setReplyTextareaFlag={setReplyTextareaFlag}
        reCommentFlag={reCommentFlag}
        setReCommentFlag={setReCommentFlag}
      />

      {/* 대댓글 렌더링 */}
      {item.replies?.length > 0 && (
        <div className="flex flex-col mt-4 w-full">
          {/* 대댓글 목록을 세로 정렬 */}
          <div className="flex flex-col space-y-2 w-full">
            {item.replies.map((reply) => (
              <div
                key={reply.commentId}
                className="flex items-center border-t-2 border-gray-200 pt-2 w-full"
              >
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
                <div className="w-full">
                  <ReplyRenderItem
                    item={reply}
                    replyTextareaFlag={replyTextareaFlag}
                    setReplyTextareaFlag={setReplyTextareaFlag}
                    reCommentFlag={true}
                    setReCommentFlag={setReCommentFlag}
                  />
                </div>
              </div>
            ))}
          </div>
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
  replyTextareaFlag: PropTypes.bool,
  setReplyTextareaFlag: PropTypes.func,
  reCommentFlag: PropTypes.bool,
  setReCommentFlag: PropTypes.func,
};

export default ReplyItem;
