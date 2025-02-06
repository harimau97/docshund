import PropTypes from "prop-types";

const MemoCard = ({ memo, onEditMemo }) => {
  const formattedDate = new Date(memo.createdAt).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <div className="bg-white rounded-xl p-4 border border-[#E1E1DF]">
      <h2 className="text-lg line-clamp-1 font-bold mb-2">{memo.title}</h2>
      <p className="text-sm h-20 line-clamp-4 text-gray-600 mb-4 overflow-hidden text-ellipsis">
        {memo.content}
      </p>
      <div className="flex text-sm justify-between items-center text-gray-400">
        <span>{formattedDate}</span>
        <button
          onClick={() => onEditMemo(memo.memo_id, memo)}
          className="bg-[#bc5b39] rounded-xl px-4 h-10 text-white hover:bg-[#C96442] transition"
        >
          메모 보기
        </button>
      </div>
    </div>
  );
};

MemoCard.propTypes = {
  memo: PropTypes.shape({
    memo_id: PropTypes.number.isRequired, // 추가된 부분
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  onEditMemo: PropTypes.func.isRequired,
};

export default MemoCard;
