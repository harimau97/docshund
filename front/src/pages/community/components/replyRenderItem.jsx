import { useState } from "react";
import Proptypes from "prop-types";
import { jwtDecode } from "jwt-decode";

import ReportModal from "../../report";
import useReportStore from "../../../store/reportStore";
import communityArticleStore from "../../../store/communityStore/communityArticleStore";
import ReplyTextarea from "./replyTextarea";
import ReplyItemService from "../services/replyItemService";
import { format, isSameDay } from "date-fns";

const ReplyRenderItem = ({
  item,
  rootCommentId,
  reCommentFlag,
  setReCommentFlag,
}) => {
  const token = localStorage.getItem("token");

  const setIsReplied = communityArticleStore((state) => state.setIsReplied);
  const replyId = communityArticleStore((state) => state.replyId);

  const setReplyId = communityArticleStore((state) => state.setReplyId);
  const openReport = useReportStore((state) => state.openReport);
  const toggleReport = useReportStore((state) => state.toggleReport);

  const handleReport = (data) => {
    //TEST
    console.log("data", data);

    useReportStore.setState({
      originContent: data.content,
      reportedUser: data.userId,
      commentId: data.commentId,
      articleId: data.articleId,
      transId: null,
      chatId: null,
    });

    openReport();
    toggleReport();
  };

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
            <p className="text-sm text-gray-500">
              {item?.createdAt
                ? isSameDay(new Date(item.createdAt), new Date())
                  ? format(new Date(item.createdAt), "HH:mm")
                  : format(new Date(item.createdAt), "yyyy-MM-dd HH:mm")
                : "표시할 수 없는 날짜입니다."}
            </p>
          </div>
          {/*  콘텐츠 */}
          <p className="text-gray-700 break-words">{item.content}</p>

          {/* util */}
          <div className="flex justify-end space-x-4 mt-2">
            {/* NOTE: 자신이 쓴 댓글에 대해서만 삭제 버튼 보이게 */}
            {token
              ? jwtDecode(token)?.userId === item.userId && (
                  <button
                    className="text-[#7d7c77] underline cursor-pointer"
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
                )
              : null}

            {token
              ? jwtDecode(token)?.userId != item.userId && (
                  <button
                    className="text-[#7d7c77] underline text-sm cursor-pointer"
                    onClick={() => handleReport(item)}
                  >
                    신고
                  </button>
                )
              : null}

            <button
              className="text-[#7d7c77] underline text-sm cursor-pointer"
              onClick={() => {
                setReCommentFlag(true); // 대댓글 작성 여부를 알기 위한 flag
                setReplyId(item.commentId); // 대댓글 작성 시 대댓글을 작성하는 원댓글의 id
              }}
            >
              댓글 달기
            </button>
          </div>
        </div>
        <ReportModal />
      </div>

      {/* 유저고, 대댓글이고, 원댓글의 밑에 대해서 */}
      {token && reCommentFlag && replyId === item.commentId && (
        <div className="ml-14 mt-2">
          {/* 대댓글 작성 */}
          <ReplyTextarea
            reCommentFlag={reCommentFlag} // 대댓글 작성 여부를 알기 위한 flag
            commentId={rootCommentId} // 대댓글 작성 시 대댓글을 작성하는 원댓글의 id
          />
        </div>
      )}
      <ReportModal />
    </div>
  );
};

ReplyRenderItem.propTypes = {
  item: Proptypes.object,
  rootCommentId: Proptypes.number,
  reCommentFlag: Proptypes.bool,
  setReCommentFlag: Proptypes.func,
};

export default ReplyRenderItem;
