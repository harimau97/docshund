import { create } from "zustand";

const ChatBotStore = create((set) => ({
  isChatBotOpen: true,
  isChatBotVisible: false,
  toggleChatBot: () =>
    set((state) => ({
      isChatBotVisible: !state.isChatBotVisible,
    })),
}));

export default ChatBotStore;
