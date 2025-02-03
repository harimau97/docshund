import "./App.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AppRouter from "./router.jsx";
import Footer from "./components/footer/footer.jsx";
import UpperNav from "./components/Nav/upperNav.jsx";
import LeftNav from "./components/Nav/leftNav.jsx";
import Modal from "react-modal";
import useAuthGuard from "./utils/useAuth.jsx";
import LoginModal from "./components/LoginModal.jsx";

Modal.setAppElement("#root");

function App() {
  // 번역 뷰어 페이지일 때만 좌측 내브바 표시
  const location = useLocation();
  const pathname = location.pathname;
  console.log("Current pathname:", pathname);

  const isTranslateViewerPage = pathname.includes("/translate/viewer");
  console.log("isTranslateViewerPage:", isTranslateViewerPage);

  //로그인 상태 설정
  const [loginStatus, setLoginStatus] = useState(false);
  const { isUserAuthenticated } = useAuthGuard();

  useEffect(() => {
    if (isUserAuthenticated()) {
      setLoginStatus(true);
    } else {
      setLoginStatus(false);
    }
  }, [isUserAuthenticated]);

  return (
    <div className="flex flex-col min-h-screen min-w-[768px]">
      {isTranslateViewerPage ? (
        <div>
          <LeftNav />
        </div>
      ) : (
        <div>
          <UpperNav loginStatus={true} />
        </div>
      )}

      <div className="flex-grow w-full max-w-screen-xl mx-auto">
        <AppRouter />
      </div>
      {isTranslateViewerPage ? null : <Footer />}
      <LoginModal />
    </div>
  );
}

export default App;
