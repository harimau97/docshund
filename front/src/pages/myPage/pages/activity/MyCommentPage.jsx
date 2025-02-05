import { Link } from "react-router-dom";

import myCommentStore from "../../store/myCommentStore";
import ListRender from "../../components/ListRender";

const MyCommentPage = () => {
  const comments = myCommentStore((state) => state.comments);

  const renderComment = (item) => (
    <div className="flex justify-between text-lg px-3">
      <div className="flex-1 min-w-0 mr-3 font-semibold line-clamp-1 break-all">
        <Link
          to={`/article/${item.id}`}
          className="text-[#7d7c77] hover:text-[#bc5b39]"
        >
          {item.commentContent}
        </Link>
      </div>
      <p className="whitespace-nowrap">{item.createdAt}</p>
    </div>
  );

  return (
    <div>
      <ListRender
        data={comments}
        renderItem={renderComment}
        itemsPerPage={15}
      />
    </div>
  );
};

export default MyCommentPage;
