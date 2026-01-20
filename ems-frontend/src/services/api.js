import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

// ===================== REQUEST INTERCEPTOR =====================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ===================== RESPONSE INTERCEPTOR =====================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;

      // 🔐 Unauthorized → logout
      if (status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }

      // ⛔ Forbidden → access denied
      if (status === 403) {
        alert("Access denied");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
