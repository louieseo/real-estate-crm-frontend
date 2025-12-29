const Customers = () => {
  // 🔥 지금은 일단 더미 데이터 (나중에 백엔드 연동 예정)
  const customers = [
    { id: 1, name: "John Smith", email: "john@test.com", phone: "010-1111-2222" },
    { id: 2, name: "Emily Johnson", email: "emily@test.com", phone: "010-3333-4444" },
    { id: 3, name: "David Lee", email: "david@test.com", phone: "010-5555-6666" },
  ];

  return (
    <div>
      <h1>Customers</h1>
      <p style={{ color: "gray" }}>등록된 고객 리스트</p>

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
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Phone</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((c) => (
              <tr key={c.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={tdStyle}>{c.id}</td>
                <td style={tdStyle}>{c.name}</td>
                <td style={tdStyle}>{c.email}</td>
                <td style={tdStyle}>{c.phone}</td>
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
