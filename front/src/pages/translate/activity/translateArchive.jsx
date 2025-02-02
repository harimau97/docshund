import Modal from "react-modal";
import useModalStore from "../store/modalStore";
import RoundCornerBtn from "../../../components/button/roundCornerBtn";
import useEditorStore from "../store/editorStore";

const TranslateArchive = () => {
  const { isArchiveOpen, closeArchive } = useModalStore();
  const { docsPart, bestTrans, porder, docsId, originId } = useEditorStore();

  return (
    <Modal
      isOpen={isArchiveOpen}
      onRequestClose={closeArchive}
      style={{
        overlay: { backgroundColor: "rgba(240,238,229,0.8)", zIndex: 2000 },
      }}
      className="border-box w-full h-full flex items-center justify-center"
    >
      <div className="relative m-5 p-4 w-full h-[95%] min-w-[40%] min-h-[80%] max-w-full max-h-full rounded-lg bg-white shadow-sm">
        <div className="flex shrink-0 items-center pb-4 text-xl font-medium text-slate-800 justify-between">
          {porder}번째 문단 번역 기록
          <div className="flex space-x-6">
            <RoundCornerBtn onClick={closeArchive} text="나가기" />
          </div>
        </div>
        <div className="relative border-t border-slate-200 py-4 leading-normal text-slate-600 font-light overflow-scroll">
          {/* 에디터 모달 안에 들어갈 컨텐츠 */}
          번역 기록 모달입니다.
        </div>
        <div className="flex shrink-0 flex-wrap items-center pt-4 justify-end"></div>
      </div>
    </Modal>
  );
};

export default TranslateArchive;
