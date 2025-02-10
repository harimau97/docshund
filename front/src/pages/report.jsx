import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import { toast } from "react-toastify";
import Modal from "react-modal";
import ReportStore from "../store/reportStore";
import ReportService from "../services/reportService";

import { X } from "lucide-react";

const reportModal = () => {
  const navigate = useNavigate();

  const {
    originContent,
    reportedUser,
    commentId,
    articleId,
    transId,
    chatId,
    isReportOpen,
    isReportVisible,
    closeReport,
    toggleReport,
  } = ReportStore();

  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [isSelected, setIsSelected] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || !content) {
      toast.warn("신고 카테고리, 내용을 모두 입력해주세요.");
      return;
    }

    let userId = null;
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      userId = decodedToken.userId;
    }

    const report = {
      category,
      originContent,
      content,
      reportedUser,
      commentId,
      articleId,
      transId,
      chatId,
    };

    if (userId) {
      report.userId = userId;
    }

    const formData = new FormData();
    formData.append(
      "report",
      new Blob([JSON.stringify(report)], { type: "application/json" })
    );
    if (file) {
      formData.append("file", file);
    }

    // Log FormData content
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      // 문의 제출 API 호출
      await ReportService.submitReport(formData);
      toast.success("문의가 성공적으로 제출되었습니다.");
      setCategory("");
      setTitle("");
      setEmail("");
      setContent("");
      setFile(null);

      // 문의 제출 후 마이페이지로 이동
    } catch (error) {
      toast.error("문의 제출 중 오류가 발생했습니다.");
      console.log("문의 등록 실패", error);
    }

    toggleReport();
    closeReport();
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileCancel = () => {
    setFile(null);
  };

  return (
    <Modal
      isOpen={isReportOpen}
      closeTimeoutMS={0}
      style={{
        overlay: {
          backgroundColor: "rgba(240,238,229,0.8)",
          zIndex: 2200,
        },
      }}
      className="border-box w-full h-full flex items-center justify-center"
    >
      <AnimatePresence>
        {isReportVisible ? (
          <motion.div
            key="editor-modal"
            initial={{ opacity: 0, y: 1000 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 1000 }}
            transition={{
              ease: "easeInOut",
              duration: 0.5,
            }}
            className="fixed inset-0 flex items-center justify-center min-w-full min-h-full "
          >
            <div className="p-6 bg-white h-fit rounded-xl border-b border-l border-r border-[#E1E1DF] text-[#7D7C77] mb-5">
              <div className="w-full h-fit flex justify-end items-center">
                <button
                  onClick={() => {
                    toggleReport();
                    setTimeout(() => {
                      closeReport();
                    }, 600);
                  }}
                  className="cursor-pointer"
                >
                  <X className="text-red-800 " />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-lg font-medium text-black mb-2">
                    신고 카테고리 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1 block w-full py-2 px-3 border bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#bc5b39] focus:border-[#bc5b39] sm:text-sm"
                  >
                    {isSelected && (
                      <option value="">카테고리를 선택하세요</option>
                    )}

                    <option
                      onClick={() => setIsSelected(false)}
                      value="ABUSIVE_LANGUAGE_OR_VIOLENCE"
                    >
                      욕설 및 폭력성
                    </option>
                    <option
                      onClick={() => setIsSelected(false)}
                      value="EXPLICIT_OR_ILLEGAL_CONTENT"
                    >
                      음란물 및 불법 콘텐츠
                    </option>
                    <option
                      onClick={() => setIsSelected(false)}
                      value="PROMOTING_GAMBLING"
                    >
                      사행성 조장
                    </option>
                    <option
                      onClick={() => setIsSelected(false)}
                      value="SPAM_OR_ADVERTISING"
                    >
                      스팸 및 광고
                    </option>
                    <option
                      onClick={() => setIsSelected(false)}
                      value="FLOODING"
                    >
                      도배
                    </option>
                    <option
                      onClick={() => setIsSelected(false)}
                      value="PERSONAL_INFORMATION_EXPOSURE"
                    >
                      개인정보 노출
                    </option>
                    <option value="COPYRIGHT_INFRINGEMENT">저작권 침해</option>
                    <option value="OTHER">기타</option>
                  </select>
                </div>
                {/* <div className="mb-6">
                  <label className="block text-lg font-medium text-black mb-2">
                    원본
                  </label>
                  <textarea
                    type="text"
                    value={originContent}
                    readOnly={true}
                    className="mt-1 block w-full py-2 px-3 border rounded-md shadow-sm focus:outline-none focus:ring-[#bc5b39] focus:border-[#bc5b39] sm:text-sm"
                    style={{ height: "150px" }}
                  />
                </div> */}

                <div className="mb-6">
                  <label className="block text-lg font-medium text-black mb-2">
                    내용 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="mt-1 block w-full py-2 px-3 border rounded-md shadow-sm focus:outline-none focus:ring-[#bc5b39] focus:border-[#bc5b39] sm:text-sm"
                    rows="4"
                    placeholder="내용을 입력하세요"
                    style={{ height: "250px" }}
                  ></textarea>
                </div>
                <div className="mb-6">
                  <div className="flex items-center">
                    <div className="relative">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="py-2 px-4 bg-[#bc5b39] text-white rounded-md shadow-sm text-center cursor-pointer hover:bg-[#C96442] text-sm">
                        파일 선택
                      </div>
                    </div>
                    {!file && (
                      <p className="ml-4 text-sm text-gray-500">
                        첨부할 파일을 선택하세요 (1개만 가능)
                      </p>
                    )}
                    {file && (
                      <div className="ml-4 flex items-center">
                        <p className="text-sm text-gray-500 mr-2 truncate max-w-md">
                          {file.name}
                        </p>
                        <button
                          type="button"
                          onClick={handleFileCancel}
                          className="py-1 px-2 hover:text-red-600 text-sm underline"
                        >
                          삭제
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="py-2 px-4 bg-[#bc5b39] text-white rounded-md shadow-sm hover:bg-[#C96442] cursor-pointer"
                  >
                    신고하기
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </Modal>
  );
};

export default reportModal;
