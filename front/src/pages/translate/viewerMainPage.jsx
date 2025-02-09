import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Languages } from "lucide-react";
import { useState } from "react";

const ViewerMainPage = () => {
  const navigate = useNavigate();
  const { docsId } = useParams();

  const [isBtnClicked, setIsBtnClicked] = useState(false);
  return (
    <div>
      <button
        onClick={async () => {
          setIsBtnClicked(!isBtnClicked);
          !isBtnClicked
            ? navigate(`/translate/main/viewer/${docsId}/best`)
            : navigate(`/translate/main/viewer/${docsId}`);
        }}
        className="fixed flex items-center justify-center h-12 w-12 top-2 right-36 cursor-pointer rounded-full bg-[#BC5B39] hover:bg-[#C96442]"
      >
        <Languages />
      </button>
      <Outlet />
    </div>
  );
};

export default ViewerMainPage;
