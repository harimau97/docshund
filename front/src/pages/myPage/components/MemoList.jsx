import MemoCard from "./MemoCard";
import memoStore from "../stores/memoStore";

const MemoList = () => {
  const { memos } = memoStore();

  if (memos.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        아직 작성한 메모가 없습니다.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {memos.map((memo) => (
        <MemoCard
          key={memo.memo_id}
          title={memo.title}
          content={memo.content}
          createdAt={memo.created_at}
        />
      ))}
    </div>
  );
};

export default MemoList;
