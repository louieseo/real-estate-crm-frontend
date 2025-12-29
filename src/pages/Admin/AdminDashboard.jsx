import { useNavigate } from "react-router-dom";


const AdminDashboard = () => {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");

        alert("로그아웃 되었습니다.");
        navigate("/");
    };


  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>
      <p>관리자만 볼 수 있는 페이지</p>
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default AdminDashboard;
