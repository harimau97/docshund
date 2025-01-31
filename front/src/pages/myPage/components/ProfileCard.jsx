import PropTypes from "prop-types";

const ProfileCard = ({ profile, isEditing, handleChange }) => {
  return (
    <div className="w-auto bg-white p-10 rounded-xl border-1 border-[#E1E1DF] text-[#424242] mb-5">
      <div className="flex mb-4">
        <h3 className="w-30">이미지</h3>
        {isEditing ? (
          <>
            <img
              src={profile.image}
              alt="Profile"
              className="w-32 h-32 rounded-full"
            />
            <div className="flex flex-col ml-6 self-end">
              <button className="cursor-pointer bg-gray-200 p-2 rounded-lg text-xs hover:bg-gray-300 w-fit">
                변경
              </button>
              <div className="mt-2 text-xs text-gray-500">
                <p>• png, jpg, jpeg의 확장자</p>
                <p>• 1MB 이하의 이미지</p>
              </div>
            </div>
          </>
        ) : (
          <img
            src={profile.image}
            alt="Profile"
            className="w-32 h-32 rounded-full"
          />
        )}
      </div>
      <div className="flex mb-4">
        <h3 className="w-30">닉네임</h3>
        {isEditing ? (
          <input
            type="text"
            name="nickname"
            value={profile.nickname}
            onChange={handleChange}
            placeholder="닉네임을 입력해주세요."
            className="border p-2 rounded focus:outline-none focus:ring-1"
          />
        ) : (
          <p className="font-semibold ">{profile.nickname}</p>
        )}
      </div>
      <div className="flex mb-4">
        <h3 className="w-30">관심분야</h3>
        {isEditing ? (
          <input
            type="text"
            name="interests"
            value={profile.interests}
            onChange={handleChange}
            placeholder="관심분야를 입력해주세요."
            className="border p-2 rounded focus:outline-none focus:ring-1"
          />
        ) : (
          <p>{profile.interests}</p>
        )}
      </div>
      <h3 className="w-30 mb-4">자기소개</h3>
      {isEditing ? (
        <textarea
          name="introduction"
          value={profile.introduction}
          onChange={handleChange}
          placeholder="자기소개를 입력해주세요."
          className="border p-2 rounded w-full focus:outline-none focus:ring-1"
        />
      ) : (
        <p>{profile.introduction}</p>
      )}
    </div>
  );
};

ProfileCard.propTypes = {
  profile: PropTypes.shape({
    image: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
    interests: PropTypes.string.isRequired,
    introduction: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProfileCard;
