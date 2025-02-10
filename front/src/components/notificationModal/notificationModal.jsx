import { Bell } from "lucide-react";

const NotificationModal = () => {
  return (
    <div className="w-[320px] h-[420px] bg-white rounded-lg shadow-lg p-4">
      {/* Header */}
      <h2 className="text-lg font-semibold text-gray-900 mb-4">알림</h2>

      {/* Content */}
      <div className="flex flex-col items-center justify-center h-[320px]">
        {/* Icon */}
        <div className="mb-8">
          <div className="relative">
            <Bell className="w-14 h-14 text-gray-400" />
            <div className="absolute top-0 right-0 w-14 h-14">
              <div className="relative w-full h-full">
                <div className="absolute top-1/2 left-1/2 w-12 h-0.5 bg-gray-400 transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Text */}
        <p className="text-lg font-medium text-gray-900 mb-3">
          현재 알림이 없습니다.
        </p>
        <p className="text-sm text-gray-600 text-center">
          게시글 작성과 번역하기를 통해
          <br />
          활동을 늘려보세요!
        </p>
      </div>
    </div>
  );
};

export default NotificationModal;
