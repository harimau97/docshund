import { useState } from "react";
import PropTypes from "prop-types";

import ReplyHeader from "./components/replyHeader";
import ReplyItemArea from "./components/replyItemArea";
import ReplyTextarea from "./components/replyTextarea";

const ReplyList = ({ replyCount }) => {
  const token = localStorage.getItem("token");

  const [replyFlag, setReplyFlag] = useState(false); // 댓글 작성창 보여주는 여부를 알기 위한 flag
  const [reCommentFlag, setReCommentFlag] = useState(false); // 대댓글 작성 여부를 알기 위한 flag

  return (
    <div className="mt-6 bg-white rounded-lg border border-[#E1E1DF] p-6">
      {/* 댓글 헤더 */}
      {/* TODO: 댓글 개수 보여주는 거 더 빠르게 */}
      <ReplyHeader replyCount={replyCount} />
      <div className="border-b border-[#E1E1DF]"></div>
      {/* 댓글 리스트는 여기에 구현 */}
      <ReplyItemArea
        replyFlag={replyFlag} // 댓글 작성창 보여주는 여부를 알기 위한 flag
        setReplyFlag={setReplyFlag}
        reCommentFlag={reCommentFlag} // 대댓글 작성 여부를 알기 위한 flag
        setReCommentFlag={setReCommentFlag}
      />

      {/* 댓글 쓰기 창 */}
      {/* 로그인 한 회원만 보여주기 */}
      {token && (
        <ReplyTextarea
          setReplyFlag={setReplyFlag}
          reCommentFlag={reCommentFlag}
          commentId={0} // 대댓글 작성 시 대댓글을 작성하는 원댓글의 id. 원댓글 작성 시 사용X
        />
      )}
    </div>
  );
};

ReplyList.propTypes = {
  replyCount: PropTypes.number,
};

export default ReplyList;
