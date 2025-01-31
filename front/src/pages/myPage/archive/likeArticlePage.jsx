import { Link } from "react-router-dom";
import likeArticleStore from "../stores/likeArticleStore";
import ListRender from "../components/ListRender";
import like from "../../../assets/icon/heartFilled24.png";
import likeCancel from "../../../assets/icon/heartEmpty24.png";

const LikeArticlePage = () => {
  const articles = likeArticleStore((state) => state.articles);

  const renderArticle = (item) => (
    <div className="flex justify-between text-lg px-3">
      <div className="flex-1 min-w-0 mr-3 flex flex-col justify-between">
        <Link
          to={`/article/${item.id}`}
          className="font-semibold line-clamp-1 break-all text-[#7d7c77] hover:text-[#bc5b39]"
        >
          {item.title}
        </Link>
        <p className="text-base line-clamp-1 break-all">{item.content}</p>
      </div>
      <div className="flex space-x-6 items-center">
        <p>{item.createAt}</p>
        <p>{item.nickname}</p>
        <button onClick={() => handleLikeToggle(item)}>
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
        data={articles}
        renderItem={renderArticle}
        itemsPerPage={15}
      />
    </div>
  );
};

export default LikeArticlePage;
