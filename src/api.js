import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5050/api",
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
