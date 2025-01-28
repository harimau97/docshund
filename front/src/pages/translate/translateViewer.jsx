import { useState, useEffect, useRef } from "react";
import axios from "axios";

const TranslateViewer = () => {
  const [docParts, setDocParts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [processedCount, setProcessedCount] = useState(0);
  const loadingRef = useRef(null);
  const chunk_size = 20;

  // 문서 내용 전부 가져오기
  const loadMore = async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8080/api/docs/docParts"
      );
      const data = response.data;

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
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );
    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }
    return () => observer.disconnect();
  }, [hasMore, loading]);

  //초기 데이터 로드
  useEffect(() => {
    loadMore();
  }, []);

  return (
    <div className="h-[99%] border-black border-2 w-3/4 absolute top-1/2 left-1/2 -translate-1/2 overflow-y-scroll p-4 flex flex-col">
      <div className="flex flex-col gap-4">
        {docParts.map((part, index) => (
          <div
            key={index}
            onClick={() => alert("요소 클릭됨!!")}
            dangerouslySetInnerHTML={{ __html: part.content }}
            className="border-black border-2 p-1 cursor-pointer"
          />
        ))}
      </div>

      <div ref={loadingRef} className="py-4 text-center">
        {loading && <div>Loading...</div>}
        {!hasMore && <div>모든 문서를 불러왔습니다.</div>}
      </div>
    </div>
  );
};

export default TranslateViewer;
