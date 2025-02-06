import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import logo from "../assets/logo.png";
import google from "../assets/google.png";
import github from "../assets/github.png";
import useAuth from "../utils/useAuth";
import useAuthStore from "../store/authStore";
import useModalStore from "../store/modalStore";

const LoginModal = () => {
  const { isModalOpen, closeModal } = useModalStore();
  const { loginWithGoogle, loginWithGithub } = useAuth();
  const { setToken } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    // 로그인 후 리다이렉트된 URL에서 토큰을 추출하는 부분
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get("token");

    if (urlToken) {
      setToken(urlToken);
      localStorage.setItem("token", urlToken);
      const decodedToken = jwtDecode(urlToken);
      const userId = decodedToken.userId;
      localStorage.setItem("userId", userId);
      closeModal();
      navigate("/"); // 로그인 후 홈으로 리다이렉트
    }
  }, [navigate, closeModal, setToken]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 backdrop-brightness-60 ${
        !isModalOpen ? "hidden" : ""
      } `}
      onClick={closeModal}
    >
      <div
        className="flex flex-col gap-9 bg-[#FAF9F5] border2 border-[#E1E1DF] p-6 rounded-lg w-1/2 h-auto max-w-120"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 로그인창 닫기 */}
        <div className="flex items-center justify-end">
          <button
            className="font-bold text-4xl text-[#BC5B39] cursor-pointer"
            onClick={closeModal}
          >
            &times;
          </button>
        </div>
        {/* 로고 */}
        <div className="flex items-center justify-center">
          <img src={logo} alt="Logo" className="w-8/10" />
        </div>
        {/* 소셜로그인 */}
        <div className="flex flex-col items-center mt-4 mb-4">
          <div
            className="flex items-center justify-center w-8/10 p-2 bg-[#BC5B39] rounded-[15px] border-3 border-[#C96442] hover:bg-[#C96442] mb-4"
            onClick={loginWithGoogle}
          >
            <img src={google} alt="google" className="mr-4" />
            <button className="text-[#FAF9F5] text-sm cursor-pointer">
              Sign in with Google
            </button>
          </div>
          <div
            className="flex items-center justify-center w-8/10 p-2 bg-[#BC5B39] rounded-[15px] border-3 border-[#C96442] hover:bg-[#C96442]"
            onClick={loginWithGithub}
          >
            <img src={github} alt="github" className="mr-4" />
            <button className=" text-[#FAF9F5] text-sm cursor-pointer">
              Sign in with GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
