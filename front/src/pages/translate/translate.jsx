import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";

const TransLatePage = () => {
  const [docsList, setDocsList] = useState([
    "kafka",
    "rabbitmq",
    "elasticsearch",
    "kafka",
    "springboot",
    "kafka",
    "mysql",
  ]);
  const [docsCategories, setDocsCategories] = useState([
    "frontend",
    "backend",
    "DB",
  ]);
  const navigate = useNavigate();

  return (
    <div>
      <div className="box-border text-gray-950 text-center text-[56px] text-semibold relative flex items-center justify-center">
        번역 문서
      </div>
      <div>
        {docsCategories.map((docsCategory, index) => {
          return (
            <button
              className="mr-2 ml-2 border-black border-2 p-1 rounded-xl cursor-pointer"
              key={index}
            >
              {docsCategory}
            </button>
          );
        })}
      </div>
      <div className="h-screen w-full flex flex-wrap items-center justify-center">
        {docsList.map((docs, index) => {
          return (
            <div
              key={index}
              className="border-black border-2 w-[300px] h-[300px] mr-[2.55%] ml-[2.5%] rounded-xl p-2"
            >
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAzFBMVEVHcExwLIZpK4PIIDjJIDfXQS85KGyRHVP1lSKPL27odCbJIjflbSiZI2S5IEeGJnWpIFewIE6rIFWrIFMqJmPQNDPEIDvKJDfLIDb0kSPFIDvxjCPeWSvFIDvJIDe/IEDfWSvfWyvXQC+0IEx+KHyFJnaDJneBJ3m8IETOKTTjainoeSf0lSPndCfLIDbeWCzjaSl+KHuKJXN6KX27IER/KHu2IEmbImWGJnV/KHvKIDazIEy/IEDOJjTaSy7hYCrqeyaJJXPpeCbdVSxkhj7EAAAAOnRSTlMANkom8usWBP0MG8P5Ht7M96m24UdcpDeviP5xPpjl+NzOwUgkqbfgk/Jx5ufdiKnelGOdyo72UWrsTLVmUAAAANZJREFUKJF90VeTgjAUhuGAwQRFql13FcGuW3TXkgSw/P//5Dhe+oVzmWfeM5mEkLfpcV57P33NgHPe09jwsuF8gK3246wvN83a7yJ2nC22Vh6Pi2IFjVnWJL/HNsSvbGLl1hBahdJ6li07ED9E/VOILkPWobQrBK3gUD3DNgxtd9RW/X4Lhol0/5Qa4a2BDA5SLaCxKAqldBsQG34YST+Blp6uoR8c8cux2dzzpjtoxP6fna9TbMTw9vNffBvCbDPVZM+1pt6IYZSgWdUba5aE1VJEv/gAhbgShVrVkEQAAAAASUVORK5CYII="
                alt="문서 아이콘"
              />
              <div>{docs}</div>
              <button
                className="cursor-pointer border"
                onClick={() => navigate(`/translate/viewer/${docs}`)}
              >
                번역하기
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransLatePage;
