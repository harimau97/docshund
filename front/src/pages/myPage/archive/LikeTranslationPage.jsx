import { Link } from "react-router-dom";
import likeTranslationStore from "../stores/likeTranslationStore";
import ListRender from "../components/ListRender";
import like from "../../../assets/icon/heartFilled24.png";
import likeCancel from "../../../assets/icon/heartEmpty24.png";

const LikeTranslationPage = () => {
  const translations = likeTranslationStore((state) => state.translations);

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
        <p className="whitespace-nowrap">{item.nickname}</p>
        <p className="whitespace-nowrap">{item.createdAt}</p>
        <button>
          <img
            src={item.liked ? like : likeCancel} // liked 상태에 따라 아이콘 변경
            alt="좋아요 아이콘"
            className="w-6 h-6 cursor-pointer"
          />
        </button>
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
export default LikeTranslationPage;
