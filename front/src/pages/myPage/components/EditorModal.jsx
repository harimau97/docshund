import React, { useState } from "react";
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
}) => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => {
      acc[field.name] = field.value || ""; // 기본값 설정
      return acc;
    }, {})
  );
  const editorRef = React.createRef();

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

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        !isOpen ? "hidden" : ""
      } backdrop-blur-xs backdrop-brightness-50`}
    >
      <div className="bg-white w-3/5 h-auto rounded-lg border-1 border-[#E1E1DF] shadow-lg overflow-y-auto z-50">
        <div className="flex justify-between p-4 border-b">
          <button onClick={closeModal} className="text-gray-500 text-2xl">
            <img src={back} alt="뒤로가기" />
          </button>
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
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
                value={formData[field.name]}
                onChange={handleInputChange}
                className="border w-9/10 p-2 rounded focus:outline-none focus:ring-1"
                required={field.required}
              />
            </div>
          ))}
          <Editor
            initialValue="내용을 작성해주세요."
            ref={editorRef}
            height="450px"
            previewStyle="tab"
            useCommandShortcut={true}
          />
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={closeModal}
              className="text-sm rounded-[12px] px-[20px] w-fit h-10 relative hover:bg-[#bc5b39] hover:text-[#ffffff]"
            >
              취소
            </button>
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
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
      required: PropTypes.bool,
    })
  ).isRequired,
  buttonText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default EditorModal;
