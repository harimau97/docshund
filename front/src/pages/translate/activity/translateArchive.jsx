import { useState, useEffect } from "react";
import { fetchBestTranslate } from "../hooks/translateService.jsx";
import Modal from "react-modal";
import useModalStore from "../store/modalStore";
import GoBack from "../../../assets/icon/goBack.png";
import useEditorStore from "../store/editorStore";
import useArchiveStore from "../store/archiveStore";

const TranslateArchive = () => {
  const { isArchiveOpen, closeArchive } = useModalStore();
  const [transStates, setTransStates] = useState({});
  const { docsPart, bestTrans, porder, docsId, originId, currentUserText } =
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

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBestTranslate(
        docsId,
        originId,
        orderBy,
        10,
        1,
        true
      );
      setTransList(data);
    };
    console.log(
      "검색 기준이 변경되었습니다. 다시 검색합니다. 현재 검색 기준: ",
      orderBy
    );
    fetchData();
  }, [orderBy]);

  return (
    <Modal
      isOpen={isArchiveOpen}
      onRequestClose={closeArchive}
      style={{
        overlay: { backgroundColor: "rgba(240,238,229,0.8)", zIndex: 2000 },
      }}
      className="border-box w-full h-full flex items-center justify-center"
    >
      <div className="relative m-5 p-4 w-1/2 h-[95%] min-w-[768px] min-h-[80%] max-w-full max-h-full rounded-lg bg-white shadow-sm overflow-y-scroll">
        <div className="flex shrink-0 pb-4 text-xl font-medium text-slate-800 justify-between">
          <img
            src={GoBack}
            className="cursor-pointer w-[40px] h-[25px]"
            alt="나가기"
            onClick={closeArchive}
          />
          {porder}번째 문단 번역 기록
        </div>
        <div className="relative border-t border-slate-200 py-4 leading-normal text-slate-600 font-light h-9/10 flex flex-col gap-3">
          {/* 에디터 모달 안에 들어갈 컨텐츠 */}
          <div className="flex justify-end gap-3">
            <div
              onClick={() => {
                useArchiveStore.setState({
                  orderByLike: false,
                  orderByUpdatedAt: true,
                  orderBy: "newest",
                });
              }}
              className={orderByUpdatedAt ? toggledStyle : defaultStyle}
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
              className={orderByLike ? toggledStyle : defaultStyle}
            >
              좋아요순
            </div>
          </div>
          <div>
            {transList.filter((trans) => trans.originId === originId).length ===
              0 && (
              <div className="text-center text-gray-500 mt-10">
                첫 번째 번역의 주인공이 되세요!
              </div>
            )}
          </div>
          {transList.map((trans) => {
            return (
              <div key={trans.transId}>
                {trans.pOrder === porder && (
                  <div
                    key={trans.transId}
                    className="w-full flex flex-col bg-white border-[#87867F] border-1 py-4 rounded-xl"
                  >
                    <div
                      onClick={() => {
                        toggleTransContent(trans.transId);
                      }}
                      className="flex flex-row justify-between cursor-pointer "
                    >
                      <div className="flex flex-col pl-2">
                        <div>{trans.nickname}님의 번역본</div>
                        <div>{trans.updatedAt}</div>
                      </div>
                      <div className="flex flex-col justify-center pr-2">
                        {trans.likeCount}
                      </div>
                    </div>
                    {transStates[trans.transId] && (
                      <div className="border-t-1 border-slate-200 px-2 py-2 transition duration-300 ease-in-out">
                        {trans.content}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

export default TranslateArchive;
