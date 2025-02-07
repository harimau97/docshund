import { useEffect, useState, useRef } from "react";
import { Stomp } from "@stomp/stompjs";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { axiosJsonInstance } from "../../utils/axiosInstance.jsx";
import ChatStore from "../../store/chatStore.jsx";

const Chat = () => {
  const stompClient = useRef(null); //웹소켓 연결 객체
  const [messages, setMessages] = useState([]); // 메시지 리스트
  const [inputValue, setInputValue] = useState(""); // 사용자 입력을 저장할 변수
  const { isChatVisible, toggleChat } = ChatStore(); // 채팅창 표시 여부

  // 현재 페이지의 URL에서 문서 ID 추출
  const location = useLocation();
  const docsId = location.pathname.split("/")[3];

  // 로그인한 사용자의 ID
  const [userId, setUserId] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.userId);
    }
  }, [token]);

  // 이전 채팅 메시지 불러오기
  const fetchMessages = () => {
    return axiosJsonInstance
      .get(`chats/${docsId}`)
      .then((response) => {
        setMessages(response.data || []);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  };

  // 웹소켓 연결
  const connect = () => {
    const socket = new WebSocket("ws://i12a703.p.ssafy.io:8081/ws-connect");
    stompClient.current = Stomp.over(socket);
    stompClient.current.connect(
      { Authorization: `Bearer ${token}` },
      () => {
        stompClient.current.subscribe(`/sub/chats/${docsId}`, (message) => {
          const newMessage = JSON.parse(message.body);
          console.log("Received message headers:", message.headers);
          console.log("Received message body:", newMessage);
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        });
      },
      (error) => {
        console.error("WebSocket connection error:", error);
        if (error.headers && error.headers.message) {
          console.error("Error message:", error.headers.message);
        }
      }
    );
  };

  // 웹소켓 연결 해제
  const disconnect = () => {
    if (stompClient.current) {
      stompClient.current.disconnect();
      console.log("WebSocket disconnected");
    }
  };

  // 컴포넌트가 처음 렌더링될 때 웹소켓 연결
  useEffect(() => {
    connect();
    fetchMessages();

    return () => {
      disconnect();
    };
  }, []);

  // 입력 필드 값 변경 시 호출되는 함수
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  //메세지 전송
  const sendMessage = () => {
    if (stompClient.current && inputValue) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const body = {
        docsId: docsId,
        content: inputValue,
      };
      stompClient.current.send(
        `/pub/chats/${docsId}`,
        headers,
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
          <motion.div
            key="chat-modal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{
              ease: "easeInOut",
              duration: 0.3,
            }}
            className="chat-modal fixed bottom-23 right-5 w-3/10 h-4/5 bg-white rounded-xl shadow-lg border border-gray-200 z-[2600]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full h-full p-4 flex flex-col">
              <div className="flex-grow overflow-y-auto bg-gray-100 p-2 rounded-lg">
                {/* 메시지 리스트 출력 */}
                {messages.length > 0 ? (
                  messages.map((item, index) => (
                    <div
                      key={index}
                      className={`flex mb-2 ${
                        item.userId === userId ? "justify-end" : "justify-start"
                      }`}
                    >
                      {item.userId !== userId && (
                        <img
                          src={item.profileImg}
                          alt="Profile"
                          className="w-8 h-8 rounded-full mr-2"
                        />
                      )}
                      <span
                        className={`inline-block px-3 py-2 rounded-lg ${
                          item.userId === userId
                            ? "bg-[#bc5b39] text-white"
                            : "bg-[#E4DCD4] text-black"
                        }`}
                      >
                        {item.message}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500">
                    메시지가 없습니다.
                  </div>
                )}
              </div>
              <div className="mt-4 flex gap-1.5">
                {/* 입력 필드 */}
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  className="w-full px-2 border border-[#E1E1DF] rounded-md focus:outline-none focus:ring-[#bc5b39] focus:border-[#bc5b39] sm:text-sm"
                  placeholder="메시지를 입력하세요..."
                />
                {/* 메시지 전송, 메시지 리스트에 추가 */}
                <button
                  onClick={sendMessage}
                  className="w-3/10 py-2 px-4 bg-[#bc5b39] text-white rounded-md shadow-sm text-center cursor-pointer hover:bg-[#C96442] text-sm"
                >
                  전송
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Chat;
