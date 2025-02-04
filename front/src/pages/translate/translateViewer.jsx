import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { initDB, addData, loadData } from "./hooks/indexedDbService.jsx";
import {
  fetchTranslateData,
  fetchBestTranslate,
} from "./hooks/translateService.jsx";
import * as motion from "motion/react-client";
import useModalStore from "./store/modalStore.jsx";
import useEditorStore from "./store/editorStore.jsx";
import useArchiveStore from "./store/archiveStore.jsx";
import TranslateEditor from "./activity/translateEditor.jsx";
import TranslateArchive from "./activity/translateArchive.jsx";
import ToastViewer from "./components/toastViewer.jsx";
import RectBtn from "../../components/button/rectBtn.jsx";
import loadingGif from "../../assets/loading.gif";

const TranslateViewer = () => {
  const { docsName } = useParams();
  const [docParts, setDocParts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [processedCount, setProcessedCount] = useState(0);
  const [buttonStates, setButtonStates] = useState({});
  const [mousePositions, setMousePositions] = useState({}); // 마우스 위치를 저장할 state 추가
  const docData = useRef([]);
  const loadingRef = useRef(null);
  const chunk_size = 20;

  //indexedDB 관련 변수
  const dbName = "docs";
  const objectStoreName = docsName;
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
    async function checkDB() {
      setLoading(true);
      try {
        await initDB(dbName, objectStoreName);
        const loadedData = await loadData(objectStoreName);

        if (loadedData.length === 0) {
          console.log("db에 데이터가 없습니다. 데이터 가져오기 시작...");
          setLoading(true);
          try {
            const data = await fetchTranslateData(1, null, false);
            docData.current = data;
            if (data && Array.isArray(data)) {
              await addData(data, objectStoreName);
              console.log(data.length);
            } else {
              throw new Error("Invalid data format received from server");
            }
          } catch (error) {
            console.error("Failed to fetch data from server:", error);
            throw error;
          }
        } else {
          console.log("DB에 해당 문서 데이터가 있습니다.");
          setIsDbInitialized(true);
          docData.current = loadedData;
        }
      } catch (error) {
        console.error("Error in checkDB:", error);
        // 에러 상태를 관리하는 state가 있다면 여기서 설정
      } finally {
        setLoading(false);
      }
    }
    checkDB();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
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

  useEffect(() => {
    if (isDbInitialized) {
      loadMore();
    }
  }, [isDbInitialized]);

  return (
    <div className="h-[99%] min-w-[800px]  w-[70%] absolute top-1/2 left-1/2 -translate-1/2 overflow-x-auto overflow-y-scroll p-4 flex flex-col z-[1000]">
      <div className="flex flex-col gap-3">
        {docParts.map((part, index) => (
          <div key={index} className="flex flex-row gap-3 relative">
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
                  false
                );
                if (transList[0].originId === part.originId) {
                  useEditorStore.setState({ bestTrans: transList[0].content });
                }
              }} // toggleButton에 e를 전달
              className="cursor-pointer p-3 rounded-md text-[#424242] bg-[#E4DCD4] hover:bg-[#cfccc9] transition duration-150 ease-in-out flex flex-col w-full"
            >
              <ToastViewer content={part.content} />
            </div>
            {buttonStates[part.id] && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  scale: {
                    type: "spring",
                    visualDuration: 0.2,
                    bounce: 0.2,
                  },
                }}
              >
                <div
                  className="flex flex-col min-w-fit h-fit z-95 items-center gap-3"
                  style={{
                    position: "relative",
                    top: mousePositions[part.id]?.y || 0, // 저장된 y좌표 사용
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
                    className="opacity-70 w-full"
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
                    className="opacity-70"
                  />
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>

      <div ref={loadingRef} className="py-4 text-center">
        {loading && (
          <div className="flex justify-center items-center" role="status">
            <img
              className="w-[300px] h-[300px]"
              src={loadingGif}
              alt="로딩 애니메이션"
            />
          </div>
        )}
        {!hasMore && <div>모든 문서를 불러왔습니다.</div>}
      </div>
      <TranslateEditor className="z-auto" />
      <TranslateArchive className="z-auto" />
    </div>
  );
};

export default TranslateViewer;
