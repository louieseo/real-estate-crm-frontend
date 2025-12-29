const DashboardHome = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p style={{ color: "gray" }}>
        부동산 CRM 관리자 메인 페이지입니다.
      </p>

      {/* 🔥 통계 카드 영역 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {/* 에이전트 카드 */}
        <div style={cardStyle}>
          <h2 style={numberStyle}>12</h2>
          <p>등록된 Agents</p>
        </div>

        {/* 고객 카드 */}
        <div style={cardStyle}>
          <h2 style={numberStyle}>87</h2>
          <p>등록된 Customers</p>
        </div>

        {/* 매물 카드 */}
        <div style={cardStyle}>
          <h2 style={numberStyle}>142</h2>
          <p>등록된 Properties</p>
        </div>

        {/* 리드 카드 */}
        <div style={cardStyle}>
          <h2 style={numberStyle}>36</h2>
          <p>진행 중 Leads</p>
        </div>
      </div>
    </div>
  );
};

const cardStyle = {
  background: "white",
  borderRadius: "10px",
  padding: "20px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  textAlign: "center",
};

const numberStyle = {
  fontSize: "32px",
  marginBottom: "5px",
  color: "#4CAF50",
};

export default DashboardHome;
