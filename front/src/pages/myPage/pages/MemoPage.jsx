import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import MemoList from "../components/MemoList";
import EditorModal from "../components/EditorModal";
import modalStore from "../../../store/myPageStore/myPageModalStore";
import useMemoStore from "../../../store/myPageStore/memoStore";

const MemoPage = () => {
  const token = localStorage.getItem("token");

  const { isOpen, openId, openModal, closeModal } = modalStore();
  const { memos, fetchMemos, addMemo, updateMemo, deleteMemo } = useMemoStore();

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      const userId = decoded.userId;
      if (userId) fetchMemos(userId);
    }
  }, [token, fetchMemos]);

  const handleCreateMemo = async (memoData) => {
    if (token) {
      const decoded = jwtDecode(token);
      const userId = decoded.userId;
      if (userId) {
        await addMemo(userId, memoData);
        closeModal();
      }
    }
  };

  const handleEditMemo = async (memoId, memoData) => {
    if (token) {
      const decoded = jwtDecode(token);
      const userId = decoded.userId;
      if (userId) {
        await updateMemo(userId, memoId, memoData);
        closeModal();
      }
    }
  };

  const handleDeleteMemo = async (memoId) => {
    if (token) {
      const decoded = jwtDecode(token);
      const userId = decoded.userId;
      if (userId) {
        await deleteMemo(userId, memoId);
        closeModal();
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between mt-5 mb-5">
        <h1 className="font-bold text-2xl">메모장</h1>
        <button
          onClick={openModal}
          className="border-box bg-[#bc5b39] rounded-[12px] px-[20px] w-fit h-10 text-[#ffffff] hover:bg-[#C96442]"
        >
          + 새 메모
        </button>
      </div>
      <MemoList
        memos={memos}
        onEditMemo={handleEditMemo}
        onDeleteMemo={handleDeleteMemo}
      />
      <EditorModal
        title="새 메모"
        fields={[
          {
            label: "제목",
            name: "title",
            type: "text",
            placeholder: "제목 입력",
            required: true,
          },
        ]}
        buttonText="완료"
        isOpen={isOpen}
        closeModal={closeModal}
        onSubmit={handleCreateMemo}
        memoData={memos.find((memo) => memo.memo_id === openId)}
      />
    </div>
  );
};

export default MemoPage;
