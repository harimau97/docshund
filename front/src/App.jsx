import "./App.css";
import { useLocation } from "react-router-dom";
import AppRouter from "./router.jsx";
import Footer from "./components/footer/footer.jsx";
import UpperNav from "./components/Nav/upperNav.jsx";
import LeftNav from "./components/Nav/leftNav.jsx";
import Modal from "react-modal";
import LoginModal from "./components/LoginModal.jsx";
//챗봇
import ChatBot from "./pages/chatBot/chatBot.jsx";
import chatBotImg from "./assets/icon/chatBot.png";
import ChatBotStore from "./store/chatBotStore.jsx";

//문서채팅
import Chat from "./pages/chat/chat.jsx";
import ChatStore from "./store/chatStore.jsx";
import chatImg from "./assets/icon/chat.png";

Modal.setAppElement("#root");

function App() {
  // 번역 뷰어 페이지일 때만 좌측 내브바 표시
  const location = useLocation();
  const pathname = location.pathname;
  // console.log("Current pathname:", pathname);

  const isTranslateViewerPage = pathname.includes("/translate/viewer");

  const { isChatBotVisible, toggleChatBot } = ChatBotStore();
  const { isChatVisible, toggleChat } = ChatStore();

  return (
    <div className="flex flex-col min-h-screen min-w-[768px] overflow-hidden">
      {isTranslateViewerPage ? <LeftNav /> : <UpperNav />}
      <div className="flex-grow">
        <AppRouter />
      </div>
      {isTranslateViewerPage ? (
        <div
          onClick={toggleChat}
          className="fixed bottom-4 right-4 z-[1900] group"
        >
          <div className="rounded-full w-16 h-16 bg-gradient-to-r from-[#BC5B39] to-[#E4DCD4] flex justify-center items-center cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border-2 border-white">
            <img
              className="group-hover:rotate-12 transition-transform duration-300"
              src={chatImg}
              alt="챗봇 아이콘"
            />
          </div>
        </div>
      ) : null}
      {isChatVisible && <Chat />}
      {isTranslateViewerPage ? null : <Footer />}
      <LoginModal />
    </div>
  );
}

export default App;
