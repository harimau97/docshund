import { axiosJsonInstance } from "../../../utils/axiosInstance";

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

  // 프로필 업데이트
  async updateProfile(updatedProfile) {
    try {
      const response = await axiosJsonInstance.patch(
        `/users/profile/${updatedProfile.userId}`,
        updatedProfile
      );

      //test
      console.log(updatedProfile);

      return response.status;
    } catch (error) {
      console.error("프로필 데이터를 업데이트하는 중 오류 발생:", error);
      return null;
    }
  },
};

export default userProfileService;
