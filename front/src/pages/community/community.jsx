import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RectBtn from "../../components/button/rectBtn";
import RoundCornerBtn from "../../components/button/roundCornerBtn";

const CommunityPage = () => {
  const navigate = useNavigate();
  const [isLoggedIn] = useState(true); // 임시로 로그인 상태 true로 설정
  const [sortBy, setSortBy] = useState('latest');

  const sortOptions = [
    { value: 'latest', label: '최신순' },
    { value: 'likes', label: '좋아요 순' },
    { value: 'views', label: '조회수순' }
  ];

  const handleSort = (value) => {
    setSortBy(value);
    // Add your sorting logic here
  };

  return (
    <div className="flex">
      {/* 1. 좌측 네비게이션 */}
      <nav className="w-[240px] min-h-screen bg-[#F8F8F7] p-4">
        <ul className="space-y-2">
          <li className="cursor-pointer p-2 hover:bg-[#bc5b39] hover:text-white rounded">전체</li>
          <li className="cursor-pointer p-2 hover:bg-[#bc5b39] hover:text-white rounded">질문</li>
          <li className="cursor-pointer p-2 hover:bg-[#bc5b39] hover:text-white rounded">정보</li>
          <li className="cursor-pointer p-2 hover:bg-[#bc5b39] hover:text-white rounded">자유</li>
        </ul>
      </nav>

      {/* 2. 메인 영역 */}
      <main className="flex-1 p-8">
        {/* 2-1. 헤더 영역 */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">커뮤니티</h1>
            {isLoggedIn && (
              <RectBtn 
                onClick={() => navigate('/community/write')} 
                text="글쓰기" 
              />
            )}
          </div>
          <div className="flex justify-between items-center">
            {/* 검색 바 */}
            <input 
              type="text" 
              placeholder="검색어를 입력하세요" 
              className="border p-2 rounded"
              style={{ width: '800px', height: '30px' }}
            />
            {/* 정렬 드롭다운 */}
            <select 
              value={sortBy}
              onChange={(e) => handleSort(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 bg-white"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 2-2. 글 목록 */}
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div 
              key={item}
              className="border p-4 rounded hover:shadow-lg cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold">게시글 제목</h3>
                <span className="text-sm text-gray-500">2024.01.19</span>
              </div>
              <p className="text-gray-600 mt-2 line-clamp-2">
                게시글 내용이 여기에 들어갑니다. 너무 길면 2줄까지만 표시됩니다... 게시글 내용이 여기에 들어갑니다. 너무 길면 2줄까지만 표시됩니다... 게시글 내용이 여기에 들어갑니다. 너무 길면 2줄까지만 표시됩니다... 게시글 내용이 여기에 들어갑니다. 너무 길면 2줄까지만 표시됩니다...
              </p>
              <div className="flex gap-4 mt-2 text-sm text-gray-500">
                <span>작성자: 홍길동</span>
                <span>댓글: 5</span>
                <span>좋아요: 10</span>
                <span>조회수: 100</span>
              </div>
            </div>
          ))}
        </div>

        {/* 2-3. 페이지네이션 */}
        <div className="flex justify-center mt-8 gap-2">
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className="w-8 h-8 rounded-full hover:bg-[#bc5b39] hover:text-white"
            >
              {page}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CommunityPage;
