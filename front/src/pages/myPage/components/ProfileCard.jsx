import PropTypes from "prop-types";

const ProfileCard = ({
  profile,
  isEditing,
  handleChange,
  handleImageChange,
}) => {
  if (!profile) {
    return <div>Loading...</div>;
  }

  console.log(profile);

  return (
    <div className="w-auto bg-white p-10 rounded-xl border-1 border-[#E1E1DF] text-[#424242] mb-5">
      <div className="flex mb-4">
        <h3 className="w-30">이미지</h3>
        {isEditing ? (
          <>
            <img
              src={profile.profileImage}
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
            src={profile.profileImage}
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
            name="hobby"
            value={profile.hobby}
            onChange={handleChange}
            placeholder="관심분야를 입력해주세요."
            className="border p-2 rounded focus:outline-none focus:ring-1"
          />
        ) : (
          <p>{profile.hobby}</p>
        )}
      </div>
      <h3 className="w-30 mb-4">자기소개</h3>
      {isEditing ? (
        <textarea
          name="introduce"
          value={profile.introduce}
          onChange={handleChange}
          placeholder="자기소개를 입력해주세요."
          className="border p-2 rounded w-full focus:outline-none focus:ring-1"
        />
      ) : (
        <p>{profile.introduce}</p>
      )}
    </div>
  );
};

ProfileCard.propTypes = {
  profile: PropTypes.shape({
    profileImage: PropTypes.string,
    nickname: PropTypes.string,
    hobby: PropTypes.string,
    introduce: PropTypes.string,
  }),
  isEditing: PropTypes.bool.isRequired,
  handleImageChange: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default ProfileCard;
