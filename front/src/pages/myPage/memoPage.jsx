import { useState } from "react";
import MemoList from "./components/MemoList";
import EditorModal from "./components/EditorModal";
import modalStore from "./stores/modalStore";

const MemoPage = () => {
  const { isOpen, openModal, closeModal } = modalStore();
  const [memoData, setMemoData] = useState({
    title: "",
    content: "",
  });

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

  return (
    <div>
      <div className="flex justify-between mt-5 mb-5">
        <h1 className="font-bold text-2xl">메모장</h1>
        <button
          onClick={openModal}
          className="border-box bg-[#bc5b39] rounded-[12px] px-[20px] w-fit h-10 relative flex items-center justify-center text-[#ffffff] hover:bg-[#C96442]"
        >
          + 새메모
        </button>
      </div>
      <MemoList />
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
  );
};

export default MemoPage;
