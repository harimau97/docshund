import { create } from "zustand";

const useUserProfileStore = create((set) => ({
  profile: {
    image:
      "https://img1.daumcdn.net/thumb/C500x500/?fname=http://t1.daumcdn.net/brunch/service/user/40yV/image/57msSqM71XQfFFReQZbkJm3c0Hg.jpg",
    nickname: "나는번역왕",
    interests: "FS 풀스택",
    introduction:
      "이상한 말 잔뜩 그냥 채워넣으려고 쓰는거임. 이상한 말 잔뜩 그냥 채워넣으려고 쓰는거임. 이상한 말 잔뜩 그냥 채워넣으려고 쓰는거임. 이상한 말 잔뜩 그냥 채워넣으려고 쓰는거임",
    email: "seohyeon.shkim@gmail.com",
    is_darkmode: false,
  },
  setProfile: (profileData) => set({ profile: profileData }),
  toggleDarkMode: () =>
    set((state) => ({
      profile: { ...state.profile, is_darkmode: !state.profile.is_darkmode },
    })),
}));

export default useUserProfileStore;
