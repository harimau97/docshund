import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import useDocsStore from "./store/docsStore";
import useTestStore from "./store/testStore";
import { fetchDocsList } from "./hooks/translateService";
import { motion } from "framer-motion";

const TransLatePage = () => {
  const [docsCategories, setDocsCategories] = useState(["Spring", "MyBatis"]);

  const { docsList } = useDocsStore();
  const { isTest } = useTestStore();
  const navigate = useNavigate();

  const slogan = "번역 문서";
  const [showSlogan, setShowSlogan] = useState(false);

  useEffect(() => {
    fetchDocsList(isTest);
    setShowSlogan(true);
  }, []);

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
              className="cursor-pointer px-6 py-2 rounded-full bg-white text-gray-700 hover:text-white hover:bg-[rgba(188,91,57,0.8)] transition-all duration-200 shadow-sm border border-gray-200 font-medium"
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
                    navigate(`/translate/viewer/${docs.docsId}`);
                  }}
                  className="cursor-pointer mt-4 px-6 py-2 bg-[rgba(188,91,57,1)] text-white rounded-lg hover:bg-[rgba(188,91,57,0.8)] transition-colors duration-200 font-medium"
                >
                  번역하기
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
