import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import useDocsStore from "./store/docsStore";
import { fetchDocsList } from "./hooks/translateService";

const TransLatePage = () => {
  // const [docsList, setDocsList] = useState([
  //   "kafka",
  //   "rabbitmq",
  //   "elasticsearch",
  //   "kafka",
  //   "springboot",
  //   "kafka",
  //   "mysql",
  // ]);
  const [docsCategories, setDocsCategories] = useState([
    "frontend",
    "backend",
    "DB",
  ]);

  const { docsList } = useDocsStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDocsList();
  }, []);

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
              className="box-border srhink-0 w-[300px] h-[300px] relative mr-2 ml-2 "
            >
              <div className="flex items-center justify-center flex-col rounded-[4px] border-solid border-[#787f8f] border-[0.5px] w-full h-full absolute shadow-[inset_0px_0px_10px_0px_rgba(42,42,48,0.25),_0px_7px_35px_4px_rgba(32,31,49,0.20)]">
                <img
                  className="w-[50%] h-[50%] relative"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAzFBMVEVHcExwLIZpK4PIIDjJIDfXQS85KGyRHVP1lSKPL27odCbJIjflbSiZI2S5IEeGJnWpIFewIE6rIFWrIFMqJmPQNDPEIDvKJDfLIDb0kSPFIDvxjCPeWSvFIDvJIDe/IEDfWSvfWyvXQC+0IEx+KHyFJnaDJneBJ3m8IETOKTTjainoeSf0lSPndCfLIDbeWCzjaSl+KHuKJXN6KX27IER/KHu2IEmbImWGJnV/KHvKIDazIEy/IEDOJjTaSy7hYCrqeyaJJXPpeCbdVSxkhj7EAAAAOnRSTlMANkom8usWBP0MG8P5Ht7M96m24UdcpDeviP5xPpjl+NzOwUgkqbfgk/Jx5ufdiKnelGOdyo72UWrsTLVmUAAAANZJREFUKJF90VeTgjAUhuGAwQRFql13FcGuW3TXkgSw/P//5Dhe+oVzmWfeM5mEkLfpcV57P33NgHPe09jwsuF8gK3246wvN83a7yJ2nC22Vh6Pi2IFjVnWJL/HNsSvbGLl1hBahdJ6li07ED9E/VOILkPWobQrBK3gUD3DNgxtd9RW/X4Lhol0/5Qa4a2BDA5SLaCxKAqldBsQG34YST+Blp6uoR8c8cux2dzzpjtoxP6fna9TbMTw9vNffBvCbDPVZM+1pt6IYZSgWdUba5aE1VJEv/gAhbgShVrVkEQAAAAASUVORK5CYII="
                  alt="문서 아이콘"
                />

                <div>{docs.documentName}</div>
                <button
                  className="cursor-pointer border"
                  onClick={() => navigate(`/translate/viewer/${docs.docsId}`)}
                >
                  번역하기
                </button>
              </div>
              <div className="bg-[linear-gradient(90deg,_rgba(0,0,0,0.00)_14.58333283662796%,_rgba(26,29,55,0.10)_48.40801954269409%,_rgba(0,0,0,0.00)_85.41666865348816%)] w-[13px] absolute left-[12px] bottom-[0px] top-[0px]"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransLatePage;
