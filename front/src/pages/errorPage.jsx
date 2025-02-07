import { useSearchParams } from "react-router-dom";
import errorImage400 from "../assets/error400.png";
import errorImage500 from "../assets/error500.png";
import { ArrowLeft } from "lucide-react";

const ErrorPage = () => {
  const [searchParams] = useSearchParams();
  const statusCode = parseInt(searchParams.get("status"), 10) || 500;
  const message =
    searchParams.get("message") || "알 수 없는 오류가 발생했습니다.";

  const getErrorContent = () => {
    switch (statusCode) {
      case 400:
        return {
          title: "잘못된 요청입니다",
          description: message,
          image: errorImage400,
        };
      case 401:
        return {
          title: "로그인이 필요합니다",
          description: "로그인 후 이용해주세요.",
          image: errorImage400,
        };
      case 404:
        return {
          title: "페이지를 찾을 수 없습니다",
          description: "요청한 페이지가 존재하지 않습니다.",
          image: errorImage400,
        };
      case 500:
        return {
          title: "서버 오류",
          description: "서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
          image: errorImage500,
        };
      default:
        return {
          title: "오류 발생",
          description: message,
          image: errorImage500,
        };
    }
  };

  const { title, description, image } = getErrorContent();

  return (
    <div className="flex items-center justify-center p-4">
      <div>
        <p className="lg:text-5xl sm:text-3xl font-bold mb-4">{title}</p>
        <p className="lg:text-xl sm:text-lg mb-7">{description}</p>
        <button
          className="bg-[#bc5b39] text-white flex items-center px-5 py-2 rounded-sm"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="mr-2" />
          <span className="lg:text-md sm:text-sm">이전 페이지로 돌아가기</span>
        </button>
      </div>
      <img src={image} alt="에러 이미지" className="w-1/3" />
    </div>
  );
};

export default ErrorPage;
