import PropTypes from "prop-types";

const Setting = ({ profile, toggleDarkMode }) => {
  return (
    <div className="w-auto bg-white p-10 rounded-xl border-1 border-[#E1E1DF] text-[#424242]">
      <div className="flex mb-4">
        <h3 className="w-30">이메일</h3>
        <p className="font-semibold">{profile.email}</p>
      </div>
      <div className="flex mb-4">
        <h3 className="w-30">모드설정</h3>
        <label className="mr-5">
          <input
            type="radio"
            className="mr-2"
            checked={!profile.is_darkmode}
            onChange={toggleDarkMode}
          />
          라이트 모드
        </label>
        <label>
          <input
            type="radio"
            className="mr-2"
            checked={profile.is_darkmode}
            onChange={toggleDarkMode}
          />
          다크 모드
        </label>
      </div>
    </div>
  );
};

Setting.propTypes = {
  profile: PropTypes.shape({
    email: PropTypes.string.isRequired,
    is_darkmode: PropTypes.bool.isRequired,
  }).isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
};

export default Setting;
