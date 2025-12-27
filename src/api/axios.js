import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
});

// 앞으로 JWT 자동 포함하도록 준비!
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
