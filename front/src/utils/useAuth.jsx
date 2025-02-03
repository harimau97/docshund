import { useNavigate } from "react-router-dom";
import useModalStore from "../store/modalStore";

// 인증 상태를 관리하는 함수
const useAuth = () => {
  const navigate = useNavigate();
  const { openModal, closeModal } = useModalStore();

  // 사용자 인증 상태 확인
  const isUserAuthenticated = () => {
    const token = localStorage.getItem("jwtToken");
    return token ? true : false;
  };

  //로그인
  const login = (token) => {
    localStorage.setItem("jwtToken", token); // 로컬스토리지에 토큰 저장
    closeModal(); // 모달 닫기
    navigate("/"); // 로그인 후 홈 페이지로 리디렉션
  };

  // 로그아웃
  const logout = () => {
    localStorage.removeItem("jwtToken"); // 로컬스토리지에서 토큰 삭제
    navigate("/");
  };

  // 네비게이션 가드
  const navigateGuard = (nextPath) => {
    if (!isUserAuthenticated()) {
      openModal();
    } else {
      navigate(nextPath);
    }
  };

  return { isUserAuthenticated, login, logout, navigateGuard };
};

export default useAuth;
