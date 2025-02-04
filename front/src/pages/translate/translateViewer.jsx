import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  initDB,
  addData,
  loadData,
  closeAllConnections,
} from "./hooks/indexedDbService.jsx";
import {
  fetchTranslateData,
  fetchBestTranslate,
} from "./hooks/translateService.jsx";
import * as motion from "motion/react-client";
import useModalStore from "./store/modalStore.jsx";
import useEditorStore from "./store/editorStore.jsx";
import useArchiveStore from "./store/archiveStore.jsx";
import AlertModal from "../../components/emptyModal/alertModal.jsx";
import useAlertStore from "../../store/alertStore.jsx";
import TranslateEditor from "./activity/translateEditor.jsx";
import TranslateArchive from "./activity/translateArchive.jsx";
import ToastViewer from "./components/toastViewer.jsx";
import RectBtn from "../../components/button/rectBtn.jsx";

//이미지
import loadingGif from "../../assets/loading.gif";
import warning from "../../assets/icon/warning.png";
//

const TranslateViewer = () => {
  const { docsId } = useParams();
  const [docParts, setDocParts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [processedCount, setProcessedCount] = useState(0);
  const [buttonStates, setButtonStates] = useState({});
  const [mousePositions, setMousePositions] = useState({}); // 마우스 위치를 저장할 state 추가
  const [checkComplete, setCheckComplete] = useState(false);
  const docData = useRef([]);
  const loadingRef = useRef(null);
  const chunk_size = 20;

  // 알림창 관련
  const { isAlertOpen, toggleAlert } = useAlertStore();

  //indexedDB 관련 변수
  const dbName = "docs";
  const objectStoreName = docsId;
  const [isDbInitialized, setIsDbInitialized] = useState(false);

  //번역 에디터, 투표 관련 모달
  const { openEditor, openArchive } = useModalStore();
  const { transList } = useArchiveStore();

  //ui 관련
  const toggleButton = (partId, e) => {
    // 클릭 이벤트 객체 e를 받도록 수정
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePositions((prev) => ({
      // 클릭한 위치 저장
      ...prev,
      [partId]: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      },
    }));

    setButtonStates((prev) => ({
      ...Object.keys(prev).reduce((acc, key) => {
        if (key !== partId) {
          acc[key] = false;
        }
        return acc;
      }, {}),
      [partId]: !prev[partId],
    }));
  };

  // 문서 내용 전부 가져오기
  const loadMore = async () => {
    if (loading || !hasMore) return;
    try {
      setLoading(true);
      // 인위적인 지연 추가 (개발용)
      await new Promise((resolve) => setTimeout(resolve, 600));
      const data = docData.current;
      if (!data || data.length === 0) {
        console.log("오류 발생 : 데이터 없음");
        return;
      }
      const newChunk = data.slice(processedCount, processedCount + chunk_size);
      if (!newChunk || newChunk.length === 0) {
        setHasMore(false);
        return;
      }
      //element.content가 null이나 undefined일 경우 ""로 대체 ==> React의 불변성 패턴
      const processedChunk = newChunk.map((element) => ({
        ...element,
        content: element.content || "",
      }));
      //전개 연산자 사용 : 두 객체들을 쉽게 합칠 수 있음.
      setDocParts((prev) => [...prev, ...processedChunk]);
      setProcessedCount((prev) => prev + chunk_size);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true; // 컴포넌트 마운트 상태 추적
    closeAllConnections();
    toggleAlert(3000); // 새로운 문서에 들어갈 경우를 위해 기존 db와 연결 해제
    // 상태 초기화
    setDocParts([]);
    setProcessedCount(0);
    setHasMore(true);
    setCheckComplete(false);
    setIsDbInitialized(false); // 여기로 이동
    docData.current = [];

    async function checkDB() {
      if (!isMounted) return; // 컴포넌트가 언마운트되었다면 중단
      setLoading(true);

      try {
        console.log("Initializing DB for docsId:", docsId); // 디버깅용
        await initDB(dbName, objectStoreName);
        const loadedData = await loadData(objectStoreName);
        console.log("Loaded data from DB:", loadedData.length); // 디버깅용

        if (!isMounted) return; // 비동기 작업 후 마운트 상태 다시 확인

        if (!loadedData || loadedData.length === 0) {
          console.log("Fetching data from server for docsId:", docsId); // 디버깅용
          try {
            const data = await fetchTranslateData(docsId, null, true);
            if (!isMounted) return;
            if (data && Array.isArray(data)) {
              docData.current = data;
              await addData(data, objectStoreName);
              console.log("Server data saved, length:", data.length); // 디버깅용
              if (isMounted) {
                setIsDbInitialized(true);
                await loadMore(); // 여기서 바로 loadMore 실행
                setCheckComplete(true);
              }
            } else {
              throw new Error("Invalid data format received from server");
            }
          } catch (error) {
            console.error("Failed to fetch data from server:", error);
          }
        } else {
          console.log("Using cached data from IndexedDB"); // 디버깅용
          if (isMounted) {
            docData.current = loadedData;
            setIsDbInitialized(true);
            await loadMore(); // 여기서도 바로 loadMore 실행
            setCheckComplete(true);
          }
        }
      } catch (error) {
        console.log("Error in checkDB:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    checkDB();

    // 클린업 함수
    return () => {
      isMounted = false;
    };
  }, [docsId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && checkComplete) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );
    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }
    return () => observer.disconnect();
  }, [hasMore, loading, processedCount]);

  // Race Condition Prevention Pattern : useEffect에서 함수가 동시 실행되는 것을 방지

  return (
    <div className="h-[99%] min-w-[800px] w-[70%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-x-auto overflow-y-scroll p-6 flex flex-col z-[1000] ">
      <AlertModal
        imgSrc={warning}
        alertTitle={"알림"}
        alertText={
          "[서비스 이용 안내]\n\n" +
          "1. 이 번역본은 공식 번역이 아니며, 원본의 정확성과 완전성을 보장하지 않습니다.\n" +
          "2. 참고용으로만 사용하시고, 공식 정보를 확인하시려면 원본 문서를 직접 참조하시기 바랍니다.\n\n" +
          "3. 본 서비스는 공익적인 목적을 위해 제공되며, 상업적 이용 시 발생하는 모든 법적 책임은 해당 사용자에게 있으며, 서비스 제공자는 이에 대한 책임을 지지 않습니다."
        }
        isVisible={isAlertOpen}
      />
      <div className="flex flex-col gap-4">
        {docParts.map((part, index) => (
          <div key={index} className="flex flex-row gap-4 relative">
            <div
              onClick={async (e) => {
                e.stopPropagation();
                toggleButton(part.id, e);
                fetchBestTranslate(
                  part.docsId,
                  part.originId,
                  "like",
                  10,
                  1,
                  true
                );
                if (transList[0].originId === part.originId) {
                  useEditorStore.setState({ bestTrans: transList[0].content });
                }
              }}
              className="cursor-pointer p-5 rounded-xl text-[#424242] bg-[#E4DCD4] hover:bg-[#cfccc9] hover:shadow-lg transition-all duration-200 ease-in-out flex flex-col w-full shadow-md"
            >
              <ToastViewer content={part.content} />
            </div>
            {buttonStates[part.id] && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  scale: {
                    type: "spring",
                    visualDuration: 0.2,
                    bounce: 0.25,
                  },
                }}
              >
                <div
                  className="flex flex-col min-w-fit h-fit z-95 items-center gap-4"
                  style={{
                    position: "relative",
                    top: mousePositions[part.id]?.y || 0,
                    transform: "translate(0px,-50%)",
                  }}
                >
                  <RectBtn
                    onClick={() => {
                      openEditor();
                      useEditorStore.setState({
                        docsPart: part.content,
                        porder: part.porder,
                        docsId: part.docsId,
                        originId: part.originId,
                      });
                    }}
                    text="번역하기"
                    className="opacity-90 hover:opacity-100 transition-opacity duration-200 shadow-sm hover:shadow-md w-full"
                  />
                  <RectBtn
                    onClick={async () => {
                      await openArchive();
                      useEditorStore.setState({
                        docsPart: part.content,
                        porder: part.porder,
                        docsId: part.docsId,
                        originId: part.originId,
                      });
                    }}
                    text="번역기록"
                    className="opacity-90 hover:opacity-100 transition-opacity duration-200 shadow-sm hover:shadow-md"
                  />
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>

      <div ref={loadingRef} className="py-6 text-center">
        {loading && (
          <div className="flex justify-center items-center" role="status">
            <img
              className="w-[250px] h-[250px]"
              src={loadingGif}
              alt="로딩 애니메이션"
            />
          </div>
        )}
        {!hasMore && (
          <div className="text-gray-600 font-medium">
            모든 문서를 불러왔습니다.
          </div>
        )}
      </div>
      <TranslateEditor className="z-auto" />
      <TranslateArchive className="z-auto" />
    </div>
  );
};

export default TranslateViewer;
