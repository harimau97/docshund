import { useState } from "react";
import ProfileCard from "./components/ProfileCard";
import Setting from "./components/Setting";
import userProfileStore from "./stores/userProfileStore";

const ProfilePage = () => {
  const { profile, toggleDarkMode } = userProfileStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedProfile(profile); // 취소시 원래 값으로 되돌리기
  };

  const handleSaveClick = async () => {
    await setProfile(editedProfile); // API 통신 또는 상태 업데이트
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <div className="flex justify-between mt-5 mb-5">
        <h1 className="font-bold text-2xl">내 프로필</h1>
        {!isEditing && (
          <button
            className="border-box bg-[#bc5b39] rounded-[12px] px-[20px] w-fit h-10 relative flex items-center justify-center text-[#ffffff] hover:bg-[#C96442]"
            onClick={handleEditClick}
          >
            편집
          </button>
        )}
      </div>
      <ProfileCard
        profile={isEditing ? editedProfile : profile}
        isEditing={isEditing}
        handleChange={handleChange}
      />
      {isEditing && (
        <div className="flex justify-end space-x-5 mt-5">
          <button
            className="border-box rounded-[12px] px-[20px] w-fit h-10 relative flex items-center justify-center  hover:text-[#ffffff] hover:bg-[#bc5b39]"
            onClick={handleCancelClick}
          >
            취소
          </button>
          <button
            className="border-box bg-[#bc5b39] rounded-[12px] px-[20px] w-fit h-10 relative flex items-center justify-center text-[#ffffff] hover:bg-[#C96442]"
            onClick={handleSaveClick}
          >
            저장
          </button>
        </div>
      )}
      <h1 className="font-bold text-2xl mt-5 mb-5">환경설정</h1>
      <Setting profile={profile} toggleDarkMode={toggleDarkMode} />
    </div>
  );
};

export default ProfilePage;
