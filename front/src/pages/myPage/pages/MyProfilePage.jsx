import { useState, useEffect } from "react";
import useUserProfileStore from "../store/userProfileStore";
import ProfileCard from "../components/ProfileCard";
import Setting from "../components/Setting";

const MyProfilePage = () => {
  const { profile, isLoading, error, fetchProfile, updateProfile } =
    useUserProfileStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile || {});

  useEffect(() => {
    const userId = 220;
    fetchProfile(userId);
  }, [fetchProfile]);

  useEffect(() => {
    if (profile) {
      setEditedProfile(profile);
    }
  }, [profile]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  //편집버튼 눌렀을때
  const handleEditClick = () => setIsEditing(true);

  //편집모드에서 취소버튼 눌렀을때
  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedProfile(profile);
  };

  //편집모드에서 저장버튼 눌렀을때
  const handleSaveClick = async () => {
    if (editedProfile) {
      await updateProfile(editedProfile);
      setIsEditing(false);
    }
  };

  //Input값 보여주기
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({ ...prev, [name]: value }));
  };

  //이미지 변경 버튼 눌렀을때
  const MAX_FILE_SIZE = 1 * 1024 * 1024;
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      alert("이미지 파일 크기는 1MB 이하만 가능합니다.");
      e.target.value = "";
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProfile((prev) => ({
          ...prev,
          profileImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  //테마 모드 변경했을때
  const handleDarkModeToggle = () => {
    const updatedProfile = {
      ...profile, // 기존 프로필 복사
      isDarkmode: !profile.isDarkmode,
    };
    updateProfile(updatedProfile);
  };

  return (
    <div>
      <div className="flex justify-between mt-5 mb-5">
        <h1 className="font-bold text-2xl">내 프로필</h1>
        {!isEditing && (
          <button
            className="bg-[#bc5b39] rounded-[12px] px-[20px] w-fit h-10 relative flex items-center justify-center text-white hover:bg-[#C96442]"
            onClick={handleEditClick}
          >
            편집
          </button>
        )}
      </div>

      {/* 프로필 카드 */}
      <ProfileCard
        profile={isEditing ? editedProfile : profile}
        isEditing={isEditing}
        handleChange={handleChange}
        handleImageChange={handleImageChange}
      />

      {/* 편집모드일때 뜨는 버튼 */}
      {isEditing && (
        <div className="flex justify-end space-x-5 mt-5">
          <button
            className="border-box rounded-[12px] px-[20px] w-fit h-10 hover:text-[#ffffff] hover:bg-[#bc5b39]"
            onClick={handleCancelClick}
          >
            취소
          </button>
          <button
            className="border-box bg-[#bc5b39] rounded-[12px] px-[20px] w-fit h-10 text-[#ffffff] hover:bg-[#C96442]"
            onClick={handleSaveClick}
          >
            저장
          </button>
        </div>
      )}

      {/* 환경설정 카드 */}
      <h1 className="font-bold text-2xl mt-5 mb-5">환경설정</h1>
      <Setting profile={profile} handleDarkModeToggle={handleDarkModeToggle} />
    </div>
  );
};

export default MyProfilePage;
