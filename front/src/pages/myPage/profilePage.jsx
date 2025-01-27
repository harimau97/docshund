import useUserProfileStore from "./stores/userProfile";

const ProfilePage = () => {
  const { profile, toggleDarkMode } = useUserProfileStore();

  return (
    <div className="w-auto">
      <ProfileCard profile={profile} />
      <Setting profile={profile} toggleDarkMode={toggleDarkMode} />
    </div>
  );
};

const ProfileCard = ({ profile }) => {
  return (
    <div className="w-auto bg-white p-10 rounded-xl border-1 border-gray-300 text-[#424242] mb-5">
      <div className="flex justify-between mb-5">
        <h1 className="font-bold text-xl">내 프로필</h1>
        <button className="border-box text-sm bg-[#F0EEE5] rounded-[12px] px-[20px] w-fit h-8 relative flex items-center justify-center text-[#7D7C77] hover:bg-[#EAE9E0]">
          편집
        </button>
      </div>
      <div className="flex mb-4">
        <h3 className="w-30">이미지</h3>
        <img
          src={profile.image}
          alt="Profile"
          className="w-32 h-32 rounded-full"
        />
      </div>
      <div className="flex mb-4">
        <h3 className="w-30">닉네임</h3>
        <p className="font-semibold">{profile.nickname}</p>
      </div>
      <div className="flex mb-4">
        <h3 className="w-30">관심분야</h3>
        <p>{profile.interests}</p>
      </div>
      <h3 className="w-30 mb-4">자기소개</h3>
      <p>{profile.introduction}</p>
    </div>
  );
};

const Setting = ({ profile, toggleDarkMode }) => {
  return (
    <div className="w-auto bg-white p-10 rounded-xl border-1 border-gray-300 text-[#424242]">
      <div className="flex justify-between mb-5">
        <h1 className="font-bold text-xl">환경설정</h1>
        <button className="border-box text-sm bg-[#F0EEE5] rounded-[12px] px-[20px] w-fit h-8 relative flex items-center justify-center text-[#7D7C77] hover:bg-[#EAE9E0]">
          저장
        </button>
      </div>
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

export default ProfilePage;
