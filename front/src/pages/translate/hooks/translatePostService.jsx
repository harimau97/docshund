import axiosInstance from "../../../utils/axiosInstance";
import PropTypes from "prop-types";
import TmpBestData from "../store/tmpBestData";
import TmpTranslateData from "../store/tmpTranslateData";
import TmpDocsList from "../store/tmpDocsList";
import useArchiveStore from "../store/archiveStore";
import useDocsStore from "../store/docsStore";

const baseUrl = "http://i12a703.p.ssafy.io:8081/api/v1/docshund/docs";

export const likeDocs = async (docsId) => {
  try {
    const response = await axiosInstance.post(`${baseUrl}/${docsId}/likes`);
    console.log(response.data);
  } catch (error) {
    console.log("문서 좋아요 실패", error);
  }
};

export const likeTranslate = async (docsId) => {
  try {
    const response = await axiosInstance.post(`${baseUrl}/${docsId}/likes`);
    console.log(response.data);
  } catch (error) {
    console.log("번역 좋아요 실패", error);
  }
};

export const registTranslate = async (docsId, originId) => {
  try {
    const response = await axiosInstance.post(
      `${baseUrl}/${docsId}/trans/${originId}`,
      {}
    );
    console.log(response.data);
  } catch (error) {
    console.log("번역 등록 실패", error);
  }
};
