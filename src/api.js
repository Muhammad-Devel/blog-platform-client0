import axios from "axios";

const API = axios.create({
  baseURL: "https://blog-platform-back0.onrender.com/api",
});

// Agar token bo'lsa headerga qo'shish
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.authorization = token;
  }
  return req;
});

export default API;
