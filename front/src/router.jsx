import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/landingPage.jsx";
import TranslatePage from "./pages/translate/translate.jsx";
import MyPage from "./pages/myPage/MyPage.jsx";
import MyProfilePage from "./pages/myPage/pages/MyProfilePage.jsx";
import ArchivePage from "./pages/myPage/pages/ArchivePage.jsx";
import LikeArticlePage from "./pages/myPage/pages/archive/LikeArticlePage.jsx";
import LikeTranslationPage from "./pages/myPage/pages/archive/LikeTranslationPage.jsx";
import LikeDocsPage from "./pages/myPage/pages/archive/LikeDocsPage.jsx";
import ActivityPage from "./pages/myPage/pages/ActivityPage.jsx";
import MyTranslationPage from "./pages/myPage/pages/activity/MyTranslationPage.jsx";
import MyArticlePage from "./pages/myPage/pages/activity/MyArticlePage.jsx";
import MyCommentPage from "./pages/myPage/pages/activity/MyCommentPage.jsx";
import MemoPage from "./pages/myPage/pages/MemoPage.jsx";
import InquiryPage from "./pages/myPage/pages/InquiryPage.jsx";
import CommunityPage from "./pages/community/community.jsx";
import HelpDesk from "./pages/helpDesk.jsx";
import TranslateViewer from "./pages/translate/translateViewer.jsx";

function AppRoutes() {
  return (
    <Routes>
      {/* UpperNav 바로가기 주소 */}
      <Route path="/" element={<LandingPage />} />

      {/* 마이페이지 관련 주소 */}
      <Route path="/myPage" element={<MyPage />}>
        <Route index element={<Navigate to="profile" replace />} />
        <Route path="profile" element={<MyProfilePage />} />
        <Route path="archive" element={<ArchivePage />}>
          <Route path="likeTrans" element={<LikeTranslationPage />} />
          <Route path="likeArticle" element={<LikeArticlePage />} />
          <Route path="likeDocs" element={<LikeDocsPage />} />
        </Route>
        <Route path="activity" element={<ActivityPage />}>
          <Route path="myTrans" element={<MyTranslationPage />} />
          <Route path="myArticle" element={<MyArticlePage />} />
          <Route path="myComment" element={<MyCommentPage />} />
        </Route>
        <Route path="memo" element={<MemoPage />} />
        <Route path="inquiry" element={<InquiryPage />} />
      </Route>

      {/* 번역 관련 주소 */}
      <Route path="/translate" element={<TranslatePage />}>
        <Route path="viewer/:docsName" element={<TranslateViewer />}></Route>
      </Route>

      {/* 커뮤니티 관련 주소 */}
      <Route path="/community" element={<CommunityPage />} />

      {/* 도움말 관련 주소 */}
      <Route path="/helpDesk" element={<HelpDesk />} />
    </Routes>
  );
}

export default AppRoutes;
