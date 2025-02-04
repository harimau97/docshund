import axios from "axios";
import PropTypes from "prop-types";
import TmpBestData from "../store/tmpBestData";
import useEditorStore from "../store/editorStore";
import useDocsStore from "../store/docsStore";

const baseUrl = "https://f1887553-e372-4944-90d7-8fe76ae8d764.mock.pstmn.io";

export const fetchDocsList = async () => {
  try {
    const response = await axios.get(`${baseUrl}/docs?sort=name&order=asc`);
    const data = response.data;
    useDocsStore.setState({ docsList: data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchTranslateData = async (docsId, originId, test) => {
  console.log("데이터 fetching 시작");
  try {
    if (!test) {
      const response = await axios.get(
        `${baseUrl}/docs/${docsId}/origin?originId=${originId}`
      );
      const data = response.data;
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchBestTranslate = async (
  docsId,
  originId,
  sortType,
  size,
  page,
  test
) => {
  try {
    if (!test) {
      const response = await axios.get(
        `${baseUrl}/docs/${docsId}/trans/${originId}?sort=${sortType}&order=desc&size=${size}&page=${page}`
      );
      const data = response.data;
      if (size === 1) {
        const tempContent = data[0];
        if (tempContent.originId === originId) {
          console.log(tempContent);
          useEditorStore.setState({
            bestTrans: tempContent.content,
          });
        }
      }
      return data;
    } else {
      if (size === 1) {
        const tempContent = TmpBestData.transList[0];
        if (tempContent.originId === originId) {
          console.log(tempContent);
          useEditorStore.setState({
            bestTrans: tempContent.content,
          });
        }
      }
      console.log(TmpBestData.transList);
      return TmpBestData.transList;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

fetchTranslateData.propTypes = {
  docsId: PropTypes.string.isRequired,
  originId: PropTypes.string.isRequired,
  test: PropTypes.bool.isRequired,
};

fetchBestTranslate.propTypes = {
  docsId: PropTypes.string.isRequired,
  originId: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  test: PropTypes.bool.isRequired,
};
