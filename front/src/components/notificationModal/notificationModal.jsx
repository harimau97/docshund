import { Bell } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import propTypes from "prop-types";

import notificationModalStore from "../../store/notificationModalStore";

const NotificationModal = () => {
  const token = localStorage.getItem("token");
  const notifications = notificationModalStore((state) => state.notifications);

  let userId = null;
  if (token) {
    const decoded = jwtDecode(token);
    userId = decoded.userId;
  }

  // UseSSE(userId);

  if (!token) {
    window.alert("로그인이 필요한 서비스입니다.");
    return null;
  }

  return (
    <div className="w-[330px] h-[420px] bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">알림</h2>

      <div className="flex flex-col h-[320px]">
        {notifications.length > 0 ? (
          <div className="overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.alertId}
                className="p-3 border-b hover:bg-gray-50 cursor-pointer"
              >
                <p className="text-sm text-gray-900">{notification.title}</p>
                <span className="text-xs text-gray-500">
                  {new Date(notification.createdAt).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
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
            <p className="text-lg font-medium text-gray-900 mb-3">
              현재 알림이 없습니다.
            </p>
            <p className="text-sm text-gray-600 text-center">
              게시글 작성과 번역하기를 통해
              <br />
              활동을 늘려보세요!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

NotificationModal.propTypes = {
  userId: propTypes.string,
};

export default NotificationModal;
