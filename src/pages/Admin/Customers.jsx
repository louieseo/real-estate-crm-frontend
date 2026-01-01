import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// 고객등록폼에서 고객 등록하기위해 추가
import { useContext } from "react";
import { CustomerContext } from "../../context/CustomerContext";

const Customers = () => {
  // ⬇⬇ 여기 추가!
  const navigate = useNavigate();

  // useState 추가 (필터 상태 관리)
  const [filterType, setFilterType] = useState("all");

  // 필터적용용 함수 추가
  const getFilteredCustomers = () => {
    const today = new Date();

    return customers.filter((c) => {
      const leaseEnd = new Date(c.leaseEnd);

      // 전체 보기
      if (filterType === "all") return true;

      // 계약이 진행중인 고객 (종료일이 아직 안 지난 고객)
      if (filterType === "progress") {
        if (!c.leaseEnd) return true; // 종료일 없으면 진행중으로 간주
        return new Date(c.leaseEnd) >= today;
      }

      // 이번 달 종료 필터
      if (filterType === "thisMonth") {
        return (
          leaseEnd.getFullYear() === today.getFullYear() &&
          leaseEnd.getMonth() === today.getMonth()
        );
      }

      // 60일 이내 종료
      if (filterType === "60days") {
        const diff = leaseEnd - today;
        const days = diff / (1000 * 60 * 60 * 24);
        return days >= 0 && days <= 60;
      }

      // 이미 종료된 고객
      if (filterType === "expired") {
        return leaseEnd < today;
      }

      return true;
    });
  };

  // 더미로 사용하던 데이터 없애고 고객 등록 폼으로 Customers 리스트에 업데이트 되게 함.
  const { customers } = useContext(CustomerContext);

  return (
    <div>
      <h1>Customers</h1>
      <p style={{ color: "gray" }}>등록된 고객 리스트</p>

      {/* ⬇⬇ 여기 추가! 고객등록 버튼 */}
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

      {/* 기존 필터 버튼들 */}
      <button onClick={() => setFilterType("all")}>전체보기</button>
      <button
        onClick={() => setFilterType("progress")}
        style={{ marginLeft: "10px" }}
      >
        진행중
      </button>

      <button
        onClick={() => setFilterType("thisMonth")}
        style={{ marginLeft: "10px" }}
      >
        이번 달 종료
      </button>
      <button
        onClick={() => setFilterType("60days")}
        style={{ marginLeft: "10px" }}
      >
        60일 이내 종료
      </button>
      <button
        onClick={() => setFilterType("expired")}
        style={{ marginLeft: "10px" }}
      >
        이미 종료됨
      </button>

      {/* 테이블 상자 */}
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
              <th style={thStyle}>구분</th>
              <th style={thStyle}>이름</th>
              <th style={thStyle}>이메일</th>
              <th style={thStyle}>핸드폰</th>
              <th style={thStyle}>계약일</th>
              <th style={thStyle}>시작일</th>
              <th style={thStyle}>종료일</th>
              <th style={thStyle}>계약종류</th>
              <th style={thStyle}>계약상태</th>
              <th style={thStyle}>디로스</th>
            </tr>
          </thead>

          <tbody>
            {getFilteredCustomers().map((c) => (
              <tr key={c.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={tdStyle}>{c.id}</td>
                <td style={tdStyle}>{c.name}</td>
                <td style={tdStyle}>{c.email}</td>
                <td style={tdStyle}>{c.phone}</td>
                <td style={tdStyle}>{c.contractDate}</td>
                <td style={tdStyle}>{c.leaseStart}</td>
                <td style={tdStyle}>{c.leaseEnd}</td>
                <td style={tdStyle}>{c.contractType}</td>
                <td style={tdStyle}>
                  {(() => {
                    if (!c.leaseEnd) return "진행";

                    const today = new Date();
                    const end = new Date(c.leaseEnd);

                    return end < today ? "종료" : "진행";
                  })()}
                </td>
                <td style={tdStyle}>{c.derosDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const thStyle = {
  padding: "12px 0",
  fontWeight: "bold",
};

const tdStyle = {
  padding: "10px 0",
};

export default Customers;
