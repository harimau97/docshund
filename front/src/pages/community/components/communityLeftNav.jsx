import { useEffect, useState } from "react";

import docsStore from "../../../store/translateStore/docsStore";
import docsCategoryStore from "../../../store/docsCategoryStore";
import communityArticleStore from "../../../store/communityStore/communityArticleStore";
import { fetchDocsList } from "../../translate/hooks/translateGetService";

import ListIcon from "../../../assets/icon/docsList.png";
import { ChevronDown, ChevronUp, Layout } from "lucide-react";

// TODO: 디자인 수정(패딩, 마진 등)

const CommunityLeftNav = () => {
  // docsList를 가져옴
  const docsList = docsStore((state) => state.docsList);

  // 대분류 목록과 소분류 목록을 가져옴
  const positions = docsCategoryStore((state) => state.positions);
  const setPositions = docsCategoryStore((state) => state.setPositions);
  const category = communityArticleStore((state) => state.category);
  const setCategory = communityArticleStore((state) => state.setCategory);

  // 대분류와 소분류 목록을 저장할 Map
  const [positionMap, setPositionMap] = useState(new Map());
  const [expandedSections, setExpandedSections] = useState({});
  const [navData, setNavData] = useState({});

  // 섹션 토글 hook
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Map에 데이터 추가하는 hook
  // const handleAddDataToMap = (key, value, mapCategory) => {
  //   if (key && value) {
  //     if (mapCategory === "position") {
  //       if (!positionMap.has(key)) {
  //         // 새로운 키의 경우 빈 Set으로 초기화
  //         setPositionMap((prev) => new Map(prev.set(key, new Set([value]))));
  //       } else {
  //         // 기존 키의 경우 Set에 값을 추가
  //         setPositionMap((prev) => {
  //           const existingSet = prev.get(key);
  //           existingSet.add(value);
  //           return new Map(prev.set(key, existingSet));
  //         });
  //       }
  //     }
  //   }
  // };

  // 카테고리 및 문서 목록 가져오기
  useEffect(() => {
    async function asyncFetchDocsList() {
      try {
        await fetchDocsList(false); // setState까지 처리함
      } catch (error) {
        console.log(error);
      }
    }
    asyncFetchDocsList();
  }, []); // 빈 의존성 배열 추가

  // navData 초기화 부분 수정
  useEffect(() => {
    try {
      if (docsList.length > 0) {
        const newPositionMap = new Map();
        docsList.forEach((docs) => {
          if (docs.position && docs.documentName) {
            if (!newPositionMap.has(docs.position)) {
              newPositionMap.set(docs.position, new Set([docs.documentName]));
            } else {
              newPositionMap.get(docs.position).add(docs.documentName);
            }
          }
        });

        setPositionMap(newPositionMap);
        const newPositions = Array.from(newPositionMap.keys());
        setPositions(newPositions);

        const initialExpanded = {};
        newPositions.forEach((position) => {
          initialExpanded[position] = true;
        });
        setExpandedSections(initialExpanded);

        const initialNavData = {};
        newPositions.forEach((position) => {
          initialNavData[position] = Array.from(
            newPositionMap.get(position) || new Set()
          );
        });
        setNavData(initialNavData);
      }
    } catch (error) {
      console.log(error);
    }
  }, [docsList, setPositions]); // 필요한 의존성만 추가

  return (
    <div className="w-[240px] min-h-screen bg-[#F8F8F7]">
      <nav className="p-4">
        {Object.entries(navData).map(([section, items]) => (
          <div key={section} className="mb-2">
            <button
              onClick={() => toggleSection(section)}
              className="w-full flex items-center justify-between p-2 bg-[#bc5b39] text-white rounded cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Layout size={18} />
                <span className="text-sm font-medium">{section}</span>
              </div>
              {expandedSections[section] ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>
            {expandedSections[section] && (
              <ul className="mt-1 ml-6 space-y-2">
                {items.map((item) => (
                  <li
                    key={item}
                    className={`                      
                      text-sm hover:text-[#bc5b39] cursor-pointer py-1
                      ${category === item ? "text-[#bc5b39]" : "text-[#7D7C77]"}
                      `}
                    onClick={() => {
                      // 문서(소분류) 제목 변경
                      setCategory(item);
                    }}
                  >
                    {/* TODO: 문서 이름 누르면 api 호출 */}
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default CommunityLeftNav;
