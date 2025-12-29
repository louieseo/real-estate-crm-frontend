import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRole, children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // 로그인 안한 경우
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // 권한이 다른 경우
  if (role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  // Admin 처럼 Nested Route 구조일 경우
  if (!children) {
    return <Outlet />;
  }

  // Agent 처럼 children 사용하는 경우
  return children;
};

export default ProtectedRoute;
