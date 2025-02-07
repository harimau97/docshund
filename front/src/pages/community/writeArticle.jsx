import { useState } from "react";
import { jwtDecode } from "jwt-decode";

import communityArticleStore from "../../store/communityStore/communityArticleStore";
import CommunityHeader from "./components/communityHeader";
import EditorContent from "../translate/components/editorContent";

const WriteArticle = () => {
  const token = localStorage.getItem("token");

  const [file, setFile] = useState(null);

  // store에 접근해 변수 선언
  const category = communityArticleStore((state) => state.category);
  const title = communityArticleStore((state) => state.title);
  const content = communityArticleStore((state) => state.content);

  // store에 접근해 메소드 선언
  const setCategory = communityArticleStore((state) => state.setCategory);
  const setTitle = communityArticleStore((state) => state.setTitle);
  const setContent = communityArticleStore((state) => state.setContent);

  // 게시글 작성 api 호출
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!category || !title || !content) {
  //     alert("제목, 카테고리, 내용을 모두 입력해주세요.");
  //     return;
  //   }

  //   let userId = null;
  //   if (token) {
  //     const decodedToken = jwtDecode(token);
  //     userId = decodedToken.userId;
  //   }

  //   const inquiry = {
  //     title,
  //     category,
  //     content
  //   };

  //   if (userId) {
  //     // inquiry.userId = userId;
  //   }

  //   const formData = new FormData();
  //   formData.append(
  //     "article",
  //     new Blob([JSON.stringify(inquiry)], { type: "application/json" })
  //   );
  //   if (file) {
  //     formData.append("file", file);
  //   }

  //   // Log FormData content
  //   for (let pair of formData.entries()) {
  //     console.log(pair[0] + ": " + pair[1]);
  //   }

  //   try {
  //     // 문의 제출 API 호출
  //     await .submitInquiry(formData);
  //     alert("문의가 성공적으로 제출되었습니다.");
  //     setTitle("");
  //     setCategory("");
  //     setContent("");
  //     setFile(null);

  //     // 문의 제출 후 마이페이지로 이동
  //     navigate("/mypage/inquiry");
  //   } catch (error) {
  //     alert("문의 제출 중 오류가 발생했습니다.");
  //     console.log("문의 등록 실패", error);
  //   }
  // };

  // 파일 첨부 핸들링 함수
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // 파일 첨부 취소 핸들링 함수
  const handleFileCancel = () => {
    setFile(null);
  };

  // DOM 요소 반환
  return (
    <div className="flex justify-center w-full">
      <main className="flex-1 p-8 max-w-[1280px]">
        {/* header */}
        <CommunityHeader />

        {/* main content */}
        <div className="bg-white rounded-tl-xl rounded-tr-xl border-t rounded-bl-xl rounded-br-xl border-b border-l border-r border-[#E1E1DF]">
          <div className="p-6">
            <form onSubmit={console.log("작성 완료")}>
              <div className="border-b border-[#E1E1DF] pb-4 mb-4">
                <div className="mb-6 flex items-center">
                  <label className="block text-lg font-medium text-black min-w-[100px]">
                    제목 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="flex-1 py-2 px-3 border rounded-md shadow-sm focus:outline-none focus:ring-[#bc5b39] focus:border-[#bc5b39] sm:text-sm"
                    placeholder="제목을 입력하세요"
                  />
                </div>
                <div className="flex items-center">
                  <label className="block text-lg font-medium text-black min-w-[100px]">
                    분류 <span className="text-red-500">*</span>
                  </label>
                  {/* TODO: 대분류 선택시 그에 해당하는 문서가 나오도록 수정 */}
                  <div className="flex flex-1 gap-4">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="flex-1 py-2 px-3 border bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#bc5b39] focus:border-[#bc5b39] sm:text-sm"
                    >
                      <option value="">대분류를 선택하세요</option>
                    </select>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="flex-1 py-2 px-3 border bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#bc5b39] focus:border-[#bc5b39] sm:text-sm"
                    >
                      <option value="">문서를 선택하세요</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="border-b border-[#E1E1DF] pb-4 mb-4">
                <div className="mb-6 mt-4">
                  <label className="block text-lg font-medium text-black mb-2">
                    내용 <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 block w-full h-100">
                    <EditorContent initialTextContent={""} />
                  </div>
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
                        {/* TODO: 여러 장 가능하게 바꾸기? */}
                        {/* TODO: 사진 첨부시 게시글 안에 들어가게 설정 */}
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
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="py-2 px-8 bg-[#bc5b39] text-white rounded-md shadow-sm hover:bg-[#C96442]"
                >
                  작성완료
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WriteArticle;
