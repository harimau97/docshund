import { useRef, useEffect } from "react";
import { Editor } from "@toast-ui/react-editor";
import useEditorStore from "../store/editorStore";
import "@toast-ui/editor/dist/toastui-editor.css";

const EditorContent = () => {
  const editorRef = useRef(null);
  const { docsPart, bestTrans, setCurrentUserText } = useEditorStore();

  const handleEditorChange = () => {
    if (editorRef.current) {
      const editorInstance = editorRef.current.getInstance();
      const markdownContent = editorInstance.getMarkdown();
      setCurrentUserText(markdownContent);
    }
  };

  useEffect(() => {
    setCurrentUserText(docsPart);
  }, [docsPart]);

  return (
    <div className="flex flex-col h-full w-full">
      <Editor
        ref={editorRef}
        initialValue={docsPart}
        height="100%"
        initialEditType="markdown" // or 'wysiwyg'
        previewStyle="tab" // or 'tab'
        onChange={handleEditorChange}
        theme="dark" // 필요에 따라 테마 설정
        toolbarItems={[
          ["heading", "bold", "italic", "strike"], // 기본 버튼만 추가
          ["hr", "quote"],
          ["ul", "ol", "task"],
          ["table", "link"], // 이미지 버튼 제외
          ["code", "codeblock"],
        ]}
        useImageUpload={false}
      />
    </div>
  );
};

export default EditorContent;
