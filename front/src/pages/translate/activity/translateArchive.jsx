import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import useModalStore from "../store/modalStore";
import GoBack from "../../../assets/icon/goBack.png";
import useEditorStore from "../store/editorStore";
import useArchiveStore from "../store/archiveStore";
import { div } from "motion/react-client";

const TranslateArchive = () => {
  const { isArchiveOpen, closeArchive } = useModalStore();
  const [transStates, setTransStates] = useState({});
  const { docsPart, bestTrans, porder, docsId, originId, currentUserText } =
    useEditorStore();
  const { transList, setTransList, clearTransList } = useArchiveStore();

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
    const fetchTransList = async () => {
      try {
        // const response = await axios.get(
        //   `https://f1887553-e372-4944-90d7-8fe76ae8d764.mock.pstmn.io/docs/${docsId}/trans/${porder}?sort=like&order=desc&size=&page=`
        // );

        // PostMan 사용량 절약을 위해 데이터를 하드코딩함
        let data = [
          {
            transId: 2,
            originId: 2,
            pOrder: 2,
            userId: 2,
            nickname: "고양이",
            content:
              "Spring은 Java 엔터프라이즈 애플리케이션을 쉽게 만들 수 있게 해줍니다. 기업 환경에서 Java 언어를 수용하는 데 필요한 모든 것을 제공하며, JVM에서 대체 언어로 Groovy와 Kotlin을 지원하고 애플리케이션의 필요에 따라 다양한 종류의 아키텍처를 유연하게 만들 수 있습니다. Spring Framework 6.0부터 Spring에는 Java 17+가 필요합니다.",
            likeCount: 5,
            likeUser: [3, 4, 5, 6, 7],
            createdAt: "2024-12-04 18:56:44",
            updatedAt: "2024-12-04 18:56:44",
          },
          {
            transId: 6,
            originId: 2,
            pOrder: 2,
            userId: 3,
            nickname: "닥스훈트",
            content:
              "스프링은 자바 엔터프라이즈 애플리케이션을 쉽게 만들 수 있게 해줍니다. 기업 환경에서 자바를 수용하는 데 필요한 모든 것을 제공하며, JVM에서 대체 언어로 Groovy와 Kotlin을 지원하고, 애플리케이션의 필요에 따라 다양한 종류의 아키텍처를 유연하게 만들 수 있습니다. Spring Framework 6.0부터는 Java 17 이상이 필요합니다.",
            likeCount: 1,
            likeUser: [2],
            createdAt: "2024-12-15 20:15:27",
            updatedAt: "2024-12-18 22:33:12",
          },
        ];
        await setTransList(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTransList();
    console.log(transStates);
  }, []);

  return (
    <Modal
      isOpen={isArchiveOpen}
      onRequestClose={closeArchive}
      style={{
        overlay: { backgroundColor: "rgba(240,238,229,0.8)", zIndex: 2000 },
      }}
      className="border-box w-full h-full flex items-center justify-center"
    >
      <div className="relative m-5 p-4 w-1/2 h-[95%] min-w-[40%] min-h-[80%] max-w-full max-h-full rounded-lg bg-white shadow-sm overflow-scroll">
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
                      <div className="border-t-1 border-slate-200 px-2 py-2">
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
