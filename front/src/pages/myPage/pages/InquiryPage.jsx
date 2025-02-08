import { useNavigate } from "react-router-dom";

import modalStore from "../../../store/myPageStore/myPageModalStore";
import inquiryStore from "../../../store/myPageStore/inquiryStore";
import InquiryModal from "../components/InquiryModal";
import ListRender from "../../../components/pagination/listRender";
import InquiryService from "../services/inquiryService";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const InquiryPage = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // inquiryStore에서 inquiries와 setInquiries를 가져온다.
  const inquiries = inquiryStore((state) => state.inquiries);
  const setInquiries = inquiryStore((state) => state.setInquiries);

  const totalPages = inquiryStore((state) => state.totalPages);
  const setTotalPages = inquiryStore((state) => state.setTotalPages);
  const currentPage = inquiryStore((state) => state.currentPage);
  const setCurrentPage = inquiryStore((state) => state.setCurrentPage);

  const setLoading = inquiryStore((state) => state.setLoading);
  const setError = inquiryStore((state) => state.setError);

  const { setOpenId, openId, closeModal } = modalStore();

  const [itemsPerPage, setItmesPerPage] = useState(15); // 페이지당 보여줄 게시글 수

  useEffect(() => {
    setLoading(true);

    // inquiries 데이터를 가져오는 함수
    const fetchInquiries = async () => {
      try {
        // 토큰이 존재하면 userId 추출
        if (token) {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.userId;

          // inquiryService의 fetchInquiries 함수를 호출한다.
          const data = await InquiryService.fetchInquiries(
            currentPage,
            itemsPerPage,
            userId
          );

          // data가 존재하면 setInquiries로 데이터를 저장한다.
          if (data) {
            setInquiries(data.content);
            setCurrentPage(data.pageable.pageNumber);
            setTotalPages(data.totalPages);
            setItmesPerPage(data.size);
          }
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    // fetchInquiries 함수를 호출한다.
    fetchInquiries();
  }, [currentPage, itemsPerPage, token]);

  const renderInquiry = (item) => {
    return (
      <div key={item.inquiryId} className="flex-col">
        <div className="flex justify-between text-lg px-3">
          <div className="flex-1 min-w-0 line-clamp-1 break-all mr-3">
            <h3 className="font-semibold text-[#7d7c77]">
              {item.inquiryTitle}
            </h3>
          </div>
          <div className="flex space-x-6 items-center">
            <p>{item.inquiryCreatedAt}</p>
            <p
              className={`text-sm ${
                item.answered ? "text-green-500" : "text-red-500"
              }`}
            >
              {item.answered ? "답변 완료" : "답변 대기"}
            </p>

            <button
              onClick={() => {
                setOpenId(item.inquiryId === openId ? null : item.inquiryId);
              }}
              className="cursor-pointer"
            >
              <span>{openId === item.inquiryId ? "⋏" : "⋎"}</span>
            </button>
          </div>
        </div>
        {item.inquiryId === openId && (
          <InquiryModal item={item} closeModal={closeModal} />
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-between mt-5 mb-5">
        <h1 className="font-bold text-2xl">나의 문의</h1>
        <button
          onClick={() => navigate("/helpDesk/inquiryForm")}
          className="border-box bg-[#bc5b39] rounded-[12px] px-[20px] w-fit h-10 relative flex items-center justify-center text-[#ffffff] hover:bg-[#C96442]"
        >
          + 문의작성
        </button>
      </div>

      <div className="pt-4 pl-6 bg-white rounded-tl-xl rounded-tr-xl border-t border-l border-r border-[#E1E1DF]"></div>
      <div className="p-10 bg-white rounded-bl-xl rounded-br-xl border-b border-l border-r border-[#E1E1DF] text-[#7D7C77]">
        <ListRender
          data={inquiries}
          renderItem={renderInquiry}
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemCategory="inquiry"
        />
      </div>
    </div>
  );
};

export default InquiryPage;
