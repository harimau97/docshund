import { axiosJsonInstance } from "../../../utils/axiosInstance";
import PropTypes from "prop-types";
const baseUrl = "http://i12a703.p.ssafy.io:8081/api/v1/docshund";

// 좋아요한 문서 조회
export const fetchUserList = async () => {
  try {
    const response = await axiosJsonInstance.get(`${baseUrl}/users`);
    const data = response.data;
    return data;
  } catch (error) {
    console.log("유저 목록 조회 실패", error);
  }
};

export const fetchReportList = async (page, userId) => {
  try {
    const response = await axiosJsonInstance.get(
      `${baseUrl}/supports/reports?pageable=${page}&&userId=${userId}`
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.log("신고 목록 조회 실패", error);
  }
};
