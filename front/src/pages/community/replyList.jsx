import PropTypes from "prop-types";

import ReplyHeader from "./components/replyHeader";
import ReplyItemArea from "./components/replyItemArea";

const ReplyList = ({ articleData }) => {
  {
    /* TODO: 댓글 구현 */
  }

  return (
    <div className="mt-6 bg-white rounded-lg border border-[#E1E1DF] p-6">
      {/* TODO: 댓글 헤더 컴포넌트로 옮기기 */}
      {/* 댓글 헤더 */}
      <ReplyHeader replyCount={articleData.commentCount} />
      <div className="border-b border-[#E1E1DF]"></div>
      {/* 댓글 리스트는 여기에 구현 */}
      <ReplyItemArea />

      {/* 댓글 쓰기 창 */}
    </div>
  );
};

ReplyList.propTypes = {
  articleData: PropTypes.object,
};

export default ReplyList;
