import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage.jsx";
import TranslatePage from "./pages/translate/translate.jsx";
import MyPage from "./pages/myPage/myPage.jsx";
import ProfilePage from "./pages/myPage/profilePage.jsx";
import LikeArticlePage from "./pages/myPage/archive/likeArticlePage.jsx";
import LikeTransPage from "./pages/myPage/archive/likeTransPage.jsx";
import LikeDocsPage from "./pages/myPage/archive/likeDocsPage.jsx";
import MyTransPage from "./pages/myPage/activity/myTransPage.jsx";
import MyArticlePage from "./pages/myPage/activity/myArticlePage.jsx";
import MyCommentPage from "./pages/myPage/activity/myCommentPage.jsx";
import MemoPage from "./pages/myPage/memoPage.jsx";
import InquiryPage from "./pages/myPage/inquiryPage.jsx";
import CommunityPage from "./pages/community/community.jsx";
import HelpDesk from "./pages/helpDesk.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/myPage" element={<MyPage />}>
        <Route path="profile" element={<ProfilePage />} />
        <Route path="archive" element={<div>Archive Layout</div>}>
          <Route path="likeTrans" element={<LikeTransPage />} />
          <Route path="likeArticle" element={<LikeArticlePage />} />
          <Route path="likeDocs" element={<LikeDocsPage />} />
        </Route>
        <Route path="activity" element={<div>Activity Layout</div>}>
          <Route path="myTrans" element={<MyTransPage />} />
          <Route path="myArticle" element={<MyArticlePage />} />
          <Route path="myComment" element={<MyCommentPage />} />
        </Route>
        <Route path="memo" element={<MemoPage />} />
        <Route path="inquiry" element={<InquiryPage />} />
      </Route>
      <Route path="/translate" element={<TranslatePage />} />
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/helpDesk" element={<HelpDesk />} />
    </Routes>
  );
}

export default AppRoutes;
