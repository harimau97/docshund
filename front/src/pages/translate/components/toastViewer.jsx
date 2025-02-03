import { useEffect, useRef } from "react";
import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import PropTypes from "prop-types";

const ToastViewer = ({ content }) => {
  const viewerRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize viewer
    viewerRef.current = new Viewer({
      el: containerRef.current,
      initialValue: content || "",
      height: "100%",
    });

    // Cleanup
    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
      }
    };
  }, [content]);

  return <div ref={containerRef} />;
};

ToastViewer.propTypes = {
  content: PropTypes.string,
};

export default ToastViewer;
