import { Link } from "react-router-dom";
import likeDocsStore from "../../store/likeDocsStore";
import ListRender from "../../components/ListRender";
import like from "../../../../assets/icon/heartFilled24.png";
import likeCancel from "../../../../assets/icon/heartEmpty24.png";

const LikeDocsPage = () => {
  const docs = likeDocsStore((state) => state.docs);

  const renderDocs = (item) => (
    <div className="flex justify-between text-lg px-3">
      <div className="flex-1 min-w-0 mr-3 font-semibold line-clamp-1 break-all">
        <Link
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
            src={item.liked ? like : likeCancel}
            alt="좋아요 아이콘"
            className="w-6 h-6 cursor-pointer"
          />
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <ListRender data={docs} renderItem={renderDocs} itemsPerPage={15} />
    </div>
  );
};
export default LikeDocsPage;
