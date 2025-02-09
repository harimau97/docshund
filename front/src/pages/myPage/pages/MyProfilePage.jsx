import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { ChevronRight } from "lucide-react";
import authService from "../../../services/authService";
import useUserProfileStore from "../../../store/myPageStore/userProfileStore";
import userProfileService from "../services/userProfileService";
import ProfileCard from "./ProfileCard";
import SettingsCard from "./SettingsCard";

const MyProfilePage = () => {
  const { profile, error, fetchProfile, updateProfile, deleteAccount } =
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
  const { logout } = authService();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
      fetchProfile(userId);
    }
  }, [fetchProfile]);

  useEffect(() => {
    if (profile) {
      setEditedProfile((prev) => ({ ...prev, ...profile }));
      console.log("원본 카피완료", profile);
    }
  }, [profile]);

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [error]);

  // 편집 모드 시작 취소
  const handleEditClick = () => setIsEditing(true);
  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedProfile(profile);
    setProfileImageFile(null);
  };

  // 닉네임 중복 체크
  const checkNickname = async () => {
    if (!editedProfile.nickname) {
      toast.warn("닉네임을 입력해주세요.");
      return false;
    }
    try {
      const isAvailable = await userProfileService.checkNickname(
        editedProfile.nickname,
        profile.nickname
      );
      if (isAvailable) {
        toast.success("사용 가능한 닉네임입니다.");
        return true;
      } else {
        toast.error("사용할 수 없는 닉네임입니다.");
        return false;
      }
    } catch (error) {
      toast.error("닉네임 중복 확인 중 오류가 발생했습니다.");
      return false;
    }
  };

  // 편집 모드 저장 (저장 후 페이지 리로딩 제거)
  const handleSaveClick = async (e) => {
    e.preventDefault();
    if (
      !editedProfile.nickname ||
      !editedProfile.hobby ||
      !editedProfile.introduce ||
      !editedProfile.email
    ) {
      toast.warn("모든 필드를 입력해주세요.");
      return;
    }

    const isUnique = await checkNickname();
    if (!isUnique) return;

    const formData = new FormData();
    formData.append(
      "profile",
      new Blob([JSON.stringify(editedProfile)], { type: "application/json" })
    );
    if (profileImageFile) {
      formData.append("file", profileImageFile);
    }

    // FormData 내용 확인 (디버깅용)
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
      toast.success("프로필이 성공적으로 업데이트되었습니다.");
      setIsEditing(false);
    } catch (error) {
      toast.error("프로필 업데이트 중 오류가 발생했습니다.");
      console.error("프로필 업데이트 실패", error);
    }
  };

  // 이미지 변경 처리
  const MAX_FILE_SIZE = 1 * 1024 * 1024;
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      toast.warn("이미지 파일 크기는 1MB 이하만 가능합니다.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setEditedProfile((prev) => ({
        ...prev,
        profileImage: reader.result,
      }));
      setProfileImageFile(file);
    };
    reader.readAsDataURL(file);
  };

  // toastify를 이용한 계정 탈퇴 확인창
  const confirmDeleteAccount = () => {
    return new Promise((resolve) => {
      toast(
        ({ closeToast }) => (
          <div>
            <p>정말로 계정을 탈퇴하시겠습니까?</p>
            <div className="flex justify-end space-x-2 mt-2">
              <button
                onClick={() => {
                  resolve(true);
                  closeToast();
                }}
                className="bg-red-500 text-white px-3 py-1 rounded text-xs"
              >
                예
              </button>
              <button
                onClick={() => {
                  resolve(false);
                  closeToast();
                }}
                className="bg-gray-300 text-black px-3 py-1 rounded text-xs"
              >
                아니요
              </button>
            </div>
          </div>
        ),
        { autoClose: false }
      );
    });
  };

  // 계정 탈퇴 처리
  const handleDeleteAccount = async () => {
    const confirmed = await confirmDeleteAccount();
    if (confirmed) {
      try {
        const success = await deleteAccount(userId);
        if (success) {
          toast.success("계정이 성공적으로 탈퇴되었습니다.");
          logout();
        } else {
          toast.error("계정 탈퇴 중 오류가 발생했습니다.");
        }
      } catch (error) {
        toast.error("계정 탈퇴 중 오류가 발생했습니다.");
        console.error("계정 탈퇴 실패", error);
      }
    }
  };

  // 입력 값 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({ ...prev, [name]: value }));
  };

  // 환경설정 (테마) 변경 처리
  const handleThemeChange = (e) => {
    const { value } = e.target;
    setEditedProfile((prev) => ({
      ...prev,
      isDarkmode: value === "dark",
    }));
  };

  return (
    <div>
      <div className="flex justify-between mb-5">
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
        handleNicknameCheck={checkNickname}
      />

      <h1 className="font-bold text-2xl mt-5 mb-5">환경설정</h1>
      <SettingsCard
        isEditing={isEditing}
        editedProfile={editedProfile}
        handleThemeChange={handleThemeChange}
      />

      <div className="mt-5 mr-2 flex justify-end">
        <button
          className="flex items-center text-gray-500 hover:text-red-600 hover:underline"
          onClick={handleDeleteAccount}
        >
          <p className="text-bold">계정탈퇴</p>
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default MyProfilePage;
