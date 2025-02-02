import ArticleList from "./articleList";
import CommunityLeftNav from "./components/communityLeftNav";

const community = () => {
  return (
    <div className="flex">
      <CommunityLeftNav />
      <ArticleList />
    </div>
  );
};

export default community;
