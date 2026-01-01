import CustomerForm from "./pages/Admin/CustomerForm";

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
import { CustomerProvider } from "./context/CustomerContext";

function App() {
  return (
    <BrowserRouter>
      {/* ⬇⬇ 여기 CustomerProvider 추가 */}
      <CustomerProvider>
        <Routes>
          {/* 로그인 */}
          <Route path="/" element={<Login />} />

          
          <Route element={<ProtectedRoute allowedRole="admin" />}>
            <Route path="/admin" element={<AdminLayout />}>
              {/* 대시보드 메인 */}
              <Route index element={<DashboardHome />} />

              {/* 직원관리 */}
              <Route path="agents" element={<Agents />} />

              {/* 고객 리스트 페이지 */}
              <Route path="customers" element={<Customers />} />

              {/* ⬇⬇ 여기 추가! 고객 신규등록 페이지 */}
              <Route path="customers/new" element={<CustomerForm />} />
              {/* ⬆⬆ 반드시 이 위치에! */}

              {/* 매물 */}
              <Route path="properties" element={<Properties />} />

              {/* 리드 */}
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
      </CustomerProvider>
      {/* ⬆⬆ CustomerProvider 닫힘 */}
    </BrowserRouter>
  );
}

export default App;
