import "./App.css";
import { useLocation } from "react-router-dom";
import AppRouter from "./router.jsx";
import Footer from "./components/footer/footer.jsx";
import UpperNav from "./components/Nav/upperNav.jsx";
import LeftNav from "./components/Nav/leftNav.jsx";
import Modal from "react-modal";

Modal.setAppElement("#root");

function App() {
  const location = useLocation();
  const pathname = location.pathname;
  console.log("Current pathname:", pathname);

  // 번역 뷰어 페이지일 때만 좌측 내브바 표시
  // 현재 로그인 상태 저장이 구현되어 있는지 않기 때문에 loginStatus=true로 가정
  const isTranslateViewerPage = pathname.includes("/translate/viewer");
  console.log("isTranslateViewerPage:", isTranslateViewerPage);

  return (
    <div className="flex flex-col min-h-screen min-w-[1200px]">
      {isTranslateViewerPage ? (
        <div>
          <LeftNav />
        </div>
      ) : (
        <div>
          <UpperNav loginStatus={true} />
        </div>
      )}
      <div className="flex-grow">
        <AppRouter />
      </div>
      {isTranslateViewerPage ? null : <Footer />}
    </div>
  );
}

export default App;
