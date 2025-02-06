import PropTypes from "prop-types";

import ReplyHeader from "./components/replyHeader";
import ReplyItemArea from "./components/replyItemArea";
import ReplyTextarea from "./components/replyTextarea";

const ReplyList = ({ articleData }) => {
  return (
    <div className="mt-6 bg-white rounded-lg border border-[#E1E1DF] p-6">
      {/* 댓글 헤더 */}
      <ReplyHeader replyCount={articleData.commentCount} />
      <div className="border-b border-[#E1E1DF]"></div>
      {/* 댓글 리스트는 여기에 구현 */}
      <ReplyItemArea />

      {/* 댓글 쓰기 창 */}
      {/* TODO: 댓글 쓰고 새로고침 없이 list 한 번 더 부르고 렌더링 하기 */}
      <ReplyTextarea />
    </div>
  );
};

ReplyList.propTypes = {
  articleData: PropTypes.object,
};

export default ReplyList;
