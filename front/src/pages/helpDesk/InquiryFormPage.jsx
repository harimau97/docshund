import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import InquiryService from "../../services/helpDeskServices/inquiryService";

const InquiryFormPage = () => {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || !title || !email || !content) {
      alert("문의 카테고리, 제목, 이메일, 내용을 모두 입력해주세요.");
      return;
    }

    let userId = null;
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      userId = decodedToken.userId;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("content", content);
    formData.append("email", email);
    if (userId) {
      formData.append("userId", userId);
    }
    if (file) {
      formData.append("file", file);
    }

    // Log FormData content
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      await InquiryService.submitInquiry(formData);
      alert("문의가 성공적으로 제출되었습니다.");
      setCategory("");
      setTitle("");
      setEmail("");
      setContent("");
      setFile(null);
    } catch (error) {
      alert("문의 제출 중 오류가 발생했습니다.");
      console.log("문의 등록 실패", error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileCancel = () => {
    setFile(null);
  };

  return (
    <div className="p-10 bg-white rounded-bl-xl rounded-br-xl border-b border-l border-r border-[#E1E1DF] text-[#7D7C77] mb-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-lg font-medium text-black mb-2">
            문의 카테고리 <span className="text-red-500">*</span>
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#bc5b39] focus:border-[#bc5b39] sm:text-sm"
          >
            <option value="">카테고리를 선택하세요</option>
            <option value="문서등록요청">문서등록요청</option>
            <option value="회원관련">회원관련</option>
            <option value="신고관련">신고관련</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-lg font-medium text-black mb-2">
            제목 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border rounded-md shadow-sm focus:outline-none focus:ring-[#bc5b39] focus:border-[#bc5b39] sm:text-sm"
            placeholder="제목을 입력하세요"
          />
        </div>
        <div className="mb-6">
          <label className="block text-lg font-medium text-black mb-2">
            이메일 <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border rounded-md shadow-sm focus:outline-none focus:ring-[#bc5b39] focus:border-[#bc5b39] sm:text-sm"
            placeholder="이메일을 입력하세요"
          />
        </div>
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
            style={{ height: "200px" }}
          ></textarea>
        </div>
        <div className="mb-6">
          <label className="block text-lg font-medium text-black mb-2">
            파일 첨부
          </label>
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
            className="py-2 px-4 bg-[#bc5b39] text-white rounded-md shadow-sm hover:bg-[#C96442]"
          >
            보내기
          </button>
        </div>
      </form>
    </div>
  );
};

export default InquiryFormPage;
