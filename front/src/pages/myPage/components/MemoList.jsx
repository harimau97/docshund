import PropTypes from "prop-types";
import MemoCard from "./MemoCard";
import memoStore from "../stores/memoStore";

const MemoList = ({ onEditMemo }) => {
  const { memos } = memoStore();

  if (!memos.length) {
    return (
      <div className="text-center text-gray-500 mt-10">
        아직 작성한 메모가 없습니다.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {memos.map((memo) => (
        <MemoCard key={memo.memo_id} memo={memo} onEditMemo={onEditMemo} />
      ))}
    </div>
  );
};

MemoList.propTypes = {
  onEditMemo: PropTypes.func.isRequired,
};

export default MemoList;
