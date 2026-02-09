import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL:"https://personal-task-management-system-server.onrender.com",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
