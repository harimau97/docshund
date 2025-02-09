import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import RectBtn from "../button/rectBtn";
import useModalStore from "../../store/modalStore";
import authService from "../../services/authService";
import logo from "../../assets/logo.png";
import notification from "../../assets/icon/notification32.png";
import SampleProfileImg from "../../assets/sample_profile_image.png";

import communityArticleStore from "../../store/communityStore/communityArticleStore";
import { set } from "date-fns";

const UpperNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = authService();
  const [isAdmin, setIsAdmin] = useState(false);
  const { openModal } = useModalStore();

  // 게시글 작성 페이지로 이동 시 페이지 초기화
  const setCurrentPage = communityArticleStore((state) => state.setCurrentPage);
  const setSortType = communityArticleStore((state) => state.setSortType);
  const setKeyword = communityArticleStore((state) => state.setKeyword);
  const setCategory = communityArticleStore((state) => state.setCategory);

  // 로그인 버튼 동작
  const handleLoginClick = () => {
    if (isAuthenticated()) {
      logout(); // 로그인 상태일 때 로그아웃 처리
    } else {
      openModal(); //로그인 모달 열기
    }
  };

  const handleImageClick = () => {
    if (isAuthenticated() && isAdmin) {
      navigate("/admin/manageUser");
    } else if (isAuthenticated() && !isAdmin) {
      navigate("/myPage/profile");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role;
      console.log(role);
      if (role === "ROLE_ADMIN") setIsAdmin(true); // 로그인 상태와 관리자 여부를 판단
    }
  }, [localStorage.getItem("token")]);

  // 링크 스타일
  const activeLink = "font-bold text-[clamp(16px,1.5vw,20px)] text-[#bc5b39]";
  const inactiveLink =
    "text-[clamp(16px,1.5vw,20px)] text-[#424242] hover:text-[#bc5b39]";

  return (
    <div className="bg-[#f0eee5] flex justify-center px-9 py-3 shadow-[0px_-1px_1px_0px_rgba(0, 0, 0, 0.10)]">
      <div className="w-full max-w-screen-xl mx-auto gap-3 flex items-center justify-between">
        {/* 로고 */}
        <NavLink to="/">
          <img
            className="w-[clamp(120px,10vw,148px)] h-auto"
            src={logo}
            alt="로고 이미지"
          />
        </NavLink>
        {/* 내비게이션 메뉴 */}
        <div className="flex w-2/4 justify-between">
          <div
            onClick={() => navigate("/")}
            className={`cursor-pointer ${
              location.pathname === "/" ? activeLink : inactiveLink
            }`}
          >
            홈
          </div>
          <div
            onClick={() => navigate("/translate")}
            className={`cursor-pointer ${
              location.pathname.startsWith("/translate")
                ? activeLink
                : inactiveLink
            }`}
          >
            번역문서
          </div>
          <div
            onClick={() => {
              setCurrentPage(0); // 페이지 초기화
              setSortType("latest"); // 최신순 정렬
              setKeyword(""); // 검색어 초기화
              setCategory(""); // 카테고리 초기화
              navigate("/community");
            }}
            className={`cursor-pointer ${
              location.pathname.startsWith("/community")
                ? activeLink
                : inactiveLink
            }`}
          >
            커뮤니티
          </div>
          <div
            onClick={() => navigate("/helpDesk")}
            className={`cursor-pointer ${
              location.pathname.startsWith("/helpDesk")
                ? activeLink
                : inactiveLink
            }`}
          >
            헬프데스크
          </div>
        </div>
        {/* 로그인 여부에 따라 표시되는 요소 */}
        <div className="flex items-center gap-4">
          {isAuthenticated() && (
            <img
              className="w-[clamp(20px,2.1vw,32px)] h-auto cursor-pointer"
              src={notification}
              alt="알림 아이콘"
            />
          )}

          <RectBtn
            onClick={handleLoginClick}
            text={isAuthenticated() ? "로그아웃" : "로그인"}
          />

          {isAuthenticated() && (
            <img
              onClick={() => handleImageClick()}
              className="w-[clamp(40px,4vw,64px)] h-auto cursor-pointer"
              src={SampleProfileImg}
              alt="프로필 이미지"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UpperNav;
