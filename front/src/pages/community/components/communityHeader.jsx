import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RectBtn from "../../../components/button/rectBtn";

const CommunityHeader = () => {
  const navigate = useNavigate();
  const [isLoggedIn] = useState(true); // 임시로 로그인 상태 true로 설정. TODO: 로그인 상태 확인 로직 추가 필요
  const { articleId } = useParams(); // articleId를 가져옴

  return (
    <div className="mb-6">
      {/* 2-1. 헤더 영역 */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-[#2C2C2C]">커뮤니티</h1>
        {/* 로그인 상태일때만 버튼을 띄우게 */}
        {isLoggedIn &&
          // articleId가 존재하면 목록으로 돌아가는 버튼을 띄움
          (articleId ? (
            <RectBtn
              onClick={() => navigate("/community")}
              text="목록으로"
              className="px-4 py-2 text-base"
            />
          ) : (
            // articleId가 존재하지 않으면(글 목록이면) 글쓰기 버튼을 띄움
            <RectBtn
              onClick={() => navigate("/community/write")}
              text="글쓰기"
              className="px-4 py-2 text-base"
            />
          ))}
      </div>
    </div>
  );
};

export default CommunityHeader;
