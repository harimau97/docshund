import { create } from "zustand";

const ChatBotStore = create((set) => ({
  isChatBotOpen: true,
  isChatBotVisible: false,
  messages: [],
  registMessages: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  toggleChatBot: () =>
    set((state) => ({
      isChatBotVisible: !state.isChatBotVisible,
    })),
}));

export default ChatBotStore;
