import { axiosJsonInstance } from "../../../utils/axiosInstance";
import PropTypes from "prop-types";
// const baseUrl = "http://i12a703.p.ssafy.io:8081/api/v1/docshund";
const baseUrl = "https://7243e4af-6c62-4494-bb0e-d5d500da1bff.mock.pstmn.io";

// 좋아요한 문서 조회
export const fetchUserList = async () => {
  try {
    const response = await axiosJsonInstance.get(`${baseUrl}/users`);
    const data = response.data;
    return data;
  } catch (error) {
    console.log("좋아요한 문서 조회 실패", error);
  }
};
