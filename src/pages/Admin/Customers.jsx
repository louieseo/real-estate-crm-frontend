import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCustomerContext } from "../../context/CustomerContext";


const Customers = () => {
  const navigate = useNavigate();

  // ⬇⬇ DB 연결된 Context 사용
  const { customers, fetchCustomers, loading } = useCustomerContext();

  const [filterType, setFilterType] = useState("all");

  // 🔥 페이지 들어오면 DB에서 고객 자동로드
  useEffect(() => {
    fetchCustomers();
  }, []);

  // ===========================
  // 필터 함수
  // ===========================
  const getFilteredCustomers = () => {
    const today = new Date();

    return customers.filter((c) => {
      if (!c.leaseEnd) {
        if (filterType === "progress") return true;
        if (filterType === "expired") return false;
        return filterType === "all";
      }

      const leaseEnd = new Date(c.leaseEnd);

      if (filterType === "all") return true;

      if (filterType === "progress") {
        return leaseEnd >= today;
      }

      if (filterType === "thisMonth") {
        return (
          leaseEnd.getFullYear() === today.getFullYear() &&
          leaseEnd.getMonth() === today.getMonth()
        );
      }

      if (filterType === "60days") {
        const diff = leaseEnd - today;
        const days = diff / (1000 * 60 * 60 * 24);
        return days >= 0 && days <= 60;
      }

      if (filterType === "expired") {
        return leaseEnd < today;
      }

      return true;
    });
  };

  // ===========================
  // D-day 계산
  // ===========================
  const getDDay = (leaseEnd) => {
    if (!leaseEnd) return "-";

    const today = new Date();
    const end = new Date(leaseEnd);

    const diff = end - today;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days < 0) return "만료";
    if (days === 0) return "D-DAY";

    return `D-${days}`;
  };

  // ===========================
  // 로딩 처리
  // ===========================
  if (loading) {
    return <h2>고객 목록 불러오는 중...</h2>;
  }

  return (
    <div>
      <h1>Customers</h1>
      <p style={{ color: "gray" }}>DB에서 불러온 실제 고객 리스트</p>

      {/* 고객등록 버튼 */}
      <button
        style={{
          background: "#4CAF50",
          color: "white",
          padding: "10px 16px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          marginBottom: "12px",
        }}
        onClick={() => navigate("/admin/customers/new")}
      >
        고객 등록
      </button>

      {/* 필터 버튼 */}
      <button onClick={() => setFilterType("all")}>전체보기</button>
      <button style={{ marginLeft: 10 }} onClick={() => setFilterType("progress")}>
        진행중
      </button>
      <button style={{ marginLeft: 10 }} onClick={() => setFilterType("60days")}>
        60일종료
      </button>
      <button style={{ marginLeft: 10 }} onClick={() => setFilterType("thisMonth")}>
        30일종료
      </button>
      <button style={{ marginLeft: 10 }} onClick={() => setFilterType("expired")}>
        종료
      </button>

      {/* 테이블 */}
      <div
        style={{
          marginTop: "25px",
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <table width="100%">
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "2px solid #eee" }}>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>이름</th>
              <th style={thStyle}>이메일</th>
              <th style={thStyle}>핸드폰</th>
              <th style={thStyle}>계약일</th>
              <th style={thStyle}>시작일</th>
              <th style={thStyle}>종료일</th>
              <th style={thStyle}>계약종류</th>
              <th style={thStyle}>진행상태</th>
              <th style={thStyle}>D-Day</th>
              <th style={thStyle}>고객상태</th>
            </tr>
          </thead>

          <tbody>
            {getFilteredCustomers().map((c) => (
              <tr key={c.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={tdStyle}>{c.id}</td>

                {/* 상세페이지 이동 */}
                <td
                  style={{
                    ...tdStyle,
                    color: "blue",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                  onClick={() => navigate(`/admin/customers/${c.id}`)}
                >
                  {c.name}
                </td>

                <td style={tdStyle}>{c.email}</td>
                <td style={tdStyle}>{c.phone}</td>
                <td style={tdStyle}>{c.contractDate || "-"}</td>
                <td style={tdStyle}>{c.leaseStart || "-"}</td>
                <td style={tdStyle}>{c.leaseEnd || "-"}</td>
                <td style={tdStyle}>{c.contractType || "-"}</td>

                {/* 진행 상태 색 표시 */}
                <td
                  style={{
                    ...tdStyle,
                    color: (() => {
                      if (!c.leaseEnd) return "green";
                      const today = new Date();
                      const end = new Date(c.leaseEnd);
                      return end < today ? "red" : "green";
                    })(),
                    fontWeight: "bold",
                  }}
                >
                  {(() => {
                    if (!c.leaseEnd) return "-";
                    const today = new Date();
                    const end = new Date(c.leaseEnd);
                    return end < today ? "종료" : "진행";
                  })()}
                </td>

                <td style={tdStyle}>{getDDay(c.leaseEnd)}</td>
                <td style={tdStyle}>{c.customerStatus || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const thStyle = { padding: "12px 0", fontWeight: "bold" };
const tdStyle = { padding: "10px 0" };

export default Customers;
