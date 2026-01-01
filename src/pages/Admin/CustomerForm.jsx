import React, { useState, useContext } from "react";
import { CustomerContext } from "../../context/CustomerContext";
import { useNavigate } from "react-router-dom";

const CustomerForm = () => {
  const { addCustomer } = useContext(CustomerContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    rank: "",
    unit: "",
    derosDate: "",
    contractDate: "",
    leaseStart: "",
    leaseEnd: "",
    contractType: "",
    customerStatus: "",
    memo: "",
    photo: null,
  });

  // 입력 변경 처리
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "photo") {
      setForm({ ...form, photo: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // 저장 버튼 클릭 시 동작
  const handleSubmit = (e) => {
    e.preventDefault();

    const newCustomer = {
      id: Date.now(),
      ...form,
      contractStatus: "진행중", // 리스트에 표시용
    };

    addCustomer(newCustomer);

    alert("고객 등록 완료!");
    navigate("/admin/customers");
  };

  return (
    <div>
      <h1>고객 기본정보 등록</h1>
      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        
        <div>
          <label>이름</label><br />
          <input name="name" value={form.name} onChange={handleChange} required />
        </div>

        <div>
          <label>사진 업로드</label><br />
          <input type="file" name="photo" accept="image/*" onChange={handleChange} />
        </div>

        <div>
          <label>Email</label><br />
          <input name="email" value={form.email} onChange={handleChange} />
        </div>

        <div>
          <label>핸드폰</label><br />
          <input name="phone" value={form.phone} onChange={handleChange} />
        </div>

        <div>
          <label>계급</label><br />
          <input name="rank" value={form.rank} onChange={handleChange} />
        </div>

        <div>
          <label>소속</label><br />
          <input name="unit" value={form.unit} onChange={handleChange} />
        </div>

        <div>
          <label>DEROS 날짜</label><br />
          <input type="date" name="derosDate" value={form.derosDate} onChange={handleChange} />
        </div>

        <div>
          <label>계약일</label><br />
          <input type="date" name="contractDate" value={form.contractDate} onChange={handleChange} />
        </div>

        <div>
          <label>리스 시작일</label><br />
          <input type="date" name="leaseStart" value={form.leaseStart} onChange={handleChange} />
        </div>

        <div>
          <label>리스 종료일</label><br />
          <input type="date" name="leaseEnd" value={form.leaseEnd} onChange={handleChange} />
        </div>

        <div>
          <label>계약 종류</label><br />
          <select name="contractType" value={form.contractType} onChange={handleChange}>
            <option value="">선택</option>
            <option value="신규">신규</option>
            <option value="재계약">재계약</option>
            <option value="3회차">3회차</option>
            <option value="4회차">4회차</option>
            <option value="5회차">5회차</option>
          </select>
        </div>

        <div>
          <label>고객 상태</label><br />
          <select name="customerStatus" value={form.customerStatus} onChange={handleChange}>
            <option value="">선택</option>
            <option value="가망고객">가망고객</option>
            <option value="고객">고객</option>
            <option value="계약종료">계약종료</option>
          </select>
        </div>

        <div>
          <label>상담내용</label><br />
          <textarea name="memo" value={form.memo} onChange={handleChange} rows="4" />
        </div>

        <button type="submit" style={{ marginTop: "20px" }}>
          저장하기
        </button>
      </form>
    </div>
  );
};

export default CustomerForm;
