import { useNavigate } from "react-router-dom";
import viewModalStore from "./stores/viewModalStore";
import inquiryStore from "./stores/inquiryStore";
import InquiryModal from "./components/InquiryModal";
import ListRender from "./components/ListRender";

const InquiryPage = () => {
  const navigate = useNavigate();
  const inquiries = inquiryStore((state) => state.inquiries);
  const { setOpenId, closeModal } = viewModalStore();

  const renderInquiry = (item) => {
    return (
      <div key={item.id} className="flex-col">
        <div className="flex justify-between text-lg px-3">
          <div className="flex-1 min-w-0 line-clamp-1 break-all mr-3">
            <h3 className="font-semibold text-[#7d7c77]">{item.title}</h3>
          </div>
          <div className="flex space-x-6 items-center">
            <p>{item.createdAt}</p>
            <p
              className={`text-sm ${
                item.isAnswered ? "text-green-500" : "text-red-500"
              }`}
            >
              {item.isAnswered ? "답변 완료" : "답변 대기"}
            </p>

            <button
              onClick={() => {
                setOpenId(
                  item.id === viewModalStore.getState().openId ? null : item.id
                );
              }}
              className="cursor-pointer"
            >
              <span>
                {viewModalStore.getState().openId === item.id ? "⋏" : "⋎"}
              </span>
            </button>
          </div>
        </div>
        {item.id === viewModalStore.getState().openId && (
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
          onClick={() => navigate("/helpdesk/inquiry")}
          className="border-box bg-[#bc5b39] rounded-[12px] px-[20px] w-fit h-10 relative flex items-center justify-center text-[#ffffff] hover:bg-[#C96442]"
        >
          + 문의작성
        </button>
      </div>

      <div className="pt-4 pl-6 bg-white rounded-tl-xl rounded-tr-xl border-t border-l border-r border-[#E1E1DF]"></div>
      <ListRender
        data={inquiries}
        renderItem={renderInquiry}
        itemsPerPage={5}
      />
    </div>
  );
};

export default InquiryPage;
