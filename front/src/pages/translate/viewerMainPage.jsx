import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Languages } from "lucide-react";
import { useState, useEffect } from "react";
import AlertModal from "../../components/alertModal/alertModal.jsx";
import useAlertStore from "../../store/alertStore.jsx";
import warning from "../../assets/icon/warning.png";
const ViewerMainPage = () => {
  const navigate = useNavigate();
  const { docsId } = useParams();

  const [isBtnClicked, setIsBtnClicked] = useState(false);
  const { isAlertOpen, toggleAlert } = useAlertStore();

  useEffect(() => {
    toggleAlert();
  }, []);

  return (
    <div className="min-w-[768px] flex">
      <AlertModal
        imgSrc={warning}
        alertTitle={"알림"}
        alertText={
          "[서비스 이용 안내]\n\n" +
          "1. 이 번역본은 공식 번역이 아니며, 원본의 정확성과 완전성을 보장하지 않습니다.\n" +
          "2. 참고용으로만 사용하시고, 공식 정보를 확인하시려면 원본 문서를 직접 참조하시기 바랍니다.\n\n" +
          "3. 본 서비스는 공익적인 목적을 위해 제공되며, 상업적 이용 시 발생하는 모든 법적 책임은의 사용자에게 있으며, 서비스 제공자는 이에 대한 책임을 지지 않습니다."
        }
        isVisible={isAlertOpen}
      />
      <button
        onClick={async () => {
          setIsBtnClicked(!isBtnClicked);
          !isBtnClicked
            ? navigate(`/translate/main/viewer/${docsId}/best`)
            : navigate(`/translate/main/viewer/${docsId}`);
        }}
        className="fixed flex items-center justify-center h-12 w-12 top-2 right-36 cursor-pointer rounded-full bg-[#BC5B39] hover:bg-[#C96442] z-[1100]"
      >
        <Languages />
      </button>
      <Outlet className="min-w-[768px] pr-16" />
    </div>
  );
};

export default ViewerMainPage;
