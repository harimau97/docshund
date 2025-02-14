// import { useEffect, useState } from "react";
// import { Carousel } from "flowbite-react";

// import { AnimatePresence } from "motion/react";
// import * as motion from "motion/react-client";

// const Information = () => {
//   const [agree, setAgree] = useState(true);

//   useEffect(() => {
//     const hasAgreed = localStorage.getItem("hasAgreed");
//     if (hasAgreed === "true") {
//       setAgree(true);
//     } else {
//       setAgree(false);
//     }
//   }, []);

//   const handleAgree = () => {
//     if (!localStorage.getItem("hasAgreed")) {
//       setAgree(true);
//       localStorage.setItem("hasAgreed", "true");
//     }
//   };

//   return (
//     <AnimatePresence>
//       {!agree && (
//         <motion.div
//           className="fixed inset-0 flex items-center justify-center z-[2200] backdrop-brightness-60 border-box w-full h-full"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           style={{ backdropFilter: "blur(10px)" }}
//         >
//           <div className="w-3/4 md:w-3/4 lg:w-1/2 h-4/5 md:h-4/5 z-[3000] fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl rounded-xl  transition-all duration-300 ease-in-out">
//             <Carousel slide={false} indicators={true} className="h-full">
//               {/* Item 1 - Welcome */}
//               <div className="flex flex-col items-center justify-center h-full p-8 text-center">
//                 <svg
//                   className="w-20 h-20 mb-6 text-[#C96442]"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
//                   ></path>
//                 </svg>
//                 <h2 className="text-3xl font-bold mb-4 text-gray-800">
//                   번역 뷰어에 오신 것을 환영합니다!
//                 </h2>
//                 <p className="text-lg text-gray-600">
//                   효율적인 번역 작업을 위한 몇 가지 중요한 안내사항을
//                   확인해주세요.
//                 </p>
//               </div>

//               {/* Item 2 - Key Features */}

//               <div className="flex flex-col items-center justify-center h-full p-8 text-center">
//                 <svg
//                   className="w-20 h-20 mb-6 text-[#C96442]"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
//                   ></path>
//                 </svg>
//                 <h2 className="text-3xl font-bold mb-4 text-gray-800">
//                   주요 기능 안내
//                 </h2>
//                 <div className="space-y-3 text-gray-600">
//                   <p>• 실시간 번역 미리보기</p>
//                   <p>• 자동 저장 기능</p>
//                   <p>• 단축키를 통한 빠른 작업</p>
//                   <p>• 번역 메모리 지원</p>
//                 </div>
//               </div>

//               {/* Item 3 - Guidelines */}

//               <div className="flex flex-col items-center justify-center h-full p-8 text-center">
//                 <svg
//                   className="w-20 h-20 mb-6 text-[#C96442]"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
//                   ></path>
//                 </svg>
//                 <h2 className="text-3xl font-bold mb-4 text-gray-800">
//                   번역 가이드라인
//                 </h2>
//                 <div className="space-y-3 text-gray-600">
//                   <p>• 원문의 의미를 정확하게 전달해주세요</p>
//                   <p>• 자연스러운 한국어로 번역해주세요</p>
//                   <p>• 전문 용어는 일관성있게 사용해주세요</p>
//                   <p>• 맥락을 고려한 번역을 해주세요</p>
//                 </div>
//               </div>

//               {/* Item 4 - Tips */}

//               <div className="flex flex-col items-center justify-center h-full p-8 text-center">
//                 <svg
//                   className="w-20 h-20 mb-6 text-[#C96442]"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M13 10V3L4 14h7v7l9-11h-7z"
//                   ></path>
//                 </svg>
//                 <h2 className="text-3xl font-bold mb-4 text-gray-800">
//                   유용한 팁
//                 </h2>
//                 <div className="space-y-3 text-gray-600">
//                   <p>• 문단을 우클릭하면 메뉴가 나타나요</p>
//                   <p>• 번역하기에서는 해당 내용을 번역 할 수 있어요</p>
//                   <p>• 번역기록에서는 문단의 모든 번역들을 조회할 수 있어요</p>
//                   <p>• 번역이 막힌다면 챗봇을 이용해주세요</p>
//                 </div>
//               </div>

//               {/* Item 5 - Start */}

//               <div className="flex flex-col items-center justify-center h-full p-8 text-center">
//                 <svg
//                   className="w-20 h-20 mb-6 text-[#C96442]"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
//                   ></path>
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                   ></path>
//                 </svg>
//                 <h2 className="text-3xl font-bold mb-4 text-gray-800">
//                   시작해볼까요?
//                 </h2>
//                 <p className="text-lg text-gray-600 mb-8">
//                   다음 버튼을 누르면 모든 사용 약관에 동의하게 됩니다.
//                 </p>
//                 <button
//                   onClick={handleAgree}
//                   className="cursor-pointer px-6 py-3 bg-[#BC5B39] text-white rounded-lg hover:bg-[#C96442] transition-colors duration-200"
//                 >
//                   시작하기
//                 </button>
//               </div>
//             </Carousel>
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default Information;

// import React from "react";
// import Joyride from "react-joyride";

// const Information = () => {
//   //보여줄 스텝
//   const steps = [
//     {
//       target: ".header",
//       content:
//         "여기를 누르면 사이드바가 열립니다. 사이드바에서는 문서 목록, 알림, 메모를 조회할 수 있습니다.",
//     },
//     {
//       target: ".button",
//       content:
//         "각 문단을 클릭하면 베스트 번역본의 내용을 볼 수 있고, 우클릭하면 번역을 작성하거나 기록을 볼 수 있습니다.",
//     },
//     {
//       target: ".footer",
//       content: "이 버튼을 통해 전체 번역 내용을 볼 수 있습니다.",
//     },
//     // {
//     //   target: "",
//     //   content: "챗봇 버튼을 통해 번역봇과 대화할 수 있습니다..",
//     // },
//     // {
//     //   target: "",
//     //   content: "채팅 버튼을 통해 다른 사용자들과 대화할 수 있습니다.",
//     // },
//   ];

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-[3000] border-box w-full h-full">
//       <Joyride steps={steps} continuous={true} showProgress={true} run={true} />
//       <header className="header">헤더</header>
//       <button className="button">버튼</button>
//       <footer className="footer">푸터</footer>
//     </div>
//   );
// };

// export default Information;
import React, { useEffect, useState } from "react";
import Joyride from "react-joyride";

const Information = () => {
  const [agree, setAgree] = useState(true);

  useEffect(() => {
    const hasAgreed = localStorage.getItem("hasAgreed");
    if (hasAgreed === "true") {
      setAgree(true);
    } else {
      setAgree(false);
    }
  }, []);

  const handleAgree = () => {
    if (!localStorage.getItem("hasAgreed")) {
      setAgree(true);
      localStorage.setItem("hasAgreed", "true");
    }
  };

  const steps = [
    {
      target: "#navbar",
      content:
        "여기를 누르면 사이드바가 열립니다. 사이드바에서는 문서 목록, 알림, 메모를 조회할 수 있습니다.",
    },
    {
      target: "#paragraph",
      content:
        "각 문단을 클릭하면 베스트 번역본의 내용을 볼 수 있고, 우클릭하면 번역을 작성하거나 기록을 볼 수 있습니다.",
    },
    {
      target: "#toggleTranslate",
      content: "이 버튼을 통해 전체 번역 내용을 볼 수 있습니다.",
    },
    {
      target: "#chatbot",
      content: "챗봇 버튼을 통해 번역봇과 대화할 수 있습니다..",
    },
    {
      target: "#chat",
      content: "채팅 버튼을 통해 다른 사용자들과 대화할 수 있습니다.",
    },
  ];

  return (
    <div>
      {!agree && (
        <div className="fixed inset-0 flex items-center justify-center z-[3000] w-full h-full">
          {/* Joyride를 상단에서 렌더링하여 UI 위에 나타나도록 변경 */}
          <Joyride
            steps={steps}
            continuous={true}
            showProgress={true}
            run={true}
            styles={{ options: { zIndex: 20000 } }} // z-index를 높여 가이드가 가려지지 않도록 설정
          />

          {/* 가이드 대상이 되는 요소들 */}
          <div id="navbar" className="fixed top-39 left-7"></div>
          <div id="paragraph" className="fixed top-35 left-250"></div>
          <div id="toggleTranslate" className="fixed bottom-24 right-8"></div>
          <div id="chatbot" className="fixed bottom-16 right-8"></div>
          <div
            id="chat"
            className="fixed bottom-8 right-8"
            onClick={handleAgree}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Information;
