import { useState, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import modalStore from "../../pages/myPage/store/modalStore.jsx";
import EditorModal from "../../pages/myPage/components/EditorModal.jsx";
import docsList from "../../assets/icon/docsList.png";
import notification from "../../assets/icon/notification.png";
import memo from "../../assets/icon/memo.png";
import navToggle from "../../assets/icon/navToggle.png";
import RoundCornerBtn from "../button/roundCornerBtn.jsx";

const LeftNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [docs, setDocs] = useState([]);
  const [memos, setMemo] = useState([]);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [btnToggled, setBtnToggled] = useState(
    "absolute top-25 -right-3 transform rotate-180"
  );
  const [showNav, setShowNav] = useState(
    "max-w-[15%] min-w-fit w-60 h-[80%] bg-[#F0EEE5] flex flex-col border-box border-2 border-black absolute top-1/2 -translate-y-1/2 rounded-br-4xl rounded-tr-4xl transform transition-transform duration-250 -translate-x-[95%] z-[1500]"
  ); // leftNav가 화면 최상위에 오도록 z-index 설정
  const { isOpen, openModal, closeModal } = modalStore();
  const [memoData, setMemoData] = useState({
    title: "",
    content: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setMemoData({
      ...memoData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (data) => {
    console.log("Memo Saved:", data); // 메모 저장 처리
    // 예를 들어, 데이터를 서버로 전송하거나 상태 업데이트 처리
    closeModal();
  };

  function toggleNav() {
    console.log(isNavOpen);
    if (isNavOpen === true) {
      console.log("nav 닫는다.");
      setIsNavOpen(false);
      setBtnToggled(
        "absolute top-25 -right-3 transform transition-transform duration-300 rotate-180"
      );
      setShowNav(
        "max-w-[15%] min-w-fit w-60 h-[80%] bg-[#F0EEE5] flex flex-col border-box border-2 border-black absolute top-1/2 -translate-y-1/2 rounded-br-4xl rounded-tr-4xl transform transition-transform duration-400 -translate-x-[90%] z-[1500]"
      );
    } else if (isNavOpen === false) {
      console.log("nav 연다.");
      setIsNavOpen(true);
      setBtnToggled(
        "absolute top-25 -right-3 transform transition-transform duration-300 "
      );
      setShowNav(
        "max-w-[15%] min-w-fit w-60 h-[80%] bg-[#F0EEE5] flex flex-col border-box border-2 border-black absolute top-1/2 -translate-y-1/2 rounded-br-4xl rounded-tr-4xl transform transition-transform duration-400 z-[1500]"
      );
    }
  }

  return (
    <div className="h-screen">
      <div
        className={showNav}
        onMouseLeave={() => toggleNav()}
        onMouseEnter={() => toggleNav()}
      >
        <button className={btnToggled}>
          <img
            className="w-[24px] h-[24px] cursor-pointer"
            src={navToggle}
            alt="nav 토글 버튼"
          />
        </button>
        <div className="p-5 text-center">
          <NavLink to="/translate">
            <img
              className="w-[clamp(120px,10vw,148px)] h-auto"
              src={Logo}
              alt="닥스훈트 로고"
            />
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
              <IoIosArrowUp className="right-0 mr-5" />
            ) : (
              <IoIosArrowDown className="right-0 mr-5" />
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
          <div className="px-5 py-2.5 flex items-center">
            <img className="w-[24px] h-[24px]" src={memo} alt="메모 아이콘" />
            <span className="ml-5">MEMO</span>
            <FaPlus
              onClick={openModal}
              className="cursor-pointer absolute right-0 mr-5 hover:text-[#BC5B39]"
            />
          </div>
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
        </div>
        <div className="items-center justify-center flex mb-10">
          <RoundCornerBtn
            onClick={() => navigate("/translate")}
            text="뷰어 나가기"
          />
        </div>
      </div>
      <div className="absolute z-[2500]">
        <EditorModal
          title="새 메모"
          fields={[
            {
              label: "제목",
              name: "title",
              type: "text",
              placeholder: "제목을 입력하세요",
              value: memoData.title,
              onChange: handleInputChange,
              required: true,
            },
          ]}
          buttonText="작성 완료"
          isOpen={isOpen}
          closeModal={closeModal}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default LeftNav;
