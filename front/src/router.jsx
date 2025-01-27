import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage.jsx";
import TranslatePage from "./pages/translate/translate.jsx";
import MyPage from "./pages/myPage/myPage.jsx";
import CommunityPage from "./pages/community/community.jsx";
import HelpDesk from "./pages/helpDesk.jsx";
import TranslateViewer from "./pages/translate/translateViewer.jsx";

function AppRoutes() {
  return (
    <Routes>
      {/* UpperNav 바로가기 주소 */}
      <Route path="/" element={<LandingPage />}></Route>
      <Route path="/myPage" element={<MyPage />}></Route>
      <Route path="/translate" element={<TranslatePage />}></Route>
      <Route path="/community" element={<CommunityPage />}></Route>
      <Route path="/helpDesk" element={<HelpDesk />}></Route>

      {/* 번역 관련 주소 */}
      <Route path="/translate/viewer" element={<TranslateViewer />}></Route>
    </Routes>
  );
}

export default AppRoutes;
