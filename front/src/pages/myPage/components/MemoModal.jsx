import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import MDEditor from "@uiw/react-md-editor";
import { ArrowLeft } from "lucide-react"; // lucide 아이콘 임포트
import useEditorStore from "../../../store/translateStore/editorStore";
import { toast } from "react-toastify";

const MAX_TITLE_LENGTH = 50;
const MAX_CONTENT_LENGTH = 15000;

const MemoModal = ({
  title,
  buttonText,
  onSubmit,
  isOpen,
  closeModal,
  memoData,
  onDelete,
}) => {
  const [formData, setFormData] = useState({ title: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setCurrentUserText, currentUserText } = useEditorStore();

  useEffect(() => {
    if (isOpen) {
      if (memoData) {
        setFormData({ title: memoData.title || "" });
        setCurrentUserText(memoData.content || "");
      } else {
        setFormData({ title: "" });
        setCurrentUserText("");
      }
      // 모달이 열릴 때 제출 상태 초기화
      setIsSubmitting(false);
    } else {
      setFormData({ title: "" });
      setCurrentUserText("");
    }
  }, [isOpen, memoData, setCurrentUserText]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "title" && value.length <= MAX_TITLE_LENGTH) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleEditorChange = (value = "") => {
    if (value.length <= MAX_CONTENT_LENGTH) {
      setCurrentUserText(value);
    } else {
      toast.warn(`최대 ${MAX_CONTENT_LENGTH}자 까지만 입력가능합니다.`);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    const currentText = currentUserText || "";
    const remaining = MAX_CONTENT_LENGTH - currentText.length;
    if (remaining <= 0) {
      toast.warn(`최대 ${MAX_CONTENT_LENGTH}자 까지만 입력 가능합니다.`);
      return;
    }
    let textToPaste = pastedText;
    if (pastedText.length > remaining) {
      textToPaste = pastedText.substring(0, remaining);
      toast.warn(`최대글자수를 넘어 일부만 붙여넣어집니다.`);
    }
    setCurrentUserText(currentText + textToPaste);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 이미 제출 중이면 중복 제출 방지
    if (isSubmitting) return;

    setIsSubmitting(true);
    const editorContent = currentUserText;
    const submitData = { ...formData, content: editorContent };
    if (memoData && memoData.memoId) {
      onSubmit(memoData.memoId, submitData);
    } else {
      onSubmit(submitData);
    }
  };

  const handleDelete = () => {
    if (memoData && onDelete) {
      onDelete(memoData.memoId);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 backdrop-brightness-60 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white w-full max-w-lg mx-auto rounded-lg border border-[#E1E1DF] shadow-lg overflow-hidden flex flex-col max-h-[90vh]"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="flex justify-between p-4 border-b">
              <button onClick={closeModal} className="cursor-pointer">
                <ArrowLeft className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
              <h2 className="text-lg font-semibold">{title}</h2>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col p-4 sm:p-6 space-y-4 overflow-auto"
            >
              <div>
                <label className="block text-lg font-medium text-black mb-2">
                  제목 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="제목을 입력하세요"
                  value={formData.title}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  maxLength={MAX_TITLE_LENGTH}
                  className="mt-1 block w-full py-2 px-3 border rounded-md shadow-sm focus:outline-none focus:ring-[#bc5b39] focus:border-[#bc5b39] sm:text-sm"
                  required
                />
                <p className="text-xs text-gray-500 mt-1 mr-2 text-right">
                  {formData.title.length} / {MAX_TITLE_LENGTH}
                </p>
              </div>
              <div data-color-mode="light">
                <MDEditor
                  value={currentUserText}
                  onChange={handleEditorChange}
                  preview="edit"
                  height={300}
                  placeholder="내용을 입력하세요..."
                  maxLength={MAX_CONTENT_LENGTH}
                  textareaProps={{
                    onPaste: handlePaste,
                  }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1 mr-2 text-right">
                {currentUserText.length} / {MAX_CONTENT_LENGTH}
              </p>

              <div className="flex justify-end space-x-3">
                {memoData && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="text-sm rounded-[12px] px-[20px] h-10 hover:bg-[#bc5b39] hover:text-[#ffffff] cursor-pointer"
                  >
                    삭제
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`text-sm rounded-[12px] px-[20px] h-10 text-[#ffffff] ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#bc5b39] hover:bg-[#C96442] cursor-pointer"
                  }`}
                >
                  {buttonText}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

MemoModal.propTypes = {
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  memoData: PropTypes.object,
  onDelete: PropTypes.func,
};

export default MemoModal;
