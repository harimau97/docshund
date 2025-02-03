import { useRef } from "react";
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

  return (
    <div className="flex flex-col h-full w-1/2">
      <Editor
        ref={editorRef}
        initialValue={"첫 번째 번역의 주인공이 되세요!"}
        height="95%"
        initialEditType="markdown" // or 'wysiwyg'
        previewStyle="vertical" // or 'tab'
        onChange={handleEditorChange}
        theme="dark" // 필요에 따라 테마 설정
      />
    </div>
  );
};

export default EditorContent;
