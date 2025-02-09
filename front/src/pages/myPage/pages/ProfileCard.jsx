import PropTypes from "prop-types";
import { toast } from "react-toastify";

const ProfileCard = ({
  isEditing,
  editedProfile,
  handleChange = null,
  handleImageChange = null,
}) => {
  const profile = editedProfile || {};
  const getByteLength = (str) => new Blob([str]).size;
  const MAX_NICKNAME_BYTES = 20;
  const MAX_CONTENT_BYTES = 225;

  const handleNicknameInputChange = (e) => {
    const { value } = e.target;
    if (getByteLength(value) <= MAX_NICKNAME_BYTES) {
      handleChange(e);
    }
  };

  const handleIntroduceInputChange = (e) => {
    const { value } = e.target;
    if (getByteLength(value) <= MAX_CONTENT_BYTES) {
      handleChange(e);
    }
  };

  // 닉네임 중복 확인
  const handleNicknameCheck = async () => {
    if (!profile.nickname) {
      toast.warn("닉네임을 입력해주세요.");
      return;
    }
    // 실제 API 호출로 중복 여부 확인 가능
    if (profile.nickname === "taken") {
      toast.error("이미 사용중인 닉네임입니다.");
    } else {
      toast.success("사용 가능한 닉네임입니다.");
    }
  };

  return (
    <div className="w-auto bg-white p-10 rounded-xl border-1 border-[#E1E1DF] text-[#424242] mb-5">
      <div className="flex mb-4">
        <h3 className="w-30">이미지</h3>
        {isEditing ? (
          <>
            <img
              src={profile.profileImage || "/default-profile.png"}
              alt="Profile"
              className="w-32 h-32 rounded-full"
            />
            <div className="flex flex-col ml-6 self-end">
              <label className="cursor-pointer bg-gray-200 p-2 rounded-lg text-xs hover:bg-gray-300 w-fit">
                변경
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
              <div className="mt-2 text-xs text-gray-500">
                <p>• png, jpg, jpeg의 확장자</p>
                <p>• 1MB 이하의 이미지</p>
              </div>
            </div>
          </>
        ) : (
          <img
            src={profile.profileImage || "/default-profile.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full"
          />
        )}
      </div>
      <div className="flex mb-4">
        <h3 className="w-30">닉네임</h3>
        {isEditing ? (
          <div className="flex flex-col justify-start">
            <div className="flex items-center">
              <input
                type="text"
                name="nickname"
                value={profile.nickname || ""}
                onChange={handleNicknameInputChange}
                placeholder="닉네임을 입력해주세요."
                className="border p-2 rounded mr-3 focus:outline-none focus:ring-[#bc5b39] focus:border-[#bc5b39]"
              />
              <button
                type="button"
                onClick={handleNicknameCheck}
                className="cursor-pointer bg-gray-200 p-2 rounded-lg text-xs hover:bg-gray-300 w-fit"
              >
                중복확인
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              • 한글 6자, 영어 20자 이내 (최대 20byte)
            </p>
          </div>
        ) : (
          <p className="font-semibold ">{profile.nickname}</p>
        )}
      </div>
      <div className="flex mb-4">
        <h3 className="w-30">관심분야</h3>
        {isEditing ? (
          <select
            name="hobby"
            value={profile.hobby || ""}
            onChange={handleChange}
            className="border p-2 rounded focus:outline-none focus:ring-[#bc5b39] focus:border-[#bc5b39]"
          >
            <option value="">관심분야를 선택해주세요</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
          </select>
        ) : (
          <p>{profile.hobby}</p>
        )}
      </div>
      <h3 className="w-30 mb-4">자기소개</h3>
      {isEditing ? (
        <>
          <textarea
            name="introduce"
            value={profile.introduce || ""}
            onChange={handleIntroduceInputChange}
            placeholder="자기소개를 입력해주세요."
            className="border p-2 rounded w-full focus:outline-none focus:ring-[#bc5b39] focus:border-[#bc5b39]"
            style={{ height: "100px", resize: "none" }}
          />
          <p className="text-xs text-gray-500 mt-1 mr-2 text-right">
            {getByteLength(profile.introduce || "")} / {MAX_CONTENT_BYTES} byte
          </p>
        </>
      ) : (
        <p className="break-all">{profile.introduce}</p>
      )}
    </div>
  );
};

ProfileCard.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  editedProfile: PropTypes.shape({
    profileImage: PropTypes.string,
    nickname: PropTypes.string,
    hobby: PropTypes.string,
    introduce: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func,
  handleImageChange: PropTypes.func,
  handleNicknameCheck: PropTypes.func,
};

export default ProfileCard;
