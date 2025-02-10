import propTypes from "prop-types";
import { useState } from "react";
import { useParams } from "react-router-dom";

import communityArticleStore from "../../../store/communityStore/communityArticleStore";
import ReplyItemService from "../services/replyItemService";
import RectBtn from "../../../components/button/rectBtn";

const ReplyTextarea = ({ reCommentFlag, commentId }) => {
  const { articleId } = useParams();
  const [replyContent, setReplyContent] = useState("");

  // store에서 데이터를 가져오기 위해 정의
  const setIsReplied = communityArticleStore((state) => state.setIsReplied);
  const setCommentCount = communityArticleStore(
    (state) => state.setCommentCount
  );

  // 댓글 작성
  const handleSubmit = async () => {
    if (!replyContent) {
      alert("댓글을 입력해주세요.");
      return;
    }
    // NOTE: 대댓글인지 원댓글인지에 따라 다르게 처리
    // 1. 대댓글 작성
    if (reCommentFlag) {
      // 대댓글 작성 시에는 대댓글을 작성하는 원댓글의 id를 가져와야 함
      const response = await ReplyItemService.postReReplyItem(
        articleId,
        commentId,
        replyContent
      );
    } else {
      // 2. 원댓글 작성
      const response = await ReplyItemService.postReplyItem(
        articleId,
        replyContent
      );
    }

    setReplyContent(""); // 제출 후 입력창 초기화

    // 제출 후 댓글 리스트 리렌더링
    setIsReplied((prev) => !prev);
  };

  return (
    <div className="mt-10 p-8 bg-[#FAF9F5] rounded-bl-xl rounded-br-xl rounded-tr-xl rounded-tl-xl border border-[#E1E1DF] text-[#7D7C77]">
      <div className="flex items-center gap-8">
        <textarea
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          placeholder="댓글을 입력해주세요."
          className="flex-1 h-20 p-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:[#bc5b39] resize-none"
        ></textarea>
        <RectBtn
          onClick={handleSubmit}
          text="댓글 작성"
          className="w-24 h-10 text-sm"
        ></RectBtn>
      </div>
    </div>
  );
};

ReplyTextarea.propTypes = {
  setReplyTextareaFlag: propTypes.func,
  reCommentFlag: propTypes.bool,
  commentId: propTypes.number,
};

export default ReplyTextarea;
