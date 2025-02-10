import { useState } from "react";
import Proptypes from "prop-types";
import { jwtDecode } from "jwt-decode";

import communityArticleStore from "../../../store/communityStore/communityArticleStore";
import ReplyTextarea from "./replyTextarea";
import ReplyItemService from "../services/replyItemService";

const ReplyRenderItem = ({
  item,
  replyTextareaFlag,
  setReplyTextareaFlag,
  reCommentFlag,
  setReCommentFlag,
}) => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const [replyId, setReplyId] = useState(0);

  const setIsReplied = communityArticleStore((state) => state.setIsReplied);
  const setCommentCount = communityArticleStore(
    (state) => state.setCommentCount
  );

  // TODO: 댓글 레이아웃 다듬기
  return (
    <div className="flex flex-col bg-white p-4 rounded-lg mt-2 mb-2">
      {/* 유저 프로필 영역 */}
      <div className="flex justify-between items-start">
        <img
          src={item.profileImage}
          alt="프로필"
          className="w-10 h-10 rounded-full mr-4"
        />
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold text-gray-800">{item.nickname}</p>
            <p className="text-sm text-gray-500">{item.createdAt}</p>
          </div>
          {/*  콘텐츠 */}
          <p className="text-gray-700 break-words">{item.content}</p>

          {/* util */}
          <div className="flex justify-end space-x-4 mt-2">
            {/* NOTE: 자신이 쓴 댓글에 대해서만 삭제 버튼 보이게 */}
            {decoded?.userId === item.userId && (
              <button
                className="hover:text-gray-700 cursor-pointer"
                onClick={async () => {
                  await ReplyItemService.deleteReplyItem(
                    item.articleId,
                    item.commentId
                  );

                  //  삭제 후 댓글 리스트 리렌더링
                  setIsReplied((prev) => !prev);
                }}
              >
                삭제
              </button>
            )}

            {decoded?.userId != item.userId && (
              <button className="hover:text-gray-700 cursor-pointer">
                신고
              </button>
            )}

            <button
              className="hover:text-gray-700 cursor-pointer"
              onClick={() => {
                setReplyTextareaFlag(true); // 대댓글 작성창 보여주기
                setReplyId(item.commentId); // 대댓글 작성 시 대댓글을 작성하는 원댓글의 id
                setReCommentFlag((prev) => !prev); // 대댓글 작성 여부 flag
              }}
            >
              댓글 달기
            </button>
          </div>
        </div>
      </div>

      {/* TODO: textarea가 하나에만 뜨게 하기 */}
      {/* 유저고, 대댓글이고, 원댓글의 밑에 대해서 */}
      {token && replyTextareaFlag && replyId === item.commentId && (
        <div className="ml-14 mt-2">
          {/* 대댓글 작성 */}
          <ReplyTextarea
            reCommentFlag={reCommentFlag} // 대댓글 작성 여부를 알기 위한 flag
            commentId={item.commentId} // 대댓글 작성 시 대댓글을 작성하는 원댓글의 id
          />
        </div>
      )}
    </div>
  );
};

ReplyRenderItem.propTypes = {
  item: Proptypes.object,
  replyTextareaFlag: Proptypes.bool,
  setReplyTextareaFlag: Proptypes.func,
  reCommentFlag: Proptypes.bool,
  setReCommentFlag: Proptypes.func,
};

export default ReplyRenderItem;
