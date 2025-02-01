import { Outlet } from "react-router-dom";
import useTabs from "./hooks/useTabs";
import Tabs from "./components/Tabs";

const ArchivePage = () => {
  const tabs = [
    { id: "likeTrans", label: "번역본", path: "/archive/likeTrans" },
    { id: "likeArticle", label: "게시글", path: "/archive/likeArticle" },
    { id: "likeDocs", label: "문서", path: "/archive/likeDocs" },
  ];

  const { activeTab, handleTabChange } = useTabs(tabs);

  return (
    <div>
      <div className="flex justify-between mt-5 mb-5">
        <h1 className="font-bold text-2xl">보관함</h1>
      </div>
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
      <Outlet />
    </div>
  );
};

export default ArchivePage;
