import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import useUserProfileStore from "../store/userProfileStore";
import ProfileCard from "./ProfileCard";
import SettingsCard from "./SettingsCard";

const MyProfilePage = () => {
  const { profile, isLoading, error, fetchProfile, updateProfile } =
    useUserProfileStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    nickname: "",
    hobby: "",
    introduce: "",
    profileImage: "",
    email: "",
    isDarkmode: false,
    ...profile,
  });
  const [userId, setUserId] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // 토큰이 존재하면 userId 추출
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
      fetchProfile(userId); // userId로 프로필 정보 가져오기
    }
  }, [fetchProfile]);

  useEffect(() => {
    if (profile) {
      setEditedProfile((prev) => ({ ...prev, ...profile }));
      console.log("원본 카피완료", profile);
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
    setProfileImageFile(null);
  };

  //편집모드에서 저장버튼 눌렀을때
  const handleSaveClick = async (e) => {
    e.preventDefault();
    if (
      !editedProfile.nickname ||
      !editedProfile.hobby ||
      !editedProfile.introduce ||
      !editedProfile.email
    ) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append(
      "profile",
      new Blob([JSON.stringify(editedProfile)], { type: "application/json" })
    );
    if (profileImageFile) {
      formData.append("file", profileImageFile);
    }

    // Log FormData contents
    for (let [key, value] of formData.entries()) {
      if (key === "profile") {
        value.text().then((text) => {
          console.log(`${key}:`, JSON.parse(text));
        });
      } else {
        console.log(`${key}: ${value}`);
      }
    }

    try {
      await updateProfile(userId, formData);
      alert("프로필이 성공적으로 업데이트되었습니다.");
      setIsEditing(false);
    } catch (error) {
      alert("프로필 업데이트 중 오류가 발생했습니다.");
      console.error("프로필 업데이트 실패", error);
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
        setProfileImageFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle theme change
  const handleThemeChange = (e) => {
    const { value } = e.target;
    setEditedProfile((prev) => ({
      ...prev,
      isDarkmode: value === "dark",
    }));
  };

  return (
    <div>
      <div className="flex justify-between mt-5 mb-5">
        <h1 className="font-bold text-2xl">내 프로필</h1>
        {!isEditing ? (
          <button
            className="bg-[#bc5b39] rounded-[12px] px-[20px] w-fit h-10 relative flex items-center justify-center text-white hover:bg-[#C96442]"
            onClick={handleEditClick}
          >
            편집
          </button>
        ) : (
          <div className="flex space-x-5">
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
      </div>

      <ProfileCard
        isEditing={isEditing}
        editedProfile={editedProfile}
        handleChange={handleChange}
        handleImageChange={handleImageChange}
      />

      <h1 className="font-bold text-2xl mt-5 mb-5">환경설정</h1>
      <SettingsCard
        isEditing={isEditing}
        editedProfile={editedProfile}
        handleThemeChange={handleThemeChange}
      />
    </div>
  );
};

export default MyProfilePage;
