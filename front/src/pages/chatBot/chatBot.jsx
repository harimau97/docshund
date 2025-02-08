import { useState, useEffect, useRef } from "react";
import * as motion from "motion/react-client";
import Draggable from "react-draggable";
import { AnimatePresence } from "motion/react";
import { Bot, Send, X } from "lucide-react";

//상태 관련
import useChatBotStore from "../../store/chatBotStore.jsx";

const ChatBot = () => {
  //모달 관련 상태
  const {
    isChatBotVisible,
    chatBotPosition,
    chatBotBtnPosition,
    toggleChatBot,
    toggleChatBotBtn,
    setChatBotPosition,
    setChatBotBtnPosition,
  } = useChatBotStore();

  const [isDragging, setIsDragging] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleStart = () => {
    setIsDragging(false);
  };

  const handleDrag = () => {
    setIsDragging(true);
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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = {
      text: inputMessage,
      isUser: true,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");
    await testGeminiAPI(
      inputMessage.concat(
        "페르소나: 당신은 영어에 능통한 30년차 풀스택 개발자 멘토로서, 개발 관련 영어 질문에 대해 간결하고 명확한 한국어 답변을 해요체로 256자 이내로 제공합니다. 답변은 반드시 한국어로 해야 합니다."
      )
    );
  };

  const testGeminiAPI = async (chatContent) => {
    setLoading(true);
    // console.log(chatContent);
    try {
      const response = await fetch(
        `https://asia-northeast3-aiplatform.googleapis.com/v1/projects/skilful-earth-450223-v9/locations/asia-northeast3/publishers/google/models/gemini-1.5-flash:generateContent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_VERTEX_API_KEY}`,
          },
          body: JSON.stringify({
            contents: {
              role: "user",
              parts: [{ text: chatContent }],
            },
            safetySettings: [
              {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_NONE",
              },
            ],
            generationConfig: {
              temperature: 0.2,
              maxOutputTokens: 256,
              topP: 0.8,
              topK: 40,
            },
          }),
        }
      );

      const data = await response.json();
      const botResponse = {
        text:
          data.candidates?.[0]?.content?.parts?.[0]?.text ||
          "응답을 받아오는데 실패했습니다.",
        isUser: false,
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      const errorMessage = {
        text: `에러가 발생했습니다: ${error.message}`,
        isUser: false,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isChatBotVisible && (
        <Draggable
          onStart={handleStart}
          onDrag={handleDrag}
          onStop={handleStop}
        >
          <motion.div
            key="chatbot-modal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{
              ease: "easeInOut",
              duration: 0.3,
            }}
            style={{
              top: chatBotBtnPosition[1],
              left: chatBotBtnPosition[0],
            }}
            className="absolute bottom-22 w-[400px] h-[600px] bg-white rounded-xl shadow-lg border border-gray-200 z-[1900] flex flex-col"
          >
            {/* 챗봇 헤더 */}
            <div className="flex items-center p-4 border-b border-gray-200 bg-[#C96442] rounded-t-xl">
              <Bot className="h-8 w-8" />
              <div className="ml-3 text-white">
                <h3 className="font-semibold">DocshunD 번역봇</h3>
                {/* <p className="text-xs text-blue-100"></p> */}
              </div>
              <button className="cursor-pointer" onClick={() => handleClick()}>
                <X className="h-8 w-8 flex left-0" />
              </button>
            </div>

            {/* 메시지 영역 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.isUser
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-gray-100 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-lg rounded-bl-none">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* 입력 영역 */}
            <form
              onSubmit={handleSubmit}
              className="p-4 border-t border-gray-200"
            >
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="메시지를 입력하세요..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="px-2 py-2 bg-[#C96442] text-white rounded-full hover: cursor-pointer transition-colors"
                  disabled={loading}
                >
                  <Send />
                </button>
              </div>
            </form>
          </motion.div>
        </Draggable>
      )}
    </AnimatePresence>
  );
};

export default ChatBot;
