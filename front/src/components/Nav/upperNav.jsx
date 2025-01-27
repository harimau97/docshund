import PropTypes from "prop-types";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import notification from "../../assets/icon/notification.png";
import SampleProfileImg from "../../assets/sample_profile_image.png";
import RectBtn from "../button/rectBtn";

const UpperNav = ({ loginStatus }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const activeLink =
    "relative inset-[-16.67%] w-fit h-[133.33%] flex items-center justify-center text-center font-bold text-[20px] tracking-[0.2px] text-[#bc5b39]";
  const inactiveLink =
    "relative inset-[-16.67%] w-fit h-[133.33%] flex items-center justify-center text-center text-[20px] tracking-[0.2px] text-[#424242]";

  return (
    <div className=" bg-[#f0eee5] pl-[120px] pr-[64px] py-[22px] flex flex-row items-center justify-between relative shadow-[0px_-1px_1px_0px_rgba(0, 0, 0, 0.10)]">
      <NavLink to="/">
        <img
          className="shrink-0 w-[196px] h-[82px] relative object-cover"
          src={logo}
          alt="로고 이미지"
        />
      </NavLink>
      <div className="flex flex-row items-center justify-between shrink-0 w-[40%] relative">
        <div className="shrink-0 w-fit h-[18px] relative">
          {location.pathname === "/" ? (
            <div className={activeLink}>
              <NavLink to="/">홈</NavLink>
            </div>
          ) : (
            <div className={inactiveLink}>
              <NavLink to="/">홈</NavLink>
            </div>
          )}
        </div>
        <div className="shrink-0 w-fit h-[18px] relative">
          {location.pathname === "/translate" ? (
            <div className={activeLink}>
              <NavLink to="/translate">번역문서</NavLink>
            </div>
          ) : (
            <div className={inactiveLink}>
              <NavLink to="/translate">번역문서</NavLink>
            </div>
          )}
        </div>
        <div className="shrink-0 w-fit h-[18px] relative">
          {location.pathname === "/community" ? (
            <div className={activeLink}>
              <NavLink to="/community">커뮤니티</NavLink>
            </div>
          ) : (
            <div className={inactiveLink}>
              <NavLink to="/community">커뮤니티</NavLink>
            </div>
          )}
        </div>
        <div className="shrink-0 w-fit h-[18px] relative">
          {location.pathname === "/helpDesk" ? (
            <div className={activeLink}>
              <NavLink to="/helpDesk">헬프데스크</NavLink>
            </div>
          ) : (
            <div className={inactiveLink}>
              <NavLink to="/helpDesk">헬프데스크</NavLink>
            </div>
          )}
        </div>
      </div>
      {/* 로그인 되어 있을 경우 알림아이콘, 로그아웃 버튼, 프로필 이미지 표시, 반대는 로그인 버튼만 표시 */}
      <div className="rounded-[5px] flex flex-row gap-[20px] items-center justify-start shrink-0 relative">
        {loginStatus ? (
          <div>
            <img
              className="cursor-pointer"
              src={notification}
              alt="알림 아이콘"
            />
          </div>
        ) : null}

        {loginStatus ? (
          <RectBtn onClick={() => {}} text="로그아웃" />
        ) : (
          <RectBtn onClick={() => {}} text="로그인" />
        )}

        {loginStatus ? (
          // 프로필 이미지를 누르면 마이페이지로 navigate
          <img
            onClick={() => {
              navigate("/myPage");
            }}
            className="box-border w-[64px] h-[64px] relative object-cover cursor-pointer"
            src={SampleProfileImg}
          />
        ) : null}
      </div>
    </div>
  );
};

UpperNav.propTypes = {
  loginStatus: PropTypes.bool.isRequired,
};

export default UpperNav;
