import { useState } from "react";
import PropTypes from "prop-types";
import Pagination from "../../../components/pagination/pagination";

const ListRender = ({ data = [], renderItem = () => null, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-10 bg-white rounded-bl-xl rounded-br-xl border-b border-l border-r border-[#E1E1DF] text-[#7D7C77]">
      {currentData.length > 0 ? (
        currentData.map((item, index) => (
          <div key={index} className="border-b border-[#E4DCD4] py-3">
            {renderItem(item)}
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">데이터가 없습니다.</p>
      )}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
};

ListRender.propTypes = {
  data: PropTypes.array,
  renderItem: PropTypes.func,
  itemsPerPage: PropTypes.number,
};

export default ListRender;
