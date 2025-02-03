import PropTypes from "prop-types";

import ArticleListPagination from "./listPagination";

// 게시글 리스트 렌더링 컴포넌트
// renderItem: 각 아이템을 렌더링하는 함수 <- articleList.jsx에서 정의
const ListRender = ({
  data,
  renderItem,
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  return (
    // 리스트 아이템 렌더링
    <div className="p-10 bg-white rounded-bl-xl rounded-br-xl border-b border-l border-r border-[#E1E1DF] text-[#7D7C77]">
      {/* 데이터가 있을 때 */}
      {data.length > 0 ? (
        data.map((item) => (
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
        // 데이터가 없을 때
        <p className="text-gray-500 text-center">데이터가 없습니다.</p>
      )}
      {/* 페이지네이션 */}
      {
        // 페이지 클릭에 따라 currentPage 변경 -> 변경된 currentPage에 따라 axios 요청 필요
        <ArticleListPagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      }
    </div>
  );
};

// props 타입 설정
ListRender.propTypes = {
  data: PropTypes.array,
  renderItem: PropTypes.func,
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
};

export default ListRender;
