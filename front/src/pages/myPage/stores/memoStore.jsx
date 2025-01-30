import { create } from "zustand";

const memoStore = create((set) => ({
  memos: [
    {
      memo_id: 1,
      title: "메모 1",
      content: "이것은 메모 내용 1입니다.",
      created_at: "2025.01.22",
      updated_at: "2025.01.23",
    },
    {
      memo_id: 2,
      title: "메모 2",
      content: "이것은 메모 내용 2입니다.",
      created_at: "2025.01.22",
      updated_at: "2025.01.23",
    },
    {
      memo_id: 3,
      title: "메모 3",
      content: "이것은 메모 내용 3입니다.",
      created_at: "2025.01.22",
      updated_at: "2025.01.23",
    },
    {
      memo_id: 4,
      title: "메모 4",
      content: "이것은 메모 내용 4입니다.",
      created_at: "2025.01.22",
      updated_at: "2025.01.23",
    },
    {
      memo_id: 5,
      title: "메모 5",
      content: "이것은 메모 내용 5입니다.",
      created_at: "2025.01.22",
      updated_at: "2025.01.23",
    },
    {
      memo_id: 6,
      title: "메모 6",
      content: "이것은 메모 내용 6입니다.",
      created_at: "2025.01.22",
      updated_at: "2025.01.23",
    },
    {
      memo_id: 7,
      title: "메모 7",
      content: "이것은 메모 내용 7입니다.",
      created_at: "2025.01.22",
      updated_at: "2025.01.23",
    },
    {
      memo_id: 8,
      title: "메모 8",
      content: "이것은 메모 내용 8입니다.",
      created_at: "2025.01.22",
      updated_at: "2025.01.23",
    },
    {
      memo_id: 9,
      title: "메모 9",
      content: "이것은 메모 내용 9입니다.",
      created_at: "2025.01.22",
      updated_at: "2025.01.23",
    },
    {
      memo_id: 10,
      title: "메모 10",
      content:
        "이것은 메모 내용 10입니다.이것은 메모 내용 10입니다.이것은 메모 내용 10입니다.이것은 메모 내용 10입니다.이것은 메모 내용 10입니다.이것은 메모 내용 10입니다.이것은 메모 내용 10입니다.이것은 메모 내용 10입니다.이것은 메모 내용 10입니다.이것은 메모 내용 10입니다.이것은 메모 내용 10입니다.이것은 메모 내용 10입니다.이것은 메모 내용 10입니다.이것은 메모 내용 10입니다.이것은 메모 내용 10입니다.이것은 메모 내용 10입니다.이것은 메모 내용 10입니다.이것은 메모 내용 10입니다.이것은 메모 내용 10입니다.이것은 메모 내용 10입니다.이것은 메모 내용 10입니다.이것은 메모 내용 10입니다.이것은 메모 내용 10입니다.이것은 메모 내용 10입니다.이것은 메모 내용 10입니다.이것은 메모 내용 10입니다.",
      created_at: "2025.01.22",
      updated_at: "2025.01.23",
    },
  ],
  setMemos: (memos) => set({ memos }),
}));

export default memoStore;
