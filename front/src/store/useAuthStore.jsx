import { create } from "zustand";
import axios from "axios";

const useAuthStore = create((set) => ({
  token: null,
  isLoading: false,
  error: null,

  // 구글 로그인
  loginWithGoogle: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        "http://localhost:8080/oauth2/callback/google",
        {
          withCredentials: true,
        }
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      set({ token, isLoading: false });
      console.log("JWT Token 저장 완료:", token);
    } catch (error) {
      set({ error: "구글 로그인 실패", isLoading: false });
      console.error("구글 로그인 요청 실패:", error);
    }
  },

  // GitHub 로그인
  loginWithGithub: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        "http://localhost:8080/oauth2/callback/github",
        {
          withCredentials: true,
        }
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      set({ token, isLoading: false });
      console.log("JWT Token 저장 완료:", token);
    } catch (error) {
      set({ error: "GitHub 로그인 실패", isLoading: false });
      console.error("GitHub 로그인 요청 실패:", error);
    }
  },
}));

export default useAuthStore;
