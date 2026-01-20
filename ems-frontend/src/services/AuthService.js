import api from "./api";

const TOKEN_KEY = "token";

// ===== LOGIN =====
export const login = async (credentials) => {
  const response = await api.post("/api/auth/login", credentials);

  if (response.data?.token) {
    localStorage.setItem(TOKEN_KEY, response.data.token);
  }

  return response;
};

// ===== LOGOUT =====
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

// ===== TOKEN =====
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// ===== AUTH CHECK =====
export const isAuthenticated = () => {
  return !!getToken();
};

// ===== ROLE CHECK =====
export const isAdmin = () => {
  const token = getToken();
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role === "ROLE_ADMIN";
  } catch (e) {
    return false;
  }
};
