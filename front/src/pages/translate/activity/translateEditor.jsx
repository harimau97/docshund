import Modal from "react-modal";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import AlertModal from "../../../components/emptyModal/alertModal";
import TextContent from "../components/textContent";
import EditorContent from "../components/editorContent";
import useModalStore from "../store/modalStore";
import useAlertStore from "../../../store/alertStore";
import useEditorStore from "../store/editorStore";
import RectBtn from "../../../components/button/rectBtn";
import check from "../../../assets/icon/check.svg";

const TranslateEditor = () => {
  const { isEditorOpen, closeEditor } = useModalStore();
  const { docsPart, bestTrans, porder, docsId, originId, currentUserText } =
    useEditorStore();
  const { isAlertOpen, toggleAlert } = useAlertStore();

  return (
    <Modal
      isOpen={isEditorOpen}
      onRequestClose={closeEditor}
      closeTimeoutMS={0}
      style={{
        overlay: {
          backgroundColor: "rgba(240,238,229,0.8)",
          zIndex: 2000,
        },
      }}
      className="border-box w-full h-full flex items-center justify-center"
    >
      <AnimatePresence>
        {isEditorOpen ? (
          <motion.div
            key="alert-modal"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              scale: {
                type: "tween",
                ease: "easeInOut",
                duration: 0.3,
              },
            }}
            className="fixed inset-0 flex items-center justify-center min-w-full min-h-full "
          >
            <AlertModal
              imgSrc={check}
              alertTitle="임시 저장 완료"
              alertText=""
              isVisible={isAlertOpen}
            />

            <div className="relative m-5 p-4 w-full h-[95%] min-w-[768px] min-h-[80%] max-w-full max-h-[95%] rounded-lg bg-white shadow-sm">
              <div className="flex shrink-0 w-full items-center pb-4 text-xl font-medium text-slate-800 justify-between">
                <div className="flex items-center gap-2 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-200 transition-all duration-300 hover:bg-slate-100">
                  <svg
                    className="w-5 h-5 text-slate-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  <span className="text-base font-semibold text-slate-700">
                    {porder}번째 문단
                  </span>
                  <span className="text-sm text-slate-600">번역 중</span>
                </div>
                <div className="flex space-x-6 ">
                  <RectBtn
                    onClick={async () => {
                      useEditorStore.setState({ tempSave: currentUserText });
                      await toggleAlert(1500);
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
          </motion.div>
        ) : null}
      </AnimatePresence>
    </Modal>
  );
};

export default TranslateEditor;
