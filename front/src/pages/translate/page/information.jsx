import { useEffect, useState } from "react";
import Joyride, { STATUS } from "react-joyride";

const Information = () => {
  const [agree, setAgree] = useState(true);

  useEffect(() => {
    const hasAgreed = localStorage.getItem("hasAgreed");
    if (hasAgreed === "true") {
      setAgree(true);
    } else {
      setAgree(false);
    }
  }, []);

  const handleAgree = () => {
    if (!localStorage.getItem("hasAgreed")) {
      setAgree(true);
      localStorage.setItem("hasAgreed", "true");
    }
  };

  const handleJoyrideCallback = async (data) => {
    const { status } = data;
    if (status === STATUS.FINISHED) {
      console.log("튜토리얼 완료됨!");
      handleAgree();
      // setRun(false); // Joyride 종료
    }
  };

  const steps = [
    {
      target: "body",
      content: "사용법을 간단하게 안내하겠습니다.",
      placement: "center",
    },
    {
      target: "#upperBtns",
      content:
        "사이드바에서는 문서 목록, 알림, 메모를 조회할 수 있습니다. 뒤로 나가기 버튼을 통해 문서 목록으로 돌아 갈 수 있습니다.",
      placement: "auto",
    },
    {
      target: "#mainContent",
      content:
        "각 문단을 클릭하면 베스트 번역본의 내용을 볼 수 있고, 우클릭하면 번역을 작성하거나 기록을 볼 수 있습니다.",
      placement: "center",
    },

    {
      target: "#translateAllBtn",
      content: "번역 전체보기 버튼을 통해 전체 번역 내용을 볼 수 있습니다.",
      placement: "top-start",
    },
    {
      target: "#chatBotBtn",
      content: "챗봇 버튼을 통해 번역봇과 대화할 수 있습니다.",
      placement: "top-start",
    },
    {
      target: "#chatBtn",
      content: "채팅 버튼을 통해 다른 사용자들과 대화할 수 있습니다.",
      placement: "top-start",
    },
  ];

  return (
    <div className="h-screen overflow-hidden">
      {!agree && (
        <div className="fixed inset-0 flex items-center justify-center z-[3000] border-box w-full h-full">
          {/* Joyride를 상단에서 렌더링하여 UI 위에 나타나도록 변경 */}
          <Joyride
            steps={steps}
            continuous={true}
            showProgress={true}
            allowClickThruHole={true}
            spotlightClicks={false} // 스포트라이트 영역 클릭 방지
            disableCloseOnEsc={true} // ESC 키로 종료 방지
            disableOverlayClose={true}
            run={true}
            callback={handleJoyrideCallback} // 스텝 완료 이벤트 감지
            disableScroll={true}
            styles={{
              options: {
                zIndex: 20000,

                primaryColor: "#BC5B39",
                tooltip: {
                  backgroundColor: "#fff",
                  textAlign: "left",
                },
                buttonNext: {
                  backgroundColor: "#424242",
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Information;
