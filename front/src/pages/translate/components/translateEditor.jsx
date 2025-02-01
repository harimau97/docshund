import Modal from "react-modal";
import useModalStore from "../store/modalStore";

const TranslateEditor = () => {
  const { isEditorOpen, closeEditor } = useModalStore();
  return (
    <Modal
      isOpen={isEditorOpen}
      onRequestClose={closeEditor}
      className="border-box border-2 border-black w-[95%] h-[95%] flex items-center justify-center"
      over
    >
      <div className="translate-[-50%, -50%] top-1/2 left-1/2">
        이것은 번역 에디터 모달입니다.
      </div>
    </Modal>
  );
};

export default TranslateEditor;
