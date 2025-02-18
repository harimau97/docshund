import {
  axiosJsonInstance,
  axiosMultipartInstance,
} from "../../../utils/axiosInstance";

const userProfileService = {
  // 프로필 데이터 가져오기
  async fetchProfile(userId) {
    try {
      const response = await axiosJsonInstance.get(`users/profile/${userId}`);
      return response.data;
    } catch (error) {
      console.error("프로필 데이터를 가져오는 중 오류 발생:", error);
      return null;
    }
  },

  // 닉네임 중복 체크
  async checkNickname(nickname, currentNickname) {
    if (nickname === "멍멍이") {
      return false;
    }
    if (nickname === currentNickname) {
      return true;
    }
    try {
      const response = await axiosJsonInstance.get(
        `/users/profile?nickname=${encodeURIComponent(nickname)}`
      );
      if (response.data === "사용 가능한 닉네임입니다.") {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("닉네임 중복 체크 중 오류 발생:", error);
      return false;
    }
  },

  // 프로필 업데이트
  async updateProfile(userId, formData) {
    const response = await axiosMultipartInstance.patch(
      `/users/profile/${userId}`,
      formData
    );
    return response.data;
  },

  // 계정 탈퇴
  async deleteAccount() {
    try {
      const response = await axiosJsonInstance.get(`/users/leaving`);
      return response.status === 200;
    } catch (error) {
      console.error("계정 탈퇴 중 오류 발생:", error);
      return false;
    }
  },
};

export default userProfileService;
