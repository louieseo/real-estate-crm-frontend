import React from "react";
import { useParams } from "react-router-dom";

const CustomerDetail = () => {
  const { id } = useParams(); // URL에서 고객 ID 가져오기

  return (
    <div style={{ padding: "20px" }}>
      <h1>고객 상세 페이지</h1>
      <p>현재 선택된 고객 ID: {id}</p>

      <hr />

      <h2>여기에 고객 기본정보 표시 예정</h2>
      <p>다음 단계에서 실제 데이터 연결할거야 👍</p>

      <hr />

      <h2>여기에 고객 요청 / 이슈 관리 섹션 들어올거야</h2>
    </div>
  );
};

export default CustomerDetail;
