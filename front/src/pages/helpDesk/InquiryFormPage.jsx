import { useState } from "react";

const InquiryFormPage = () => {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category || !title || !email || !content) {
      alert("문의 카테고리, 제목, 이메일, 내용을 모두 입력해주세요.");
      return;
    }
    // Handle form submission logic here
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
            <option value="document">문서등록요청</option>
            <option value="membership">회원관련</option>
            <option value="report">신고관련</option>
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
            className="py-2 px-4 bg-[#bc5b39] text-white rounded-md shadow-sm hover:bg-[#C96442] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#bc5b39] transition duration-300"
          >
            보내기
          </button>
        </div>
      </form>
    </div>
  );
};

export default InquiryFormPage;
