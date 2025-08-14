import axios from "axios";
import { baseurl } from "@/Boot/config.json";
const axiosInstance = axios.create({
  baseURL: baseurl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add interceptors for token authorization or error logging
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // or from Redux/store if you're using one
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
