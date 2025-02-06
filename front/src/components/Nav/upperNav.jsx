import { NavLink, useLocation, useNavigate } from "react-router-dom";
import RectBtn from "../button/rectBtn";
import useModalStore from "../../store/modalStore";
import useAuth from "../../utils/useAuth";
import logo from "../../assets/logo.png";
import notification from "../../assets/icon/notification32.png";
import SampleProfileImg from "../../assets/sample_profile_image.png";

const UpperNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { openModal } = useModalStore();

  // 로그인 버튼 동작
  const handleLoginClick = () => {
    if (isAuthenticated()) {
      logout(); // 로그인 상태일 때 로그아웃 처리
    } else {
      openModal(); //로그인 모달 열기
    }
  };

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
          <NavLink
            to="/"
            className={location.pathname === "/" ? activeLink : inactiveLink}
          >
            홈
          </NavLink>
          <NavLink
            to="/translate"
            className={
              location.pathname.startsWith("/translate")
                ? activeLink
                : inactiveLink
            }
          >
            번역문서
          </NavLink>
          <NavLink
            to="/community"
            className={
              location.pathname.startsWith("/community")
                ? activeLink
                : inactiveLink
            }
          >
            커뮤니티
          </NavLink>
          <NavLink
            to="/helpDesk"
            className={
              location.pathname.startsWith("/helpDesk")
                ? activeLink
                : inactiveLink
            }
          >
            헬프데스크
          </NavLink>
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
              onClick={() => navigate("/myPage/profile")}
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
