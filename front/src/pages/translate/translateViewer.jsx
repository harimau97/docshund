import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

// 컴포넌트 import
import TranslateEditor from "./translateEditor.jsx";
import TranslateArchive from "./translateArchive.jsx";
import ToastViewer from "./components/toastViewer.jsx";

//우클릭 커스타마이즈
import "react-contexify/dist/ReactContexify.css";

import {
  Menu,
  Item,
  Separator,
  Submenu,
  useContextMenu,
} from "react-contexify";

// 상태 import
import useModalStore from "../../store/translateStore/translateModalStore.jsx";
import useEditorStore from "../../store/translateStore/editorStore.jsx";
import useArchiveStore from "../../store/translateStore/archiveStore.jsx";

// 이미지 import
import loadingGif from "../../assets/loading.gif";
import { Trophy } from "lucide-react";
import Korean from "../../assets/icon/korean.png";
import { createPortal } from "react-dom";

const TranslateViewer = () => {
  const navigate = useNavigate();
  const { docsId } = useParams();
  const [docParts, setDocParts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [processedCount, setProcessedCount] = useState(0);
  // 각 문단 별 상태 저장 및 추적
  const [buttonStates, setButtonStates] = useState({});
  const [docpartStates, setDocpartStates] = useState({});
  const [heightStates, setHeightStates] = useState({});
  // 마우스 위치 저장 (컨텍스트 메뉴 위치 조정용)
  const [mousePositions, setMousePositions] = useState({});
  const [checkComplete, setCheckComplete] = useState(false);
  const docData = useRef([]);
  const loadingRef = useRef(null);
  const chunk_size = 20;
  // 문단 높이 조절을 위한 초기 높이 저장 ref
  const initialHeights = useRef({});
  //우클릭메뉴 커스텀을 위한 상태
  const [contextMenuDocsName, setContextMenuDocsName] = useState("");
  const [contextMenuOriginId, setContextMenuOriginId] = useState(0);

  // indexedDB 관련 변수
  const dbName = "docs";
  const objectStoreName = docsId;
  const [isDbInitialized, setIsDbInitialized] = useState(false);

  // 번역 관련 상태
  const { transList, setTransList } = useArchiveStore();
  const { bestTrans, setBestTrans, setDocsId, setOriginId, setDocsPart } =
    useEditorStore();
  // 모달 관련 상태
  const { openEditor, openArchive, toggleArchive, toggleEditor } =
    useModalStore();

  // 우클릭 또는 버튼 클릭 시 UI 상태 토글
  const toggleButton = (partId, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    // 버튼 컨테이너의 높이 (대략적인 높이값)
    const buttonContainerHeight = 100;
    // y 위치 제한 (컨테이너 내부에서 적절한 위치 조정)
    const limitedY = Math.min(
      Math.max(buttonContainerHeight / 2, mouseY),
      rect.height - buttonContainerHeight / 5
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

  // 문서 내용을 청크 단위로 불러오기
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
      // element.content가 null 또는 undefined일 경우 ""로 대체
      const processedChunk = newChunk.map((element) => ({
        ...element,
        content: element.content || "",
      }));
      setDocParts((prev) => [...prev, ...processedChunk]);
      setProcessedCount((prev) => prev + chunk_size);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true; // 마운트 여부 추적
    closeAllConnections();
    // 상태 초기화
    setDocParts([]);
    setProcessedCount(0);
    setHasMore(true);
    setCheckComplete(false);
    setIsDbInitialized(false);
    docData.current = [];

    async function checkDB() {
      if (!isMounted) return;
      setLoading(true);

      try {
        console.log("Initializing DB for docsId:", docsId);
        await initDB(dbName, objectStoreName);
        const loadedData = await loadData(objectStoreName);
        console.log("Loaded data from DB:", loadedData.length);

        if (!isMounted) return;

        if (!loadedData || loadedData.length === 0) {
          console.log("Fetching data from server for docsId:", docsId);
          try {
            const data = await fetchTranslateData(docsId, "");
            if (!isMounted) return;
            if (data && Array.isArray(data)) {
              docData.current = data;
              await addData(data, objectStoreName);
              console.log("Server data saved, length:", data.length);
              if (isMounted) {
                setIsDbInitialized(true);
                await loadMore();
                setCheckComplete(true);
              }
            } else {
              throw new Error("Invalid data format received from server");
            }
          } catch (error) {
            console.error("Failed to fetch data from server:", error);
          }
        } else {
          console.log("Using cached data from IndexedDB");
          if (isMounted) {
            docData.current = loadedData;
            setIsDbInitialized(true);
            await loadMore();
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

  const { show } = useContextMenu({
    id: "translate-menu",
  });

  // 우클릭 시 컨텍스트 메뉴 실행
  const handleContextMenu = (e, part) => {
    e.preventDefault();
    show({ event: e, props: { part } });
  };

  // 메뉴 항목: 번역하기
  const handleTranslate = async ({ props }) => {
    const { part } = props;
    useEditorStore.setState({
      docsPart: part.content,
      porder: part.porder,
      docsId: part.docsId,
      originId: part.originId,
    });
    await openEditor();
    toggleEditor();
  };

  // 메뉴 항목: 번역 기록
  const handleArchive = async ({ props }) => {
    const { part } = props;
    setDocsPart(part.content);
    setDocsId(part.docsId);
    console.log("현재docsId", part.docsId);
    setOriginId(part.originId);
    await fetchBestTranslate(part.docsId, "");
    await openArchive();
    toggleArchive();
  };

  //우클릭 스타일 변경

  return (
    <div className="h-[99%] min-w-[800px] max-w-[70%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-x-auto overflow-y-scroll p-6 flex flex-col z-[1000] max-w-screen-xl mx-auto">
      <button
        onClick={async () => {
          navigate(`/translate/main/viewer/${docsId}/best`);
        }}
        className="fixed top-2 right-2 z-[1900] group rounded-full w-12 h-12 bg-gradient-to-r from-[#BC5B39] to-[#ff835a] flex justify-center items-center cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border-2 border-white"
      >
        <img className="w-7 h-6" src={Korean} alt="전체 번역 보기" />
      </button>

      <div className="flex flex-col gap-2">
        {docParts.map((part, index) => (
          <div
            key={index}
            onContextMenu={async (e) => {
              if (!localStorage.getItem("token")) {
                e.preventDefault();
                return;
              }
              setContextMenuDocsName(part.documentName);
              setContextMenuOriginId(part.originId);
              handleContextMenu(e, part);
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
            }}
            className="paragraph flex flex-row gap-4 relative"
          >
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
                    // ToastViewer 렌더 후 높이 측정
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
      {createPortal(<TranslateEditor />, document.body)}
      {createPortal(<TranslateArchive />, document.body)}

      {/* Menu를 Portal로 document.body에 렌더링하고 z-index를 높게 지정 */}
      {createPortal(
        <Menu
          id="translate-menu"
          theme="none"
          animation="scale"
          style={{ zIndex: 1900 }}
        >
          <Item disabled>
            {contextMenuDocsName}문서 {contextMenuOriginId}번째 문단
          </Item>
          <Separator />
          <Item className="hover:bg-gray-100!" onClick={handleTranslate}>
            번역하기
          </Item>
          <Item onClick={handleArchive}>번역 기록</Item>
        </Menu>,
        document.body
      )}
    </div>
  );
};

export default TranslateViewer;
