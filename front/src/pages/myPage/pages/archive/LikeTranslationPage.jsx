import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import TranslationStore from "../../store/translationStore";
import ListRender from "../../../../components/pagination/listRender";
import like from "../../../../assets/icon/heartFilled24.png";
import likeCancel from "../../../../assets/icon/heartEmpty24.png";
import LikeTranslationService from "../../services/likeTranslationService";

const LikeTranslationPage = () => {
  const translations = TranslationStore((state) => state.translations);
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
        const data = await LikeTranslationService.fetchTranslations(userId);
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
          // TODO: Link 경로 수정 필요
          to={`/translation/${item.docsId}`}
          className="text-[#7d7c77] hover:text-[#bc5b39]"
        >
          {/* backend에서 api 수정 해줄 때까지는 빈 값이다.. */}
          {item.documentName} {item.pOrder}번째 문단 번역본
        </Link>
      </div>
      <div className="flex space-x-6">
        <p className="whitespace-nowrap">{item.nickname}</p>
        <p className="whitespace-nowrap">{item.createdAt}</p>
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
      {/* 공통 ListRender 적용 완료.*/}
      <ListRender
        data={currentData} // 현재 페이지에 보여줄 데이터
        renderItem={renderTranslation} // 렌더링할 아이템을 반환하는 함수
        totalPages={totalPages} // 전체 페이지 수
        currentPage={currentPage} // 현재 페이지
        setCurrentPage={setCurrentPage} // 현재 페이지 설정 함수
        itemCategory={"trans"} // 아이템 카테고리
      />
    </div>
  );
};
export default LikeTranslationPage;
