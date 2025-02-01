import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { initDB, addData, loadData } from "./indexedDB/indexedDB.jsx";
import TranslateEditor from "./components/translateEditor.jsx";
import TranslatePoll from "./components/translatePoll.jsx";
import RoundCornerBtn from "../../components/button/roundCornerBtn.jsx";
import loadingGif from "../../assets/loading.gif";
import { IoCloseCircleOutline } from "react-icons/io5";
import axios from "axios";

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
            const response = await axios.get(
              "https://7243e4af-6c62-4494-bb0e-d5d500da1bff.mock.pstmn.io/docs/1/origin?originId="
            );
            const data = response.data;

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

  // 문서 내용 전부 가져오기
  const loadMore = async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);

      // 인위적인 지연 추가 (개발용)
      await new Promise((resolve) => setTimeout(resolve, 600));

      const data = docData.current;
      // console.log("Current processedCount:", processedCount);
      // console.log("Loading data from index:", processedCount, "to", processedCount + chunk_size);

      if (!data || data.length === 0) {
        console.log("오류 발생 : 데이터 없음");
        return;
      }

      const newChunk = data.slice(processedCount, processedCount + chunk_size);
      // console.log("New chunk length:", newChunk.length);

      if (!newChunk || newChunk.length === 0) {
        setHasMore(false);
        return;
      }
      //element.content가 null이나 undefined일 경우 ""로 대체 ==> React의 불변성 패턴
      const processedChunk = newChunk.map((element) => ({
        ...element,
        content: element.content || "",
      }));

      //전개 연산자 사용 : 두 배열을 쉽게 합칠 수 있음.
      setDocParts((prev) => [...prev, ...processedChunk]);
      setProcessedCount((prev) => prev + chunk_size);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
    <div className="h-[99%] border-black border-2 w-[70%] absolute top-1/2 left-1/2 -translate-1/2 overflow-x-auto overflow-y-scroll p-4 flex flex-col">
      <div className="flex flex-col gap-4">
        {docParts.map((part, index) => (
          <div key={index} className="flex flex-row relative">
            <div
              onClick={(e) => toggleButton(part.id, e)} // toggleButton에 e를 전달
              dangerouslySetInnerHTML={{ __html: part.content }}
              className="bg-[#E4DCD4] cursor-pointer p-2 rounded-md text-[#424242] hover:bg-[#BCB2A8] flex flex-col w-full"
            />
            {buttonStates[part.id] && (
              <div
                className="flex flex-row min-w-fit h-fit z-95 items-center"
                style={{
                  position: "absolute",
                  top: mousePositions[part.id]?.y || 0, // 저장된 y좌표 사용
                  left: mousePositions[part.id]?.x || 0, // 저장된 x좌표 사용
                  transform: "translate(-128px,-20px)",
                }}
              >
                <RoundCornerBtn
                  onClick={() => alert("번역하기")}
                  text="번역하기"
                />
                <IoCloseCircleOutline
                  className="w-8 h-8 cursor-pointer text-[#bc5b39] mr-2 ml-2 min-w-fit"
                  onClick={(e) => toggleButton(part.id, e)}
                />
                <RoundCornerBtn
                  onClick={() => alert("번역기록")}
                  text="번역기록"
                />
              </div>
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
    </div>
  );
};

export default TranslateViewer;
