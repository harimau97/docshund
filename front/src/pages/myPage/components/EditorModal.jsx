import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import back from "../../../assets/icon/goBack.png";

const EditorModal = ({
  title,
  fields,
  buttonText,
  onSubmit,
  isOpen,
  closeModal,
  memoData,
  onDelete,
}) => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => {
      acc[field.name] = field.value || ""; // 기본값 설정
      return acc;
    }, {})
  );
  const editorRef = useRef();

  useEffect(() => {
    if (isOpen) {
      if (memoData) {
        setFormData({
          title: memoData.title,
          content: memoData.content,
        });
        editorRef.current?.getInstance().setMarkdown(memoData.content || "");
      } else {
        setFormData(
          fields.reduce((acc, field) => {
            acc[field.name] = field.value || "";
            return acc;
          }, {})
        );
        editorRef.current.getInstance().setMarkdown(""); // 에디터 초기화
      }
    }
  }, [isOpen, memoData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const editorContent = editorRef.current.getInstance().getMarkdown();
    onSubmit({ ...formData, content: editorContent });
    closeModal();
  };

  const handleDelete = () => {
    if (memoData && onDelete) {
      onDelete(memoData.memo_id); // Delete memo
      closeModal();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        !isOpen ? "hidden" : ""
      } backdrop-blur-xs backdrop-brightness-50`}
      onClick={handleBackdropClick}
    >
      <div
        className="h-[75vh] bg-white w-3/5 rounded-lg border-1 border-[#E1E1DF] shadow-lg overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between p-4 border-b">
          <button onClick={closeModal}>
            <img src={back} alt="뒤로가기" />
          </button>
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-grow p-4 space-y-4"
        >
          {fields.map((field, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center space-x-4"
            >
              <label className="w-1/10 text-lg font-semibold text-center">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name] || ""}
                onChange={handleInputChange}
                className="border w-9/10 p-2 rounded focus:outline-none focus:ring-1"
                required={field.required}
              />
            </div>
          ))}
          <div className="flex-grow">
            <Editor
              ref={editorRef}
              height="100%"
              previewStyle="tab"
              useCommandShortcut={true}
            />
          </div>
          <div className="flex justify-end space-x-3">
            {memoData && (
              <button
                type="button"
                onClick={handleDelete}
                className="text-sm rounded-[12px] px-[20px] w-fit h-10 relative hover:bg-[#bc5b39] hover:text-[#ffffff]"
              >
                삭제
              </button>
            )}
            <button className="text-sm bg-[#bc5b39] rounded-[12px] px-[20px] w-fit h-10 relative text-[#ffffff] hover:bg-[#C96442]">
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditorModal.propTypes = {
  title: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
  buttonText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  memoData: PropTypes.object,
  onDelete: PropTypes.func,
};

export default EditorModal;
