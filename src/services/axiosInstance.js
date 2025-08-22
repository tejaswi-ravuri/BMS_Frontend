import axios from "axios";
import { baseurl } from "@/Boot/config.json";

const axiosInstance = axios.create({
  baseURL: baseurl,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Add token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Handle responses
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      // Optional: redirect to login
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
