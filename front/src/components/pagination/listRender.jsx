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
    <div>
      {/* 데이터가 있을 때 */}
      {data.length > 0 ? (
        data.map((item, index) => (
          // key 값으로 articleId + 1 사용, unique 보장
          <div
            // TODO: 컴포넌트 재사용을 위해 key 값 변경
            // 게시글, 문의글, 댓글 등의 리스트를 렌더링할 때 key 값이 중복되지 않도록
            // key generator 함수를 만들어서 사용
            key={index}
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
      {totalPages > 0 && (
        <ArticleListPagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
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
