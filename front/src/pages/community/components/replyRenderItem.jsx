import Proptypes from "prop-types";

const ReplyRenderItem = ({ item }) => {
  return (
    <div className="flex justify-between text-lg px-3 mt-2 mb-2">
      <div className="flex-1 min-w-0 mr-3 flex flex-col justify-between">
        <div className="flex space-x-6 items-bottom">
          {/* 이미지 영역 */}
          <div className="flex flex-col justify-between">
            <img
              src={item.profileImage}
              alt="프로필"
              className="w-8 h-8 rounded-full"
            />
            {/* TODO: 프로필 옆에 닉네임 두기 */}
            <p>{item.nickname}</p>
          </div>
        </div>
        <div className="text-base line-clamp-1 break-all">{item.content}</div>
        <p className="text-base">{item.createdAt}</p>
      </div>
    </div>
  );
};

ReplyRenderItem.propTypes = {
  item: Proptypes.object,
};

export default ReplyRenderItem;
