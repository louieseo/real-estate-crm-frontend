import { useParams } from "react-router-dom";
import { useCustomerContext } from "../../context/CustomerContext";
import { useEffect, useState } from "react";

export default function CustomerDetail() {
  const { id } = useParams();
  const { customers } = useCustomerContext();

  const [customer, setCustomer] = useState(null);

  // 사진 상태
  const [photo, setPhoto] = useState(null);

  // Edit Mode 상태
  const [isEdit, setIsEdit] = useState(false);

  // 수정용 폼 상태
  const [form, setForm] = useState({});

  // 이슈 목록 상태
  const [issues, setIssues] = useState([]);

  // 신규 이슈 입력 상태
  const [newIssue, setNewIssue] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (customers && customers.length > 0) {
      const found = customers.find((c) => String(c.id) === String(id));
      setCustomer(found || null);
      setForm(found || {});
    }
  }, [customers, id]);

  if (!customers || customers.length === 0) {
    return <h2>고객 데이터를 불러오는 중입니다...</h2>;
  }

  if (!customer) {
    return <h2>❌ 해당 고객 정보를 찾을 수 없습니다.</h2>;
  }

  // 사진 업로드
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhoto(URL.createObjectURL(file));
  };

  // 입력 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 저장(지금은 화면 상태만 업데이트)
  const handleSave = () => {
    setCustomer(form);
    setIsEdit(false);
    alert("고객 정보가 업데이트되었습니다. (현재는 화면상 저장)");
  };

  // 이슈 등록
  const addIssue = () => {
    if (!newIssue.title.trim()) {
      alert("이슈 제목을 입력하세요.");
      return;
    }

    const newItem = {
      id: Date.now(),
      title: newIssue.title,
      description: newIssue.description,
      status: "진행중",
      createdAt: new Date().toLocaleString(),
    };

    setIssues((prev) => [newItem, ...prev]);
    setNewIssue({ title: "", description: "" });
  };

  // 이슈 상태 변경
  const changeStatus = (id, status) => {
    setIssues((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, status } : i
      )
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>고객 상세페이지</h1>

      {/* 메인 카드 */}
      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          background: "#fafafa",
        }}
      >
        {/* 상단 영역 */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div>
            <h2 style={{ marginBottom: "10px" }}>{customer.name}</h2>

            {/* 사진 */}
            <img
              src={photo || "https://via.placeholder.com/120x150?text=Photo"}
              alt="customer"
              style={{
                width: "120px",
                height: "150px",
                objectFit: "cover",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />

            <div style={{ marginTop: "10px" }}>
              <input type="file" accept="image/*" onChange={handlePhotoChange} />
            </div>
          </div>

          {/* Edit 버튼 */}
          <div style={{ marginLeft: "auto" }}>
            {!isEdit && (
              <button
                onClick={() => setIsEdit(true)}
                style={{
                  padding: "8px 14px",
                  borderRadius: "6px",
                  border: "none",
                  background: "#007bff",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                정보 수정
              </button>
            )}

            {isEdit && (
              <button
                onClick={handleSave}
                style={{
                  padding: "8px 14px",
                  borderRadius: "6px",
                  border: "none",
                  background: "green",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                저장
              </button>
            )}
          </div>
        </div>

        {/* 개인정보 영역 */}
        <hr style={{ margin: "25px 0" }} />
        <h3>📌 개인정보</h3>

        {!isEdit ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "12px",
            }}
          >
            <p><strong>계급 / 직업:</strong> {customer.rank || "-"}</p>
            <p><strong>소속:</strong> {customer.unit || "-"}</p>
            <p><strong>연락처:</strong> {customer.phone || "-"}</p>
            <p><strong>이메일:</strong> {customer.email || "-"}</p>
            <p><strong>DEROS 날짜:</strong> {customer.derosDate || "-"}</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "10px" }}>
            <input name="rank" value={form.rank || ""} onChange={handleChange} placeholder="계급/직업" />
            <input name="unit" value={form.unit || ""} onChange={handleChange} placeholder="소속" />
            <input name="phone" value={form.phone || ""} onChange={handleChange} placeholder="연락처" />
            <input name="email" value={form.email || ""} onChange={handleChange} placeholder="이메일" />
            <input name="derosDate" value={form.derosDate || ""} onChange={handleChange} placeholder="DEROS 날짜" />
          </div>
        )}

        {/* 계약 정보 */}
        <hr style={{ margin: "25px 0" }} />
        <h3>📄 계약 정보</h3>

        {!isEdit ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "12px",
            }}
          >
            <p><strong>계약 종류:</strong> {customer.contractType || "-"}</p>
            <p><strong>계약일:</strong> {customer.contractDate || "-"}</p>
            <p><strong>계약 시작:</strong> {customer.leaseStart || "-"}</p>
            <p><strong>계약 종료:</strong> {customer.leaseEnd || "-"}</p>
            <p style={{ gridColumn: "span 2" }}>
              <strong>주소:</strong> {customer.address || "-"}
            </p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "10px" }}>
            <input name="contractType" value={form.contractType || ""} onChange={handleChange} placeholder="계약 종류" />
            <input name="contractDate" value={form.contractDate || ""} onChange={handleChange} placeholder="계약일" />
            <input name="leaseStart" value={form.leaseStart || ""} onChange={handleChange} placeholder="계약 시작" />
            <input name="leaseEnd" value={form.leaseEnd || ""} onChange={handleChange} placeholder="계약 종료" />
            <input
              style={{ gridColumn: "span 2" }}
              name="address"
              value={form.address || ""}
              onChange={handleChange}
              placeholder="주소"
            />
          </div>
        )}
      </div>

      {/* =========================
          이슈 / 요청사항 섹션
      ========================== */}
      <div
        style={{
          marginTop: "25px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          background: "white",
        }}
      >
        <h2>📝 이슈 / 요청사항 관리</h2>

        {/* 입력 */}
        <div style={{ marginTop: "10px" }}>
          <input
            placeholder="이슈 제목"
            value={newIssue.title}
            onChange={(e) => setNewIssue({ ...newIssue, title: e.target.value })}
            style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
          />

          <textarea
            placeholder="상세 내용"
            value={newIssue.description}
            onChange={(e) => setNewIssue({ ...newIssue, description: e.target.value })}
            style={{ width: "100%", padding: "8px", height: "80px" }}
          />

          <button
            onClick={addIssue}
            style={{
              marginTop: "8px",
              padding: "8px 14px",
              borderRadius: "6px",
              border: "none",
              background: "#28a745",
              color: "white",
              cursor: "pointer",
            }}
          >
            이슈 등록
          </button>
        </div>

        {/* 목록 */}
        <div style={{ marginTop: "20px" }}>
          {issues.length === 0 && <p>등록된 이슈가 없습니다.</p>}

          {issues.map((i) => (
            <div
              key={i.id}
              style={{
                border: "1px solid #ccc",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "10px",
              }}
            >
              <h3>{i.title}</h3>
              <p>{i.description}</p>
              <p>
                <strong>등록일:</strong> {i.createdAt}
              </p>

              <p>
                <strong>상태:</strong>{" "}
                <span
                  style={{
                    color: i.status === "완료" ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {i.status}
                </span>
              </p>

              <button onClick={() => changeStatus(i.id, "진행중")}>진행중</button>
              <button onClick={() => changeStatus(i.id, "완료")} style={{ marginLeft: "8px" }}>
                완료
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
