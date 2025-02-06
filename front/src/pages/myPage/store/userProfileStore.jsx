import { create } from "zustand";
import userProfileService from "../services/userProfileService";

const useUserProfileStore = create((set) => ({
  profile: null,
  isLoading: false,
  error: null,

  // 프로필 데이터 가져오기
  fetchProfile: async (userId) => {
    set({ isLoading: true, error: null });
    const data = await userProfileService.fetchProfile(userId);
    if (data) {
      set({ profile: data, isLoading: false });
    } else {
      set({ error: "프로필을 불러오는 데 실패했습니다.", isLoading: false });
    }
  },

  // 프로필 업데이트
  updateProfile: async (userId, formData) => {
    set({ isLoading: true, error: null });
    const status = await userProfileService.updateProfile(userId, formData);
    if (status) {
      const updatedProfile = JSON.parse(formData.get("profile"));
      set({ profile: updatedProfile, isLoading: false });
    } else {
      set({ error: "프로필 업데이트에 실패했습니다.", isLoading: false });
    }
  },
}));

export default useUserProfileStore;
