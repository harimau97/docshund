import PropTypes from "prop-types";

const RectBtn = ({ onClick, text = "", className = "" }) => {
  return (
    <button
      className={`bg-[#bc5b39] rounded-[5px] px-[clamp(4px,1.5vw,18px)] py-[clamp(4px,0.7vw,8px)] min-w-[80px] text-[clamp(12px,1.5vw,16px)] text-white font-semibold hover:bg-[#C96442] cursor-pointer ${className}`}
      onClick={onClick}
      type="button"
    >
      {text}
    </button>
  );
};

RectBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string,
};

export default RectBtn;
