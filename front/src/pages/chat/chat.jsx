import { useEffect, useState, useRef } from "react";
import { Stomp } from "@stomp/stompjs";
import { AnimatePresence, motion as m } from "motion/react";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { axiosJsonInstance } from "../../utils/axiosInstance.jsx";
import ChatStore from "../../store/chatStore.jsx";
import { Flag, Send } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Chat = () => {
  const stompClient = useRef(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { isChatVisible, toggleChat } = ChatStore();
  const location = useLocation();
  const navigate = useNavigate();
  const docsId = location.pathname.split("/")[3];
  const [userId, setUserId] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.userId);
    }
  }, [token]);

  const fetchMessages = async () => {
    try {
      const response = await axiosJsonInstance.get(`chats/${docsId}`);
      if (response.data.content.length === 0) {
        setMessages([]);
      } else {
        setMessages(response.data.content.reverse() || []);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const connect = () => {
    if (stompClient.current && stompClient.current.connected) return;

    const socketFactory = () =>
      new WebSocket("ws://i12a703.p.ssafy.io:8081/ws-connect");
    stompClient.current = Stomp.over(socketFactory);
    stompClient.current.connect(
      { Authorization: `Bearer ${token}` },
      () => {
        stompClient.current.subscribe(`/sub/chats/${docsId}`, (message) => {
          const newMessage = JSON.parse(message.body);
          setMessages((prev) => [...prev, newMessage]);
        });
      },
      (error) => {
        console.error("WebSocket connection error:", error);
      }
    );
  };

  const disconnect = () => {
    if (stompClient.current && stompClient.current.connected) {
      stompClient.current.disconnect(() =>
        console.log("WebSocket disconnected")
      );
    }
  };

  useEffect(() => {
    connect();
    fetchMessages();
    return () => disconnect();
  }, []);

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => scrollToBottom(), [messages]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") sendMessage();
  };

  const sendMessage = () => {
    if (inputValue.length > 255) {
      toast.error("255자 이상 메세지는 보낼 수 없습니다.");
      return;
    }
    if (stompClient.current?.connected && inputValue) {
      const body = { docsId, content: inputValue };
      stompClient.current.send(
        `/pub/chats/${docsId}`,
        { Authorization: `Bearer ${token}` },
        JSON.stringify(body)
      );
      setInputValue("");
    }
  };

  return (
    <AnimatePresence>
      {isChatVisible && (
        <div
          className="fixed inset-0 flex items-center justify-center z-[2500]"
          onClick={toggleChat}
        >
          <m.div
            key="chat-modal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{
              ease: "easeInOut",
              duration: 0.3,
            }}
            className="fixed bottom-22 right-5 w-[400px] h-[600px] bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col z-[2600]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 bg-[#C96442] rounded-t-xl text-white font-semibold flex items-center justify-between">
              <span>문서 채팅</span>
              <button onClick={toggleChat} className="cursor-pointer">
                &times;
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* 메시지가 없을 때 표시 */}
              {messages.length === 0 && (
                <div className="text-center text-gray-500">
                  메시지가 없습니다.
                </div>
              )}
              {messages.map((item, index) => (
                <div
                  key={index}
                  className={`flex ${
                    item.userId === userId ? "justify-end" : "justify-start"
                  }`}
                >
                  {item.userId !== userId && (
                    <img
                      src={item.profileImg}
                      alt="Profile"
                      className="w-8 h-8 rounded-full cursor-pointer mr-2"
                      onClick={() => {
                        toggleChat();
                        setTimeout(() => {
                          navigate(`/userPage/${item.userId}`);
                        }, 300);
                      }}
                    />
                  )}
                  <div className="max-w-[70%] p-3 rounded-lg bg-gray-100">
                    <p className="text-sm">{item.content}</p>
                    <button className="text-xs text-red-500 flex items-center gap-1 mt-1 cursor-pointer hover:underline">
                      <Flag size={14} /> 신고
                    </button>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-gray-200 flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-[#bc5b39] focus:border-[#bc5b39]"
                placeholder="메시지를 입력하세요..."
              />
              <button
                onClick={sendMessage}
                className="px-3 py-3 bg-[#bc5b39] text-white rounded-full hover:bg-[#C96442] cursor-pointer"
              >
                <Send />
              </button>
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Chat;
