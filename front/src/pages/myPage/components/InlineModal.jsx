import PropTypes from "prop-types";

const InlineModal = ({ item }) => {
  return (
    <div className="mt-3">
      <div className="mt-2 p-4 bg-[#F9F8F2] rounded-xl">
        <h4 className="font-semibold text-[#7D7C77]">사용자 문의</h4>
        <p>{item.content}</p>
      </div>
      <div>
        <div className="mt-2 p-4 bg-[#F9F8F2] rounded-xl">
          <h4 className="font-semibold text-[#7D7C77]">관리자 답변</h4>
          <p>{item.isAnswered ? item.answer : "답변 대기 중"}</p>
        </div>
      </div>
    </div>
  );
};

InlineModal.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    isAnswered: PropTypes.bool.isRequired,
    answer: PropTypes.string,
  }).isRequired,
};

export default InlineModal;
