import "./App.css";
import { useLocation } from "react-router-dom";
import AppRouter from "./router.jsx";
import Footer from "./components/footer/footer.jsx";
import UpperNav from "./components/Nav/upperNav.jsx";
import LeftNav from "./components/Nav/leftNav.jsx";
import Modal from "react-modal";
import LoginModal from "./components/LoginModal.jsx";

Modal.setAppElement("#root");

function App() {
  // 번역 뷰어 페이지일 때만 좌측 내브바 표시
  const location = useLocation();
  const pathname = location.pathname;
  // console.log("Current pathname:", pathname);

  const isTranslateViewerPage = pathname.includes("/translate/viewer");
  // console.log("isTranslateViewerPage:", isTranslateViewerPage);

  return (
    <div className="flex flex-col min-h-screen min-w-[768px]">
      {isTranslateViewerPage ? <LeftNav /> : <UpperNav />}

      <div className="flex-grow w-full max-w-screen-xl mx-auto">
        <AppRouter />
      </div>
      {isTranslateViewerPage ? null : <Footer />}
      <LoginModal />
    </div>
  );
}

export default App;
