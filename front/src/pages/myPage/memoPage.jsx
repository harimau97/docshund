import MemoList from "./components/MemoList";
import EditorModal from "./components/EditorModal";
import modalStore from "./stores/modalStore";
import useMemoMode from "./hooks/useMemoMode";

const MemoPage = () => {
  const { isOpen, openModal, closeModal } = modalStore();
  const { memoData, handleOpenCreateModal, handleOpenEditModal } =
    useMemoMode();

  const handleSubmitMemo = () => closeModal();

  return (
    <div>
      <div className="flex justify-between mt-5 mb-5">
        <h1 className="font-bold text-2xl">메모장</h1>
        <button
          onClick={() => handleOpenCreateModal(openModal)}
          className="border-box bg-[#bc5b39] rounded-[12px] px-[20px] w-fit h-10 relative flex items-center justify-center text-[#ffffff] hover:bg-[#C96442]"
        >
          + 새메모
        </button>
      </div>
      <MemoList onEditMemo={(memo) => handleOpenEditModal(memo, openModal)} />
      <EditorModal
        title={memoData ? "메모" : "새 메모"}
        fields={[
          {
            label: "제목",
            name: "title",
            type: "text",
            placeholder: "제목을 입력하세요",
            required: true,
          },
        ]}
        buttonText="완료"
        isOpen={isOpen}
        closeModal={closeModal}
        memoData={memoData}
        onSubmit={handleSubmitMemo}
      />
    </div>
  );
};

export default MemoPage;
