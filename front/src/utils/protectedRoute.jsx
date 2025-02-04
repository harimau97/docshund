import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth.jsx";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  // 인증되어 있으면 자식 라우트를 렌더링하고, 아니면 "/"로 리다이렉트
  return isAuthenticated() ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
