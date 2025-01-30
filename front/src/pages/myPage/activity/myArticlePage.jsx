import { Link } from "react-router-dom";
import myArticleStore from "../stores/myArticleStore";
import ListRender from "../components/ListRender";
import like from "../../../assets/icon/heartFilled24.png";
import view from "../../../assets/icon/viewCnt.png";
import comment from "../../../assets/icon/commentCnt.png";

const MyArticlePage = () => {
  const articles = myArticleStore((state) => state.articles);

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
        <p className="text-base">{item.createAt}</p>
      </div>
      <div className="flex space-x-6 items-bottom">
        <p className="self-end">{item.nickname}</p>
        <div className="flex flex-col justify-between">
          <div className="flex items-center">
            <img className="mr-2" src={like} alt="좋아요수 아이콘" />
            <p className="w-8 text-right">{item.likesCnt}</p>
          </div>
          <div className="flex items-center">
            <img className="mr-2" src={view} alt="조회수 아이콘" />
            <p className="w-8 text-right">{item.viewCnt}</p>
          </div>
          <div className="flex items-center">
            <img className="mr-2" src={comment} alt="댓글수 아이콘" />
            <p className="w-8 text-right">{item.commentCnt}</p>
          </div>
        </div>
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

export default MyArticlePage;
