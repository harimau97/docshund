import { create } from "zustand";

const likeDocsStore = create(() => ({
  docs: [
    {
      docsId: 1,
      documentName: "JavaScript Basics",
      position: 1,
      liked: true,
    },
    {
      docsId: 2,
      documentName: "React Guide",
      position: 2,
      liked: true,
    },
    {
      docsId: 3,
      documentName: "Node.js for Beginners",
      position: 3,
      liked: true,
    },
    {
      docsId: 4,
      documentName: "Vue.js Complete Tutorial",
      position: 4,
      liked: true,
    },
    {
      docsId: 5,
      documentName: "CSS Grid Layout",
      position: 5,
      liked: true,
    },
    {
      docsId: 6,
      documentName: "Understanding TypeScript",
      position: 6,
      liked: true,
    },
  ],
}));

export default likeDocsStore;
