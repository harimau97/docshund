import { Link } from "react-router-dom";
import myTranslationStore from "../../store/myTranslationStore";
import ListRender from "../../components/ListRender";
import like from "../../../../assets/icon/heartFilled24.png";

const MyTranslationPage = () => {
  const translations = myTranslationStore((state) => state.translations);

  const renderTranslation = (item) => (
    <div className="flex justify-between text-lg px-3">
      <div className="flex-1 min-w-0 mr-3 font-semibold line-clamp-1 break-all">
        <Link
          to={`/translation/${item.transId}`}
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
        data={translations}
        renderItem={renderTranslation}
        itemsPerPage={15}
      />
    </div>
  );
};

export default MyTranslationPage;
