import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { format, isSameDay } from "date-fns";
import ProfileCard from "./myPage/pages/ProfileCard";
import ListRender from "../components/pagination/listRender";
import userProfileService from "./myPage/services/userProfileService";
import MyArticleService from "./myPage/services/myArticleService";
import MyCommentService from "./myPage/services/myCommentService";
import MyTranslationService from "./myPage/services/myTranslationService";
import useUserActivityStore from "../store/userActivityStore";

const UserPage = () => {
  const { userId } = useParams();

  const {
    userProfile,
    articles,
    comments,
    translations,
    setUserProfile,
    setArticles,
    setComments,
    setTranslations,
    setLoading,
    setError,
  } = useUserActivityStore();

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [activeTab, setActiveTab] = useState("userTrans");

  const tabs = [
    { id: "userTrans", label: "번역본", path: "/translate/viewer" },
    { id: "userArticle", label: "게시글", path: "/community/article" },
    { id: "userComment", label: "댓글", path: "/community/article" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 유저 프로필 가져오기
        const profileData = await userProfileService.fetchProfile(userId);
        setUserProfile(profileData);

        // 유저 활동 데이터 (게시글, 댓글, 번역본)
        const articlesData = await MyArticleService.fetchArticles(userId, 0, 5);
        const commentsData = await MyCommentService.fetchComments(userId);
        const translationsData = await MyTranslationService.fetchTranslations(
          userId
        );

        setArticles(articlesData || []);
        setComments(commentsData || []);
        setTranslations(translationsData || []);
      } catch (err) {
        setError("데이터를 가져오는 중 오류가 발생했습니다." + err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [
    userId,
    setUserProfile,
    setArticles,
    setComments,
    setTranslations,
    setLoading,
    setError,
  ]);

  useEffect(() => {
    let data = [];
    if (activeTab === "userTrans") {
      data = translations || [];
    } else if (activeTab === "userArticle") {
      data = articles || [];
    } else if (activeTab === "userComment") {
      data = comments || [];
    }

    const startIndex = currentPage * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, data.length);
    setTotalPages(Math.ceil(data.length / itemsPerPage));
    setCurrentData(Array.isArray(data) ? data.slice(startIndex, endIndex) : []);
  }, [activeTab, translations, articles, comments, currentPage, itemsPerPage]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setCurrentPage(0);
  };

  const renderActivity = (item) => {
    const tab = tabs.find((tab) => tab.id === activeTab);
    let content;
    let itemId;

    if (activeTab === "userTrans") {
      content = `${item.documentName} ${item.pOrder}번째 문단 번역본`;
      itemId = item.docsId;
    } else if (activeTab === "userArticle") {
      content = item.title;
      itemId = item.articleId;
    } else if (activeTab === "userComment") {
      content = item.content;
      itemId = item.articleId;
    }

    return (
      <div className="flex justify-between text-lg px-3">
        <div className="flex-1 min-w-0 mr-3 font-semibold line-clamp-1 break-all">
          <Link
            to={`${tab.path}/${itemId}`}
            className="text-[#7d7c77] hover:text-[#bc5b39]"
          >
            {content}
          </Link>
        </div>
        <p className="whitespace-nowrap">
          {item?.createdAt
            ? isSameDay(new Date(item.createdAt), new Date())
              ? format(new Date(item.createdAt), "HH:mm")
              : format(new Date(item.createdAt), "yyyy-MM-dd")
            : "표시할 수 없는 날짜입니다."}
        </p>
      </div>
    );
  };

  return (
    <div className="w-full px-12 py-5 max-w-screen-xl mx-auto">
      <h1 className="text-2xl font-bold mt-4 mb-5 pl-4">프로필</h1>
      <ProfileCard isEditing={false} editedProfile={userProfile} />
      <div className="flex justify-between mt-5 mb-5">
        <h1 className="font-bold text-2xl pl-4">활동 내역</h1>
      </div>
      <div className="flex pt-4 pl-6 bg-white rounded-tl-xl rounded-tr-xl border border-[#E1E1DF]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`px-6 py-2 text-xl font-semibold ${
              activeTab === tab.id
                ? "border-b-4 border-[#bc5b39] text-[#bc5b39]"
                : "text-[#7D7C77] hover:text-[#bc5b39]"
            }`}
          >
            {tab.label.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="p-10 bg-white rounded-bl-xl rounded-br-xl border-b border-l border-r border-[#E1E1DF] text-[#7D7C77]">
        <ListRender
          data={currentData}
          renderItem={renderActivity}
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemCategory={activeTab}
        />
      </div>
    </div>
  );
};

export default UserPage;
