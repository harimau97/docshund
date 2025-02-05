import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import TmpBestData from "../store/tmpBestData";
import TmpTranslateData from "../store/tmpTranslateData";
import TmpDocsList from "../store/tmpDocsList";
import useEditorStore from "../store/editorStore";
import useDocsStore from "../store/docsStore";

// const baseUrl = "http://localhost:8080/api/v1/docshund/docs";
const baseUrl = "http://i12a703.p.ssafy.io:8081/api/v1/docshund/docs";

export const fetchDocsList = async (test) => {
  try {
    if (!test) {
      const response = await axios.get(`${baseUrl}`);
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

export const fetchTranslateData = async (docsId, test) => {
  try {
    if (!test) {
      const response = await axios.get(`${baseUrl}/${docsId}/origin`);
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

export const fetchBestTranslate = async (docsId, isBest, test) => {
  const status = isBest ? "best" : "";
  try {
    if (!test) {
      console.log("번역데이터 가져오기 시작");
      const response = await axios.get(
        `${baseUrl}/${docsId}/trans?status=${status}`
      );
      const data = response.data;
      return data;
    } else {
      return TmpBestData.transList;
    }
  } catch (error) {
    console.log(error);
    return null;
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
