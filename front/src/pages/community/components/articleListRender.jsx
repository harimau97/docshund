import { useState } from "react";
import PropTypes from "prop-types";

import ArticleListPagination from "./articleListPagination";

// 게시글 리스트 렌더링 컴포넌트
// data: 현재 페이지에 해당하는 articles
// renderItem: 각 아이템을 렌더링하는 함수 <- articleList.jsx에서 정의
// itemsPerPage: 페이지당 아이템 개수
// totalPages: 전체 페이지 수
const ArticleListRender = ({ data, renderItem, totalPages }) => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    // 리스트 아이템 렌더링
    <div className="p-10 bg-white rounded-bl-xl rounded-br-xl border-b border-l border-r border-[#E1E1DF] text-[#7D7C77]">
      {data.length > 0 ? (
        data.map((item, index) => (
          // key 값으로 articleId + 1 사용, unique 보장
          <div
            key={item.articleId + 1}
            className="border-b border-[#E4DCD4] py-3"
          >
            {/* // renderItem 함수를 통해 각 아이템 렌더링 */}
            {renderItem(item)}
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">데이터가 없습니다.</p>
      )}

      {/* 페이지네이션 */}
      {
        // 1초과에서 전체 다 뜨는 걸로 변경
        <ArticleListPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      }
    </div>
  );
};

// props 타입 설정
ArticleListRender.propTypes = {
  data: PropTypes.array,
  renderItem: PropTypes.func,
  totalPages: PropTypes.number,
};

export default ArticleListRender;
