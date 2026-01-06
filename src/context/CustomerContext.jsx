import { createContext, useContext, useState } from "react";

export const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
  const [loading, setLoading] = useState(false);

  // 🔐 로그인 후 토큰 저장
  const saveToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("adminToken", newToken);
  };

  // 📥 고객 목록 불러오기
  const fetchCustomers = async () => {
    if (!token) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/admin/customers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setCustomers(data.customers || []);
      } else {
        console.log("고객 불러오기 실패", data);
      }
    } catch (err) {
      console.error("고객 불러오기 에러", err);
    }

    setLoading(false);
  };

  // 📌 고객 상세
  const getCustomerById = async (id) => {
    const res = await fetch(`http://localhost:4000/admin/customers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await res.json();
  };

  // ➕ 고객 생성
  const createCustomer = async (customerData) => {
    const res = await fetch("http://localhost:4000/admin/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(customerData),
    });

    const data = await res.json();
    await fetchCustomers();
    return data;
  };

  // ✏️ 고객 수정
  const updateCustomer = async (id, customerData) => {
    const res = await fetch(`http://localhost:4000/admin/customers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(customerData),
    });

    const data = await res.json();
    await fetchCustomers();
    return data;
  };

  // ❌ 고객 삭제
  const deleteCustomer = async (id) => {
    await fetch(`http://localhost:4000/admin/customers/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    await fetchCustomers();
  };

  return (
    <CustomerContext.Provider
      value={{
        customers,
        fetchCustomers,
        getCustomerById,
        createCustomer,
        updateCustomer,
        deleteCustomer,
        saveToken,
        loading,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

// ⭐ 이게 반드시 필요!! (지금 오류의 핵심 원인)
export const useCustomerContext = () => useContext(CustomerContext);
