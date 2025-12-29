// Logout 버튼추가를 위해 useNavigate 를 사용해야함으로 아래 import 에 다음에 추가
import { Outlet, Link, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  // Logout 버튼추가
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    alert("로그아웃 되었습니다.");
    navigate("/");
  };

  return (
    <div style={{ display: "flex" }}>
      {/* 왼쪽 사이드바 */}
      <div
        style={{
          width: "220px",
          height: "100vh",
          background: "#222",
          color: "white",
          padding: "20px",
        }}
      >
        <h2>Admin CRM</h2>

        <ul style={{ listStyle: "none", padding: 0, marginTop: "30px" }}>
          <li>
            <Link to="/admin" style={{ color: "white" }}>
              Dashboard
            </Link>
          </li>
          <li style={{ marginTop: "10px" }}>
            <Link to="/admin/agents" style={{ color: "white" }}>
              Agents
            </Link>
          </li>
          <li style={{ marginTop: "10px" }}>
            <Link to="/admin/customers" style={{ color: "white" }}>
              Customers
            </Link>
          </li>
          <li style={{ marginTop: "10px" }}>
            <Link to="/admin/properties" style={{ color: "white" }}>
              Properties
            </Link>
          </li>
          <li style={{ marginTop: "10px" }}>
            <Link to="/admin/leads" style={{ color: "white" }}>
              Leads
            </Link>
          </li>
        </ul>

        {/* 로그아웃 버튼 추가 */}
        <button
          onClick={handleLogout}
          style={{
            marginTop: "30px",
            padding: "10px",
            width: "100%",
            background: "red",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      {/* 오른쪽 콘텐츠 영역 */}
      <div style={{ padding: "30px", width: "100%" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
