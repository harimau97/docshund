import { Bot } from "lucide-react";
import Draggable from "react-draggable";
import { useEffect, useState } from "react";

//상태 관리
import useChatBotStore from "../../store/chatBotStore.jsx";

const ChatBotBtn = () => {
  const [isDragging, setIsDragging] = useState(false);
  const {
    toggleChatBot,
    toggleChatBotBtn,
    isChatBotBtnVisible,
    chatBotBtnPosition,
    chatBotPosition,
    isChatBotVisible,
    setChatBotBtnPosition,
    setChatBotPosition,
  } = useChatBotStore();

  const handleStart = () => {
    setIsDragging(false);
  };

  const handleDrag = (e, data) => {
    setIsDragging(true);
    console.log(data.x, ",", data.y);
  };

  const handleStop = (e, data) => {
    setTimeout(() => setIsDragging(false), 10); // 드래그 종료 후 상태 초기화
    setChatBotBtnPosition([data.x, data.y]);
    setChatBotPosition([data.x, data.y]);
  };

  const handleClick = () => {
    if (isDragging) return;
    toggleChatBot();
    toggleChatBotBtn();
  };

  return (
    <div>
      {localStorage.getItem("token") && isChatBotBtnVisible && (
        <Draggable
          onStart={handleStart}
          onDrag={handleDrag}
          onStop={handleStop}
        >
          <div
            style={{
              bottom: `${(chatBotBtnPosition[1] / window.innerHeight) * 100}vh`,
              left: `${(chatBotBtnPosition[0] / window.innerWidth) * 100}vw`,
            }}
            className="fixed z-[1900] group"
          >
            <div
              onClick={handleClick}
              className="rounded-full w-16 h-16 bg-gradient-to-r from-[#BC5B39] to-[#E4DCD4] flex justify-center items-center cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border-2 border-white"
            >
              <Bot className="h-8 w-8 text-white group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
        </Draggable>
      )}
    </div>
  );
};
export default ChatBotBtn;
