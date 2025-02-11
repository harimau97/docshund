import { axiosJsonInstance } from "../../../utils/axiosInstance";
import PropTypes from "prop-types";
import axios from "axios";
const baseUrl = "http://i12a703.p.ssafy.io:8081/api/v1/docshund";

// 좋아요한 문서 조회
export const withdrawReport = async (reportId) => {
  try {
    const response = await axiosJsonInstance.post(
      `${baseUrl}/supports/reports/${reportId}/withdraw`
    );
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log("신고 취소 처리 실패", error);
  }
};

export const registDocument = async (documentData) => {
  try {
    const response = await axiosJsonInstance.post(
      `${baseUrl}/docs`,
      documentData
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.log("문서 등록 실패", error);
  }
};

export const registDocumentContent = async (docsId, originDocumentData) => {
  const formData = new URLSearchParams();
  formData.append("content", originDocumentData);
  try {
    const response = await axios.post(
      `${baseUrl}/docs/${docsId}/origin`,
      formData, // body 데이터
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.log("문서 원본 업로드 실패", error);
  }
};
