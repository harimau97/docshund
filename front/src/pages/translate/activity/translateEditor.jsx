import Modal from "react-modal";
// import { AnimatePresence } from "motion/react";
import TextContent from "../components/textContent";
import EditorContent from "../components/editorContent";
import useModalStore from "../store/modalStore";
import RectBtn from "../../../components/button/rectBtn";
import useEditorStore from "../store/editorStore";

const TranslateEditor = () => {
  const { isEditorOpen, closeEditor } = useModalStore();
  const { docsPart, bestTrans, porder, docsId, originId, currentUserText } =
    useEditorStore();

  return (
    <Modal
      isOpen={isEditorOpen}
      onRequestClose={closeEditor}
      style={{
        overlay: { backgroundColor: "rgba(240,238,229,0.8)", zIndex: 2000 },
      }}
      className="border-box w-full h-full flex items-center justify-center"
    >
      <div className="relative m-5 p-4 w-full h-[95%] min-w-[40%] min-h-[80%] max-w-full max-h-full rounded-lg bg-white shadow-sm">
        <div className="flex shrink-0 items-center pb-4 text-xl font-medium text-slate-800 justify-between">
          {porder}번째 문단 번역 중
          <div className="flex space-x-6">
            <RectBtn
              onClick={async () => {
                useEditorStore.setState({ tempSave: currentUserText });
                console.log(useEditorStore.getState().tempSave);
              }}
              text="임시저장"
            />
            <RectBtn onClick={closeEditor} text="제출" />
            <RectBtn onClick={closeEditor} text="편집 나가기" />
          </div>
        </div>
        <div className="relative border-t border-slate-200 py-4 leading-normal text-slate-600 font-light h-full flex flex-col">
          {/* 에디터 모달 안에 들어갈 컨텐츠 */}

          <TextContent
            tag="공식문서 원본"
            textContent={docsPart}
            isHTML={true}
          />
          <br />
          <TextContent
            tag="베스트 번역"
            textContent={bestTrans}
            isHTML={true}
          />
          <div className="flex flex-col h-full w-full translate-[-50%, -50%] top-0 left-1/2 absolute py-4">
            <EditorContent />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TranslateEditor;
