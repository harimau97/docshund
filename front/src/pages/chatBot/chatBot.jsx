import { useState, useEffect, useRef } from "react";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import chatBotImg from "../../assets/icon/chatBot.png";

//상태 관련
import useChatBotStore from "../../store/chatBotStore.jsx";

const ChatBot = () => {
  //모달 관련 상태
  const { isChatBotVisible } = useChatBotStore();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
        "페르소나: 당신은 영어에 능통한 30년차 풀스택 개발자 멘토로서, 개발 관련 영어 질문에 대해 간결하고 명확한 한국어 답변을 해요체로 3 문장 이내로 제공합니다."
      )
    );
  };

  const testGeminiAPI = async (chatContent) => {
    setLoading(true);
    console.log(chatContent);
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${
          import.meta.env.VITE_GEMINI_API_KEY
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: chatContent,
                  },
                ],
              },
            ],
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
        <motion.div
          key="chatbot-modal"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{
            ease: "easeInOut",
            duration: 0.3,
          }}
          className="fixed bottom-22 left-1 w-[350px] h-[500px] bg-white rounded-xl shadow-lg border border-gray-200 z-[2600] flex flex-col"
        >
          {/* 챗봇 헤더 */}
          <div className="flex items-center p-4 border-b border-gray-200 bg-blue-600 rounded-t-xl">
            <img
              src={chatBotImg}
              alt="ChatBot"
              className="w-8 h-8 rounded-full"
            />
            <div className="ml-3 text-white">
              <h3 className="font-semibold">DocshunD 번역봇</h3>
              {/* <p className="text-xs text-blue-100"></p> */}
            </div>
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
                  <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
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
                className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                disabled={loading}
              >
                전송
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatBot;
