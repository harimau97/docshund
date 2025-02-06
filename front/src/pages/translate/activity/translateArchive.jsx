import { useState, useEffect, useRef } from "react";
import {
  fetchBestTranslate,
  fetchLikedTranslateList,
} from "../hooks/translateGetService.jsx";
import { likeTranslate } from "../hooks/translatePostService.jsx";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import Modal from "react-modal";
import useModalStore from "../store/modalStore";
import GoBack from "../../../assets/icon/goBack.png";
import useEditorStore from "../store/editorStore";
import useArchiveStore from "../store/archiveStore";
import useTestStore from "../store/testStore.jsx";
import ToastViewer from "../components/toastViewer.jsx";

const TranslateArchive = () => {
  const translateLikes = useRef([]);
  const [transStates, setTransStates] = useState({});
  const [likedStates, setLikedStates] = useState({});
  const { docsPart, bestTrans, docsId, originId, currentUserText } =
    useEditorStore();
  const {
    transList,
    orderByLike,
    orderBy,
    defaultStyle,
    toggledStyle,
    orderByUpdatedAt,
    setTransList,
    clearTransList,
  } = useArchiveStore();
  const { isTest } = useTestStore();

  //모달 관련 상태
  const { isArchiveOpen, closeArchive, isArchiveVisible, toggleArchive } =
    useModalStore();

  const toggleTransContent = (transId) => {
    setTransStates((prev) => ({
      ...Object.keys(prev).reduce((acc, key) => {
        if (key !== transId) {
          acc[key] = false;
        }
        return acc;
      }, {}),
      [transId]: !prev[transId],
    }));
  };

  const handleLike = async (docsId, transId) => {
    setLikedStates((prev) => {
      const newState = { ...prev };
      newState[transId] = !prev[transId];
      return newState;
    });
    likeTranslate(docsId, transId);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBestTranslate(docsId, "", isTest);
      setTransList(data);
    };

    // const checkLiked = async () => {
    //   translateLikes.current = await fetchLikedTranslateList(
    //     localStorage.getItem("userId")
    //   );
    // };
    // console.log(
    //   "검색 기준이 변경되었습니다. 다시 검색합니다. 현재 검색 기준: ",
    //   orderBy,
    //   "docsID",
    //   docsId,
    //   "originID",
    //   originId
    // );
    fetchData();
    // checkLiked();
    console.log("번역 전체", transList);
  }, []);

  return (
    <Modal
      isOpen={isArchiveOpen}
      closeTimeoutMS={0}
      style={{
        overlay: {
          backgroundColor: "rgba(240,238,229,0.8)",
          zIndex: 2000,
        },
      }}
      onKeyDown={(e) => {
        {
          if (e.key === "Escape") {
            toggleArchive();
          }
        }
      }}
      className="border-box w-full h-full flex items-center justify-center"
    >
      <AnimatePresence>
        {isArchiveVisible ? (
          <motion.div
            key="archive-modal"
            initial={{ opacity: 0, y: 1000 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 1000 }}
            transition={{
              ease: "easeInOut",
              duration: 0.5,
            }}
            className="fixed inset-0 flex items-center justify-center min-w-full min-h-full "
          >
            <div className="relative m-5 p-6 w-1/2 h-[95%] min-w-[768px] min-h-[80%] max-w-full max-h-full rounded-2xl bg-white shadow-lg overflow-y-scroll transition-all duration-300 ease-in-out">
              <div className="flex shrink-0 pb-6 text-2xl font-semibold text-slate-800 justify-between items-center">
                <img
                  src={GoBack}
                  className="cursor-pointer w-[40px] h-[25px] hover:scale-110 transition-transform duration-200"
                  alt="나가기"
                  onClick={async () => {
                    await toggleArchive();
                    setTimeout(() => closeArchive(), 300);
                  }}
                />
                <span className="flex-1 text-center">
                  {originId}번째 문단 번역 기록
                </span>
                <div className="w-[40px]"></div>
              </div>
              <div className="relative border-t border-slate-200 py-6 leading-normal text-slate-600 font-light h-9/10 flex flex-col gap-4">
                <div className="flex justify-end gap-4 mb-2">
                  <div
                    onClick={() => {
                      useArchiveStore.setState({
                        orderByLike: false,
                        orderByUpdatedAt: true,
                        orderBy: "newest",
                      });
                    }}
                    className={`${
                      orderByUpdatedAt ? toggledStyle : defaultStyle
                    } transition-all duration-200 hover:shadow-md`}
                  >
                    최신순
                  </div>
                  <div
                    onClick={() => {
                      useArchiveStore.setState({
                        orderByLike: true,
                        orderByUpdatedAt: false,
                        orderBy: "like",
                      });
                    }}
                    className={`${
                      orderByLike ? toggledStyle : defaultStyle
                    } transition-all duration-200 hover:shadow-md`}
                  >
                    좋아요순
                  </div>
                </div>
                <div>
                  {transList.filter((trans) => trans.originId === originId)
                    .length === 0 && (
                    <div className="text-center text-gray-500 mt-12 text-lg font-medium animate-pulse">
                      첫 번째 번역의 주인공이 되세요!
                    </div>
                  )}
                </div>
                {transList.map((trans) => {
                  if (trans.originId === originId) {
                    return (
                      <div
                        key={trans.transId}
                        className="w-full flex flex-col bg-white border border-[#87867F] py-4 px-5 rounded-xl hover:shadow-lg transition-all duration-300 ease-in-out"
                      >
                        <div
                          onClick={() => {
                            toggleTransContent(trans.transId);
                          }}
                          className="flex flex-row justify-between cursor-pointer items-center"
                        >
                          <div className="flex flex-col gap-1">
                            <div className="text-lg font-medium">
                              {trans.userId}님의 번역본
                            </div>
                            <div className="text-sm text-gray-500">
                              {trans.updatedAt}
                            </div>
                          </div>

                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLike(docsId, trans.transId);
                            }}
                            className={`flex w-1/5 items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer right-5 top-1/2  ${
                              (likedStates[trans.transId] &&
                                !trans.likeUserIds.includes(
                                  Number(localStorage.getItem("userId"))
                                )) ||
                              (!likedStates[trans.transId] &&
                                trans.likeUserIds.includes(
                                  Number(localStorage.getItem("userId"))
                                ))
                                ? "bg-red-600 text-white"
                                : "bg-gray-300"
                            }`}
                          >
                            <span
                              className={
                                (likedStates[trans.transId] &&
                                  !trans.likeUserIds.includes(
                                    Number(localStorage.getItem("userId"))
                                  )) ||
                                (!likedStates[trans.transId] &&
                                  trans.likeUserIds.includes(
                                    Number(localStorage.getItem("userId"))
                                  ))
                                  ? "text-white"
                                  : "text-slate-700"
                              }
                            >
                              좋아요
                            </span>
                            <span
                              className={`font-semibold ${
                                (likedStates[trans.transId] &&
                                  !trans.likeUserIds.includes(
                                    Number(localStorage.getItem("userId"))
                                  )) ||
                                (!likedStates[trans.transId] &&
                                  trans.likeUserIds.includes(
                                    Number(localStorage.getItem("userId"))
                                  ))
                                  ? "text-white"
                                  : "text-slate-900"
                              }`}
                            >
                              {/* {trans.likeCount} */}
                            </span>
                          </div>
                        </div>

                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            transStates[trans.transId]
                              ? "max-h-[500px] opacity-100"
                              : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="border-t border-slate-200 mt-4 pt-4 px-2 text-slate-700 leading-relaxed">
                            <ToastViewer content={trans.content} />
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </Modal>
  );
};

export default TranslateArchive;
