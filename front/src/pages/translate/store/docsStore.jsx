import { create } from "zustand";
import PropTypes from "prop-types";

const docsStore = create((set) => ({
  docsList: [],
  currentDocsId: 0,
  documentCategory: "",
  viewCount: 0,
  likeCount: 0,
  createdAt: "",
  documentVersion: "",
  documentLogo: "",
  position: "",
}));

export default docsStore;
