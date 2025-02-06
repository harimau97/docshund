import propTypes from "prop-types";

const ReplyHeader = ({ replyCount }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-bold mb-4 inline-flex items-center gap-3">
        <span className="inline-flex">
          <svg
            className="text-[#C65D21]"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M4 2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-7l-3 4-3-4H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
          </svg>
        </span>
        <span className="inline-flex">{replyCount}개의 댓글이 있습니다.</span>
      </h2>
      <div className="flex gap-2 mb-4 text-gray-600">
        <button className="hover:text-[#C65D21] cursor-pointer">등록순</button>
        <span>|</span>
        <button className="hover:text-[#C65D21] cursor-pointer">최신순</button>
      </div>
    </div>
  );
};

ReplyHeader.propTypes = {
  replyCount: propTypes.number,
};

export default ReplyHeader;
