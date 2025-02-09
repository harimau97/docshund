import { useState } from "react";
import { jwtDecode } from "jwt-decode";

import communityArticleStore from "../../store/communityStore/communityArticleStore";
import docsCategoryStore from "../../store/docsCategoryStore";
import CommunityHeader from "./components/communityHeader";
import EditorContent from "../translate/components/editorContent";

const WriteArticle = () => {
  const token = localStorage.getItem("token");

  const [file, setFile] = useState(null);
  const [mainCategory, setMainCategory] = useState(""); // 대분류 선택 상태
  const [subCategory, setSubCategory] = useState(""); // 소분류 선택 상태

  // store에 접근해 변수 선언
  const category = communityArticleStore((state) => state.category);
  const title = communityArticleStore((state) => state.title);
  const content = communityArticleStore((state) => state.content);

  // store에 접근해 메소드 선언
  const setCategory = communityArticleStore((state) => state.setCategory);
  const setTitle = communityArticleStore((state) => state.setTitle);
  const setContent = communityArticleStore((state) => state.setContent);

  const documentNames = docsCategoryStore((state) => state.documentNames);

  // 대분류 선택 핸들러
  const handleMainCategoryChange = (e) => {
    const selectedMain = e.target.value;
    setMainCategory(selectedMain);
    setSubCategory(""); // 대분류가 변경되면 소분류 초기화
  };

  // 소분류 선택 핸들러
  const handleSubCategoryChange = (e) => {
    setSubCategory(e.target.value);
  };

  // 파일 첨부 핸들링 함수
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // 파일 첨부 취소 핸들링 함수
  const handleFileCancel = () => {
    setFile(null);
  };

  // onSubmit으로 동작할 함수

  // DOM 요소 반환
  return (
    <div className="flex justify-center w-full">
      <main className="flex-1 p-8 max-w-[1280px]">
        {/* header */}
        <CommunityHeader />

        {/* main content */}
        <div className="bg-white rounded-tl-xl rounded-tr-xl border-t rounded-bl-xl rounded-br-xl border-b border-l border-r border-[#E1E1DF]">
          <div className="p-6">
            <form
              onSubmit={(e) => {
                console.log(e.target.value);
              }}
            >
              <div className="border-b border-[#E1E1DF] pb-4 mb-4">
                <div className="mb-6 flex items-center">
                  <label className="block text-lg font-medium text-black min-w-[100px]">
                    제목 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="flex-1 py-2 px-3 border rounded-md shadow-sm focus:outline-none focus:ring-[#bc5b39] focus:border-[#bc5b39] sm:text-sm"
                    placeholder="제목을 입력하세요"
                  />
                </div>
                <div className="flex items-center">
                  <label className="block text-lg font-medium text-black min-w-[100px]">
                    분류 <span className="text-red-500">*</span>
                  </label>
                  {/*대분류 선택시 그에 해당하는 문서가 나오도록 */}
                  <div className="flex flex-1 gap-4">
                    <select
                      className="flex-1 py-2 px-3 border bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#bc5b39] focus:border-[#bc5b39] sm:text-sm"
                      onChange={handleMainCategoryChange}
                      value={mainCategory}
                    >
                      <option value="">대분류를 선택하세요</option>
                      {Object.keys(documentNames).map((section) => (
                        <option key={section} value={section}>
                          {section}
                        </option>
                      ))}
                    </select>
                    <select
                      className="flex-1 py-2 px-3 border bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#bc5b39] focus:border-[#bc5b39] sm:text-sm"
                      onChange={handleSubCategoryChange}
                      value={subCategory}
                    >
                      <option value="">문서를 선택하세요</option>
                      {/* mainCategory에 속하는 문서 이름만 나오게 */}
                      {mainCategory &&
                        documentNames[mainCategory]?.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
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
