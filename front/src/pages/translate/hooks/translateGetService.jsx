import { axiosJsonInstance } from "../../../utils/axiosInstance";
import PropTypes from "prop-types";
import TmpTranslateData from "../store/tmpTranslateData";
import TmpDocsList from "../store/tmpDocsList";
import useArchiveStore from "../store/archiveStore";
import useDocsStore from "../store/docsStore";

const baseUrl = "http://i12a703.p.ssafy.io:8081/api/v1/docshund/docs";

// 좋아요한 문서 조회
export const fetchLikedList = async (docsId) => {
  try {
    const response = await axiosJsonInstance.get(`${baseUrl}/${docsId}/likes`);
    const data = response.data;
    return data;
  } catch (error) {
    console.log("좋아요한 문서 조회 실패", error);
  }
};

// 문서 리스트 조회
export const fetchDocsList = async (test) => {
  try {
    if (!test) {
      const response = await axiosJsonInstance.get(`${baseUrl}`);
      const data = response.data;
      useDocsStore.setState({ docsList: data });
    } else {
      const data = TmpDocsList.docsList;
      useDocsStore.setState({ docsList: data });
    }
  } catch (error) {
    console.log(error);
  }
};

// 영어 원문 조회
export const fetchTranslateData = async (docsId, test) => {
  try {
    console.log(docsId, test);
    if (!test) {
      const response = await axiosJsonInstance.get(
        `${baseUrl}/${docsId}/origin`
      );
      const data = response.data;
      return data;
    } else {
      const tempContent = TmpTranslateData.transData;
      return tempContent;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 베스트 번역본 조회
export const fetchBestTranslate = async (docsId, isBest) => {
  const status = isBest ? "best" : "";
  try {
    if (isBest === "best") {
      const response = await axiosJsonInstance.get(
        `${baseUrl}/${docsId}/trans?status=${status}`
      );
      const data = response.data;
      console.log(data);
      return data;
    } else {
      const response = await axiosJsonInstance.get(
        `${baseUrl}/${docsId}/trans?status=${status}`
      );
      const data = response.data;
      return data;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 좋아요한 번역본 조회
export const fetchLikedTranslateList = async (userId) => {
  try {
    const response = await axiosJsonInstance.get(`${baseUrl}/trans/votes`, {
      params: { userId: userId },
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.log("좋아요 번역 조회 실패", error);
  }
};

fetchTranslateData.propTypes = {
  docsId: PropTypes.string.isRequired,
  originId: PropTypes.string,
  test: PropTypes.bool.isRequired,
};

fetchBestTranslate.propTypes = {
  docsId: PropTypes.string.isRequired,
  isBest: PropTypes.bool.isRequired,
  originId: PropTypes.string.isRequired,
  test: PropTypes.bool.isRequired,
};
