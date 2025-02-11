import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import useDocsStore from "../../store/translateStore/docsStore";
import { fetchDocsList } from "./hooks/translateGetService";
import { likeDocs } from "./hooks/translatePostService";
import { motion } from "framer-motion";

const TransLatePage = () => {
  const userId = useRef(0);

  if (localStorage.getItem("token")) {
    const decodedToken = jwtDecode(localStorage.getItem("token"));
    userId.current = decodedToken.userId;
  }

  //포지션 필터 버튼 관련
  const docsCategories = ["ALL", "FRONTEND", "BACKEND", "DB"];
  const [selectedCategory, setSelectedCategory] = useState("");

  const { docsList, setDocsList, setDocumentName } = useDocsStore();

  const navigate = useNavigate();

  const slogan = "번역 문서";
  const [showSlogan, setShowSlogan] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const tmpDocsList = await fetchDocsList();
      setDocsList(tmpDocsList);
    };
    fetchData();
    setShowSlogan(true);
  }, []);

  const handleLike = async (docsId) => {
    await likeDocs(docsId);
    const tmpDocsList = await fetchDocsList();
    setDocsList(tmpDocsList);
  };

  const handleFilter = async (position) => {
    let tmpDocsList = await fetchDocsList();
    if (position !== "ALL") {
      tmpDocsList = await tmpDocsList.filter(
        (docs) => docs.position === position
      );
      tmpDocsList.sort((a, b) => b.likeCount - a.likeCount);
    }
    setDocsList(tmpDocsList);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 max-w-screen-xl mx-auto">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1
            className="text-2xl md:text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-[#bc5b39] to-[#C96442] text-transparent bg-clip-text"
            key={showSlogan}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ whiteSpace: "pre-line", lineHeight: "1.5" }}
          >
            {slogan}
          </motion.h1>
          <p className="text-gray-600">
            원하시는 문서를 선택하여 번역을 시작하세요
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {docsCategories.map((docsCategory, index) => (
            <button
              onClick={() => {
                handleFilter(docsCategory);
                setSelectedCategory(docsCategory);
              }}
              className={`cursor-pointer px-6 py-2 rounded-full ${
                selectedCategory === docsCategory
                  ? "bg-[rgba(188,91,57,0.8)] text-white"
                  : "bg-white text-black"
              } text-gray-700 transition-all duration-200 shadow-sm border border-gray-200 font-medium`}
              key={index}
            >
              {docsCategory}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {docsList.map((docs, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {localStorage.getItem("token") && (
                <button
                  onClick={() => handleLike(docs.docsId)}
                  className={`absolute right-2 top-2 p-2 rounded-full transition-all duration-300 cursor-pointer flex ${
                    docs.likeUserIds.includes(Number(userId.current))
                      ? "bg-red-600 text-white"
                      : "bg-gray-300"
                  }`}
                >
                  <svg
                    className="h-6 w-6"
                    fill={
                      docs.likeUserIds.includes(Number(userId.current))
                        ? "white"
                        : "currentColor"
                    }
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  {docs.likeCount}
                </button>
              )}
              <div className="p-6 flex flex-col items-center">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  <img
                    className="w-10 h-10 opacity-80"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAzFBMVEVHcExwLIZpK4PIIDjJIDfXQS85KGyRHVP1lSKPL27odCbJIjflbSiZI2S5IEeGJnWpIFewIE6rIFWrIFMqJmPQNDPEIDvKJDfLIDb0kSPFIDvxjCPeWSvFIDvJIDe/IEDfWSvfWyvXQC+0IEx+KHyFJnaDJneBJ3m8IETOKTTjainoeSf0lSPndCfLIDbeWCzjaSl+KHuKJXN6KX27IER/KHu2IEmbImWGJnV/KHvKIDazIEy/IEDOJjTaSy7hYCrqeyaJJXPpeCbdVSxkhj7EAAAAOnRSTlMANkom8usWBP0MG8P5Ht7M96m24UdcpDeviP5xPpjl+NzOwUgkqbfgk/Jx5ufdiKnelGOdyo72UWrsTLVmUAAAANZJREFUKJF90VeTgjAUhuGAwQRFql13FcGuW3TXkgSw/P//5Dhe+oVzmWfeM5mEkLfpcV57P33NgHPe09jwsuF8gK3246wvN83a7yJ2nC22Vh6Pi2IFjVnWJL/HNsSvbGLl1hBahdJ6li07ED9E/VOILkPWobQrBK3gUD3DNgxtd9RW/X4Lhol0/5Qa4a2BDA5SLaCxKAqldBsQG34YST+Blp6uoR8c8cux2dzzpjtoxP6fna9TbMTw9vNffBvCbDPVZM+1pt6IYZSgWdUba5aE1VJEv/gAhbgShVrVkEQAAAAASUVORK5CYII="
                    alt="문서 아이콘"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {docs.documentName}
                </h3>
                <button
                  onClick={() => {
                    navigate(`/translate/main/viewer/${docs.docsId}`);
                    setDocumentName(docs.documentName);
                  }}
                  className="cursor-pointer mt-4 px-6 py-2 bg-[rgba(188,91,57,1)] text-white rounded-lg hover:bg-[rgba(188,91,57,0.8)] transition-colors duration-200 font-medium"
                >
                  {localStorage.getItem("token") ? "번역 하기" : "번역 보기"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransLatePage;
