import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import likeDocsService from "../../services/likeDocsService";
import ListRender from "../../../../components/pagination/listRender";
import likeDocsStore from "../../store/likeDocsStore";

import like from "../../../../assets/icon/heartFilled24.png";
import likeCancel from "../../../../assets/icon/heartEmpty24.png";

const LikeDocsPage = () => {
  const token = localStorage.getItem("token");

  const docs = likeDocsStore((state) => state.docs);
  const setDocs = likeDocsStore((state) => state.setDocs);

  const setLoading = likeDocsStore((state) => state.setLoading);
  const setError = likeDocsStore((state) => state.setError);

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(15);
  const [totalPages, setTotalPages] = useState(1);
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchTranslations = async () => {
      try {
        if (token) {
          const decoded = jwtDecode(token);
          const userId = decoded.userId;

          const data = await likeDocsService.fetchDocs(userId);

          if (data.length > 0) {
            setDocs(data);
          }
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTranslations();
  }, [token]);

  // 페이지네이션 관련 상태들을 하나의 useEffect로 통합
  useEffect(() => {
    if (docs.length > 0) {
      const startIndex = currentPage * itemsPerPage;
      const endIndex = Math.min(startIndex + itemsPerPage, docs.length);
      const newTotalPages = Math.ceil(docs.length / itemsPerPage);

      setTotalPages(newTotalPages);
      setCurrentData(docs.slice(startIndex, endIndex));
    }
  }, [docs, currentPage, itemsPerPage]);

  const renderDocs = (item) => (
    <div className="flex justify-between text-lg px-3">
      <div className="flex-1 min-w-0 mr-3 font-semibold line-clamp-1 break-all">
        <Link
          // TODO: Link 경로 수정 필요
          to={`/translation/${item.docsId}`}
          className="text-[#7d7c77] hover:text-[#bc5b39]"
        >
          {item.documentName}
        </Link>
      </div>
      <div className="flex space-x-6">
        <p className="whitespace-nowrap">{item.position}</p>
        <button>
          <img
            src={like} // TODO: 좋아요 취소 시 likeCancel 아이콘으로 변경 가능한 로직 필요
            alt="좋아요 아이콘"
            className="w-6 h-6 cursor-pointer"
          />
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-10 bg-white rounded-bl-xl rounded-br-xl border-b border-l border-r border-[#E1E1DF] text-[#7D7C77]">
      <ListRender
        data={currentData}
        renderItem={renderDocs}
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemCategory="docs"
      />
    </div>
  );
};
export default LikeDocsPage;
