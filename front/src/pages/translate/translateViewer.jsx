import { useState } from "react";
import axios from "axios";

const TranslateViewer = () => {
  // let [docParts, setDocParts] = useState([]);
  let [htmlContent, setHtmlContent] = useState("");

  async function getDocParts() {
    let tempHtmlContent = "";
    try {
      const response = await axios.get(
        "http://localhost:8080/api/docs/docParts"
      );
      console.log(response.data);
      // setDocParts(response.data);
      await response.data.forEach((element) => {
        tempHtmlContent += element.content;
      });
      setHtmlContent(tempHtmlContent);
      console.log(htmlContent);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="h-[99%] border-black border-2 w-3/4 absolute top-1/2 left-1/2 -translate-1/2 overflow-y-scroll p-4">
      <button
        className="cursor-pointer border-black border-2"
        onClick={getDocParts}
      >
        Get Doc Parts
      </button>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
};

export default TranslateViewer;
