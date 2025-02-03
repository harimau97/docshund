import PropTypes from "prop-types";

const TextContent = ({ tag, textContent, isHTML }) => {
  return (
    <div className="flex flex-col h-[46%] w-full">
      <div className="border-black border-1 w-1/12 min-w-[150px] flex justify-center items-center pt-2 pr-2 pl-2 rounded-tl-xl rounded-tr-xl max-h-[33px]">
        {tag}
      </div>
      <div className="box-border w-9/20 min-h-9/10 flex-1 bg-white rounded-br-xl rounded-bl-xl border-solid border-[87867F] border-1 relative overflow-y-scroll p-4">
        {isHTML ? (
          <div dangerouslySetInnerHTML={{ __html: textContent }}></div>
        ) : (
          <div>{textContent}</div>
        )}
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
