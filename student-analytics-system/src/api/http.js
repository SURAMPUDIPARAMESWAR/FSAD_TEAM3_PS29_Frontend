import axios from "axios";

export const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://fsad-team3-ps29-backend.onrender.com";

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") || "";

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const isUnauthorizedError = (error) => error?.response?.status === 401;