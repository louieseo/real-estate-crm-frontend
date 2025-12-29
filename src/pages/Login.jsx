import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [role, setRole] = useState("admin"); // 기본 admin
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 🔥 역할에 따라 API 자동 선택
      const url =
        role === "admin"
          ? "http://localhost:4000/admin/login"
          : "http://localhost:4000/agent/login";

      const response = await axios.post(url, {
        email,
        password,
      });

      // JWT 토큰 저장 (백엔드에서 token 반환한다고 가정)
      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
      }

      // 역할(role)도 저장 추가
      localStorage.setItem("role", role);

      // 로그인 성공 후 페이지 이동
      alert(`${role.toUpperCase()} 로그인 성공!`);

      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/agent");
      }

      console.log("Login success:", response.data);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "로그인 실패. 다시 시도해주세요."
      );
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Login</h2>

      {/* 역할 선택 */}
      <div>
        <label>
          <input
            type="radio"
            value="admin"
            checked={role === "admin"}
            onChange={() => setRole("admin")}
          />
          Admin
        </label>

        <label style={{ marginLeft: "20px" }}>
          <input
            type="radio"
            value="agent"
            checked={role === "agent"}
            onChange={() => setRole("agent")}
          />
          Agent
        </label>
      </div>

      <form onSubmit={handleLogin} style={{ marginTop: "20px" }}>
        <div>
          <label>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

        <button
          type="submit"
          style={{ marginTop: "20px", width: "100%", padding: "10px" }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
