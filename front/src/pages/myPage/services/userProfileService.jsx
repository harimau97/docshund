import axios from "axios";

const baseUrl = "https://69889664-709b-4f94-96d0-9ed9a4216ee0.mock.pstmn.io";

const userProfileService = {
  // 프로필 데이터 가져오기
  async fetchProfile(userId) {
    try {
      const response = await axios.get(`${baseUrl}/users/profile/${userId}`);
      return response.data;
    } catch (error) {
      console.error("프로필 데이터를 가져오는 중 오류 발생:", error);
      return null;
    }
  },

  // 프로필 업데이트
  async updateProfile(updatedProfile) {
    try {
      const response = await axios.patch(
        `${baseUrl}/users/profile/${updatedProfile.userId}`,
        updatedProfile
      );

      //test
      console.log(response);

      return response.status;
    } catch (error) {
      console.error("프로필 데이터를 업데이트하는 중 오류 발생:", error);
      return null;
    }
  },
};

export default userProfileService;
