import { useState, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import docsList from "../../assets/icon/docsList.png";
import notification from "../../assets/icon/notification.png";
import memo from "../../assets/icon/memo.png";
import navToggle from "../../assets/icon/navToggle.png";
import RectBtn from "../button/roundCornerBtn.jsx";

const LeftNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [docs, setDocs] = useState([]);
  const [isMemoOpen, setIsMemoOpen] = useState(false);
  const [memos, setMemo] = useState([]);
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [btnToggled, setBtnToggled] = useState("absolute top-25 -right-3");
  const [showNav, setShowNav] = useState(
    "max-w-[15%] w-60 h-[80%] bg-[#F0EEE5] flex flex-col border-box border-2 border-black fixed top-1/2 -translate-y-1/2 rounded-br-4xl rounded-tr-4xl z-100"
  ); // leftNav가 화면 최상위에 오도록 z-index 설정
  const navigate = useNavigate();

  function toggleNav() {
    console.log(isNavOpen);
    if (isNavOpen === true) {
      console.log("nav 닫는다.");
      setIsNavOpen(false);
      setBtnToggled(
        "absolute top-25 -right-3 transform transition-transform duration-250 rotate-180"
      );
      setShowNav(
        "max-w-[15%] w-60 h-[80%] bg-[#F0EEE5] flex flex-col border-box border-2 border-black fixed top-1/2 -translate-y-1/2 rounded-br-4xl rounded-tr-4xl transform transition-transform duration-250 -translate-x-[95%] z-100"
      );
    } else if (isNavOpen === false) {
      console.log("nav 연다.");
      setIsNavOpen(true);
      setBtnToggled(
        "absolute top-25 -right-3 transform transition-transform duration-250 "
      );
      setShowNav(
        "max-w-[15%] w-60 h-[80%] bg-[#F0EEE5] flex flex-col border-box border-2 border-black fixed top-1/2 -translate-y-1/2 rounded-br-4xl rounded-tr-4xl transform transition-transform duration-250 z-100"
      );
    }
  }

  // useEffect(() => {
  //   setIsNavOpen(false);
  // }, []);

  return (
    <div className="h-screen">
      <div className={showNav}>
        <button onClick={() => toggleNav()} className={btnToggled}>
          <img
            className="w-[24px] h-[24px] cursor-pointer"
            src={navToggle}
            alt="nav 토글 버튼"
          />
        </button>
        <div className="p-5 text-center">
          <NavLink to="/translate">
            <img src="https://cdn.discordapp.com/attachments/1325677272572891136/1334006138638958713/docshund.png?ex=679af588&is=6799a408&hm=29441a9c35dd323776e3a367f2cc18daea6dd7883f1cfef1a225f3b6a1bb63cb&" alt="닥스훈트 로고" />
          </NavLink>
        </div>

        <div className="mb-5">
          <div
            className="px-5 py-2.5 flex items-center cursor-pointer hover:bg-gray-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <img src={docsList} alt="문서목록 아이콘" />
            <span className="ml-5">문서목록</span>
            {isMenuOpen ? (
              <IoIosArrowUp className="absolute right-0 mr-5" />
            ) : (
              <IoIosArrowDown className="absolute right-0 mr-5" />
            )}
          </div>
          {isMenuOpen && (
            <div className="h-[200px] overflow-y-scroll ">
              <div className="px-5">
                {docs.map((doc, index) => (
                  <div
                    key={index}
                    className="py-2.5 flex justify-between items-center border-b border-gray-100"
                  >
                    {doc}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mb-5 flex items-center">
          <img
            className="w-[24px] h-[24px] ml-5"
            src={notification}
            alt="알림 아이콘"
          />
          <div className="px-5 py-2.5 flex items-center gap-2.5 ">
            <span>알림</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div
            onClick={() => setIsMemoOpen(!isMemoOpen)}
            className="px-5 py-2.5 flex items-center cursor-pointer hover:bg-gray-50"
          >
            <img className="w-[24px] h-[24px]" src={memo} alt="메모 아이콘" />
            <span className="ml-5">MEMO</span>
            {isMemoOpen ? (
              <IoIosArrowUp className="absolute right-0 mr-5" />
            ) : (
              <IoIosArrowDown className="absolute right-0 mr-5" />
            )}
          </div>

          {isMemoOpen && (
            <div className="px-5">
              {memos.map((memo, index) => (
                <div
                  key={index}
                  className="py-2.5 flex justify-between items-center border-b border-gray-100"
                >
                  {memo}
                  <button className="text-gray-600 hover:text-black cursor-pointer text-sm">
                    보기
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="items-center justify-center flex mb-10">
          <RectBtn onClick={() => navigate("/translate")} text="뷰어 나가기" />
        </div>
      </div>
    </div>
  );
};

export default LeftNav;
