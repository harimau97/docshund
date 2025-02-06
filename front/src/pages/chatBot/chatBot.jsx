import Modal from "react-modal";
import { useState, useEffect, useRef } from "react";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import chatBotImg from "../../assets/icon/chatBot.png";

//상태 관련
import useChatBotStore from "../../store/chatBotStore.jsx";

const ChatBot = () => {
  //모달 관련 상태
  const { isChatBotVisible } = useChatBotStore();
  const userChat = useRef([]);
  const botChat = useRef([]);
  const [apiKey] = useState("");
  const [loading, setLoading] = useState(false);

  const testGeminiAPI = async (chatContent) => {
    setLoading(true);
    userChat.current.push({ text: chatContent });

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
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
                    text: prompt,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        botChat.current.push(data.candidates[0].content.parts[0].text);
      } else {
        botChat.current.push("응답을 받아오는데 실패했습니다.");
      }
    } catch (error) {
      botChat.current.push(`에러가 발생했습니다: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const renderChat = () => {};

  useEffect(() => {
    renderChat();
  }, [userChat, botChat]);

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
          className="fixed bottom-17 right-1 w-[300px] h-[500px] bg-white rounded-xl shadow-lg border border-gray-200 z-[2600]"
        >
          <div className="w-full h-full p-4">이것은 챗봇입니다</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatBot;
