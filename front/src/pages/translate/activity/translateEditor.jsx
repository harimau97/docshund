import Modal from "react-modal";
import AlertModal from "../../../components/emptyModal/alertModal";
import TextContent from "../components/textContent";
import EditorContent from "../components/editorContent";
import useModalStore from "../store/modalStore";
import useAlertStore from "../../../store/alertStore";
import useEditorStore from "../store/editorStore";
import RectBtn from "../../../components/button/rectBtn";

const TranslateEditor = () => {
  const { isEditorOpen, closeEditor } = useModalStore();
  const { docsPart, bestTrans, porder, docsId, originId, currentUserText } =
    useEditorStore();
  const { isAlertOpen, toggleAlert } = useAlertStore();

  return (
    <Modal
      isOpen={isEditorOpen}
      onRequestClose={closeEditor}
      style={{
        overlay: { backgroundColor: "rgba(240,238,229,0.8)", zIndex: 2000 },
      }}
      className="border-box w-full h-full flex items-center justify-center"
    >
      {isAlertOpen && (
        <AlertModal
          imgSrc="https://upload.wikimedia.org/wikipedia/commons/3/3b/Eo_circle_green_checkmark.svg"
          alertTitle="임시 저장 완료"
          alertText=""
          isVisible={isAlertOpen}
        />
      )}
      <div className="relative m-5 p-4 w-full h-[95%] min-w-[768px] min-h-[80%] max-w-full max-h-[95%] rounded-lg bg-white shadow-sm">
        <div className="flex shrink-0 w-full items-center pb-4 text-xl font-medium text-slate-800 justify-between">
          {porder}번째 문단 번역 중
          <div className="flex space-x-6 ">
            <RectBtn
              onClick={async () => {
                useEditorStore.setState({ tempSave: currentUserText });
                await toggleAlert();
              }}
              text="임시저장"
            />
            <RectBtn onClick={closeEditor} text="제출하기" />
            <RectBtn onClick={closeEditor} text="나가기" />
          </div>
        </div>
        <div className="border-t border-slate-200 pt-2 leading-normal text-slate-600 h-[calc(100%-3rem)] w-full flex gap-2">
          {/* 에디터 모달 안에 들어갈 컨텐츠 */}
          <div className="h-full w-1/2 flex flex-col space-y-2 overflow-hidden">
            <TextContent tag="공식문서 원본" textContent={docsPart} />
            <TextContent tag="베스트 번역" textContent={bestTrans} />
          </div>

          <div className="h-full w-1/2 right-1/2">
            <EditorContent />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TranslateEditor;
