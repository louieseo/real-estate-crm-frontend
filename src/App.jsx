import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인 페이지 */}
        <Route path="/" element={<Login />} />

        {/* 관리자 페이지 (임시 화면) */}
        <Route path="/admin" element={<h1>Admin Dashboard</h1>} />

        {/* 직원 페이지 (임시 화면) */}
        <Route path="/agent" element={<h1>Agent Dashboard</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
