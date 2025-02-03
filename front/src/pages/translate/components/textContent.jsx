import PropTypes from "prop-types";
import ToastViewer from "./toastViewer";

const TextContent = ({ tag, textContent }) => {
  return (
    <div className="flex flex-col h-[calc(50%)] min-h-0 w-full">
      <div className="border-black border-1 min-w-[150px] flex items-center p-2 rounded-tl-xl rounded-tr-xl h-8">
        {tag}
      </div>
      <div className="flex-1 bg-white rounded-br-xl rounded-bl-xl border-solid border-[87867F] border-1 overflow-y-auto p-4">
        <ToastViewer content={textContent} />
      </div>
    </div>
  );
};

TextContent.propTypes = {
  tag: PropTypes.string,
  textContent: PropTypes.string,
  isHTML: PropTypes.bool,
};

export default TextContent;
