import PropTypes from "prop-types";

const MemoCard = ({ title, content, createdAt }) => {
  return (
    <div className="bg-white rounded-xl p-4 border-1 border-[#E1E1DF]">
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <p className="text-sm h-20 line-clamp-4 text-gray-600 mb-4 overflow-hidden text-elipsis">
        {content}
      </p>
      <div className="flex text-sm justify-between items-center text-gray-400">
        {createdAt}
        <button className="border-box bg-[#bc5b39] rounded-[12px] px-[20px] w-fit h-10 relative flex items-center justify-center text-[#ffffff] hover:bg-[#C96442]">
          메모 보기
        </button>
      </div>
    </div>
  );
};

MemoCard.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default MemoCard;
