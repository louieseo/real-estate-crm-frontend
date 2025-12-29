import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

// import AdminDashboard from "./pages/Admin/AdminDashboard"; (아래와 교체)
import AdminLayout from "./pages/Admin/Layout";
import DashboardHome from "./pages/Admin/DashboardHome";
import Agents from "./pages/Admin/Agents";
import Customers from "./pages/Admin/Customers";
import Properties from "./pages/Admin/Properties";
import Leads from "./pages/Admin/Leads";

import AgentDashboard from "./pages/Agent/AgentDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 로그인 */}
        <Route path="/" element={<Login />} />

        {/* 관리자 페이지 - Admin Layout + 내부 페이지들 */}
        <Route element={<ProtectedRoute allowedRole="admin" />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="agents" element={<Agents />} />
            <Route path="customers" element={<Customers />} />
            <Route path="properties" element={<Properties />} />
            <Route path="leads" element={<Leads />} />
          </Route>
        </Route>

        {/* 직원 페이지 */}
        <Route
          path="/agent"
          element={
            <ProtectedRoute allowedRole="agent">
              <AgentDashboard />
            </ProtectedRoute>
          }
        />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
