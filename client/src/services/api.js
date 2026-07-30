import axios from "axios";

const API = axios.create({
  // Use Vite's local proxy by default, or an explicitly configured API in production.
  baseURL: import.meta.env.VITE_API_URL || "/api",
});

// Add JWT Token Automatically
API.interceptors.request.use(
  (config) => {
    let userInfo;

    try {
      userInfo = JSON.parse(localStorage.getItem("userInfo"));
    } catch {
      // A stale/corrupt login must not prevent public API requests.
      localStorage.removeItem("userInfo");
    }

    if (userInfo?.token) {
      config.headers.Authorization = `Bearer ${userInfo.token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
