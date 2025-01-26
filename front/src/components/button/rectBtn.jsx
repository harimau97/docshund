import PropTypes from "prop-types";

const RectBtn = ({ onClick, text = "" }) => {
  // 버튼을 사용할 때 onClick에 실행할 함수와, 버튼의 이름인 text를 작성하고 사용

  return (
    <button
      className="box-border bg-[#bc5b39] rounded-[5px] px-[22px] py-[8px] w-fit h-10 flex flex-row items-center justify-center shrink-0 relative hover:bg-[#C96442]"
      onClick={onClick}
      type="button"
    >
      <div className="text-white font-semibold">{text}</div>
    </button>
  );
};

RectBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string,
};

export default RectBtn;
