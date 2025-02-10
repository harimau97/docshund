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
} from "./hooks/translateGetService.jsx";
import * as motion from "motion/react-client";
// 컴포넌트 import
import TranslateEditor from "./translateEditor.jsx";
import TranslateArchive from "./translateArchive.jsx";
import ToastViewer from "./components/toastViewer.jsx";

import RectBtn from "../../components/button/rectBtn.jsx";

//상태 import
import useModalStore from "../../store/translateStore/translateModalStore.jsx";
import useEditorStore from "../../store/translateStore/editorStore.jsx";
import useArchiveStore from "../../store/translateStore/archiveStore.jsx";

//이미지 import
import loadingGif from "../../assets/loading.gif";
import { Trophy } from "lucide-react";

const TranslateViewer = () => {
  const { docsId } = useParams();
  const [docParts, setDocParts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [processedCount, setProcessedCount] = useState(0);
  //각 문단 별 상태 저장 및 추적
  const [buttonStates, setButtonStates] = useState({});
  const [docpartStates, setDocpartStates] = useState({});
  const [heightStates, setHeightStates] = useState({});
  //
  const [mousePositions, setMousePositions] = useState({}); // 마우스 위치를 저장할 state 추가
  const [checkComplete, setCheckComplete] = useState(false);
  const docData = useRef([]);
  const loadingRef = useRef(null);
  const chunk_size = 20;
  //문단 높이 조절
  const initialHeights = useRef({}); // 초기 높이를 저장할 ref

  //indexedDB 관련 변수
  const dbName = "docs";
  const objectStoreName = docsId;
  const [isDbInitialized, setIsDbInitialized] = useState(false);
  //번역 관련 상태
  const { transList, setTransList } = useArchiveStore();
  const { bestTrans, setBestTrans, setDocsId, setOriginId, setDocsPart } =
    useEditorStore();
  //모달 관련 상태
  const { openEditor, openArchive, toggleArchive, toggleEditor } =
    useModalStore();

  //ui 관련
  const toggleButton = (partId, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;

    // 버튼 컨테이너의 높이 (두 버튼의 높이 + 간격)
    const buttonContainerHeight = -50; // 대략적인 높이값

    // y 위치 제한
    const limitedY = Math.min(
      Math.max(buttonContainerHeight / 2, mouseY),
      rect.height - buttonContainerHeight / 2
    );

    setMousePositions((prev) => ({
      ...prev,
      [partId]: {
        x: e.clientX - rect.left,
        y: limitedY,
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

  const toggleDocpart = (partId) => {
    setDocpartStates((prev) => ({
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
            const data = await fetchTranslateData(docsId, false);
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
    <div className="h-[99%] min-w-[800px] w-[70%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-x-auto overflow-y-scroll p-6 flex flex-col z-[1000] max-w-screen-xl mx-auto">
      <div className="flex flex-col gap-2">
        {docParts.map((part, index) => (
          <div key={index} className="paragraph flex flex-row gap-4 relative">
            <div
              onClick={async (e) => {
                e.stopPropagation();
                if (localStorage.getItem("token")) {
                  toggleButton(part.id, e);
                }
                const tmpTransList = await fetchBestTranslate(
                  part.docsId,
                  "best"
                );
                setTransList(tmpTransList);
                if (tmpTransList !== undefined) {
                  const filteredTranslations = tmpTransList.filter(
                    (item) => item.originId === part.originId
                  );
                  if (filteredTranslations.length > 0) {
                    setBestTrans(filteredTranslations[0].content);
                  } else {
                    setBestTrans("");
                  }
                } else {
                  setBestTrans("");
                }
                toggleDocpart(part.id);
              }}
              className="cursor-pointer p-4 rounded-xl text-[#424242] bg-gray-200 hover:bg-[#cfccc9] hover:shadow-lg flex flex-col w-full transition-all duration-200 shadow-md"
            >
              <div
                ref={(element) => {
                  if (element && !initialHeights.current[part.id]) {
                    // ToastViewer가 렌더링된 후 약간의 지연을 주고 높이를 측정
                    setTimeout(() => {
                      const height = element.offsetHeight;
                      initialHeights.current[part.id] = height + "px";
                      setHeightStates((prev) => ({
                        ...prev,
                        [part.id]: initialHeights.current[part.id],
                      }));
                    }, 50);
                  }
                }}
                style={{ height: heightStates[part.id] }}
              >
                {!docpartStates[part.id] ? (
                  <ToastViewer content={part.content} />
                ) : (
                  <div className="flex justify-between">
                    <ToastViewer content={bestTrans} />
                    {bestTrans !== "" && (
                      <Trophy className="w-6 h-6 shrink-0 m-2 text-yellow-500" />
                    )}
                  </div>
                )}
              </div>
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
                    onClick={async () => {
                      useEditorStore.setState({
                        docsPart: part.content,
                        porder: part.porder,
                        docsId: part.docsId,
                        originId: part.originId,
                      });
                      await openEditor();
                      toggleEditor();
                    }}
                    text="번역하기"
                    className="opacity-90 hover:opacity-100 transition-opacity duration-200 shadow-sm hover:shadow-md w-full"
                  />
                  <RectBtn
                    onClick={async () => {
                      setDocsPart(part.content);
                      setDocsId(part.docsId);
                      console.log("현재docsId", part.docsId);
                      setOriginId(part.originId);
                      await fetchBestTranslate(part.docsId, "");
                      await openArchive();
                      toggleArchive();
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
