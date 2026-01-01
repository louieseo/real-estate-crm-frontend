import { createContext, useState } from "react";

export const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);

  // 고객 추가 함수
  const addCustomer = (customer) => {
    setCustomers((prev) => [
      ...prev,
      {
        ...customer,
        id: prev.length + 1,
        
      },
    ]);
  };

  return (
    <CustomerContext.Provider value={{ customers, addCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
};
