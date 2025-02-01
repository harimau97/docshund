import Modal from "react-modal";
import useModalStore from "../store/modalStore";

const TranslateArchive = () => {
  const { isArchiveOpen, closeArchive } = useModalStore();
  return (
    <Modal
      isOpen={isArchiveOpen}
      onRequestClose={closeArchive}
      className="border-box border-2 border-black w-[95%] h-[95%] flex items-center justify-center"
    >
      <h1>이것은 번역 기록 모달입니다.</h1>
    </Modal>
  );
};

export default TranslateArchive;
