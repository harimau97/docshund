import axios from "axios";

const baseUrl = "https://69889664-709b-4f94-96d0-9ed9a4216ee0.mock.pstmn.io"; // 실제 API 주소로 변경

const memoService = {
  // 메모 목록 가져오기
  async fetchMemos(userId, page = 1, size = 10) {
    try {
      const response = await axios.get(
        `${baseUrl}/users/${userId}/memo?page=${page}&size=${size}&order=desc`
      );
      return response.data;
    } catch (error) {
      console.error("메모 목록을 가져오는 중 오류 발생:", error);
      return null;
    }
  },

  // 특정 메모 가져오기
  async fetchMemo(userId, memoId) {
    try {
      const response = await axios.get(
        `${baseUrl}/users/${userId}/memo/${memoId}`
      );
      return response.data;
    } catch (error) {
      console.error("메모를 가져오는 중 오류 발생:", error);
      return null;
    }
  },

  // 새로운 메모 생성하기
  async createMemo(userId, memoData) {
    try {
      const response = await axios.post(
        `${baseUrl}/users/${userId}/memo`,
        memoData
      );
      return response.data;
    } catch (error) {
      console.error("메모를 생성하는 중 오류 발생:", error);
      return null;
    }
  },

  // 메모 업데이트하기
  async updateMemo(userId, memoId, memoData) {
    try {
      const response = await axios.patch(
        `${baseUrl}/users/${userId}/memo/${memoId}`,
        memoData
      );
      return response.data;
    } catch (error) {
      console.error("메모를 업데이트하는 중 오류 발생:", error);
      return null;
    }
  },

  // 메모 삭제하기
  async deleteMemo(userId, memoId) {
    try {
      await axios.delete(`${baseUrl}/users/${userId}/memo/${memoId}`);
    } catch (error) {
      console.error("메모를 삭제하는 중 오류 발생:", error);
    }
  },
};

export default memoService;
