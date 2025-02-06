import { useState } from "react";

import ReplyItemService from "../services/replyItemService";

import RectBtn from "../../../components/button/rectBtn";
import { useParams } from "react-router-dom";

const ReplyTextarea = () => {
  const { articleId } = useParams();
  const [replyContent, setReplyContent] = useState("");

  const handleSubmit = async () => {
    // 댓글 작성
    await ReplyItemService.postReplyItem(articleId, replyContent);
    setReplyContent(""); // 제출 후 입력창 초기화
    // 제출 후 댓글 리스트 다시 불러오기
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

export default ReplyTextarea;
