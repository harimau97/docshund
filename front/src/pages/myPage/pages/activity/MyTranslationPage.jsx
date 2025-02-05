import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import TranslationStore from "../../store/translationStore";
import MyTranslationService from "../../services/myTranslationService";
import ListRender from "../../../../components/pagination/listRender";
import like from "../../../../assets/icon/heartFilled24.png";

const MyTranslationPage = () => {
  // store에서 데이터를 가져오기 위해 store의 상태 정의
  const translations = TranslationStore((state) => state.translations);

  // set(메소드) 정의
  const setTranslations = TranslationStore((state) => state.setTranslations);
  const setLoading = TranslationStore((state) => state.setLoading);
  const setError = TranslationStore((state) => state.setError);

  const [userId] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [totalPages, setTotalPages] = useState(1);
  const [currentData, setCurrentData] = useState([]);

  // translations 데이터를 가져오는 useEffect
  useEffect(() => {
    setLoading(true);
    const fetchTranslations = async () => {
      try {
        const data = await MyTranslationService.fetchTranslations(userId);
        if (data.length > 0) {
          setTranslations(data);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTranslations();
  }, [userId]);

  // 페이지네이션 관련 상태들을 하나의 useEffect로 통합
  useEffect(() => {
    if (translations.length > 0) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = Math.min(startIndex + itemsPerPage, translations.length);
      const newTotalPages = Math.ceil(translations.length / itemsPerPage);

      setTotalPages(newTotalPages);
      setCurrentData(translations.slice(startIndex, endIndex));
    }
  }, [translations, currentPage, itemsPerPage]);

  const renderTranslation = (item) => (
    <div className="flex justify-between text-lg px-3">
      <div className="flex-1 min-w-0 mr-3 font-semibold line-clamp-1 break-all">
        <Link
          to={`/translation/${item.docsId}`}
          className="text-[#7d7c77] hover:text-[#bc5b39]"
        >
          {item.documentName} {item.pOrder}번째 문단 번역본
        </Link>
      </div>
      <div className="flex space-x-6">
        <p className="whitespace-nowrap">{item.createdAt}</p>
        <div className="flex items-center">
          <img className="mr-3" src={like} alt="좋아요수 아이콘" />
          <p className="w-8 text-right">{item.likeCount}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <ListRender
        data={currentData}
        renderItem={renderTranslation}
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemCategory={"trans"}
      />
    </div>
  );
};

export default MyTranslationPage;
