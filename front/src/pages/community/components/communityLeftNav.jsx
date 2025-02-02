const CommunityLeftNav = () => {
  return (
    //   1. 좌측 네비게이션
    <div>
      <nav className="w-[240px] min-h-screen bg-[#F8F8F7] p-4">
        <ul className="space-y-2">
          <li className="cursor-pointer p-2 hover:bg-[#bc5b39] hover:text-white rounded">
            전체
          </li>
          <li className="cursor-pointer p-2 hover:bg-[#bc5b39] hover:text-white rounded">
            질문
          </li>
          <li className="cursor-pointer p-2 hover:bg-[#bc5b39] hover:text-white rounded">
            정보
          </li>
          <li className="cursor-pointer p-2 hover:bg-[#bc5b39] hover:text-white rounded">
            자유
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default CommunityLeftNav;
