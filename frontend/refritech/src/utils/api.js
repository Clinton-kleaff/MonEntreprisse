import axios from "axios";

// Get API base URL from environment variables
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

// Request interceptor: attach auth token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized – clear token and redirect to login
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// -------------------- Authentication APIs --------------------
export const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    const { token, user } = response.data;
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(user));
    return { success: true, user };
  } catch (error) {
    const message = error.response?.data?.message || "Échec de la connexion";
    return { success: false, message };
  }
};

export const register = async (name, email, password) => {
  try {
    const response = await api.post("/auth/register", { name, email, password });
    const { token, user } = response.data;
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(user));
    return { success: true, user };
  } catch (error) {
    const message = error.response?.data?.message || "Échec de l'inscription";
    return { success: false, message };
  }
};

export const forgotPassword = async (email) => {
  try {
    await api.post("/auth/forgot-password", { email });
    return { success: true, message: "Email de réinitialisation envoyé" };
  } catch (error) {
    const message = error.response?.data?.message || "Erreur lors de l'envoi";
    return { success: false, message };
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    await api.post(`/auth/reset-password/${token}`, { password: newPassword });
    return { success: true, message: "Mot de passe mis à jour" };
  } catch (error) {
    const message = error.response?.data?.message || "Échec de la réinitialisation";
    return { success: false, message };
  }
};

export const logout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get("/auth/me");
    return { success: true, user: response.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Non authentifié" };
  }
};

// -------------------- Order API --------------------
export const submitOrder = async (orderData) => {
  try {
    const response = await api.post("/orders", orderData);
    return { success: true, message: response.data.message || "Demande envoyée avec succès !" };
  } catch (error) {
    const message = error.response?.data?.message || "Erreur lors de l'envoi de la commande";
    return { success: false, message };
  }
};

// -------------------- Contact API --------------------
export const submitContact = async (contactData) => {
  try {
    const response = await api.post("/contact", contactData);
    return { success: true, message: response.data.message || "Message envoyé ! Nous vous répondrons rapidement." };
  } catch (error) {
    const message = error.response?.data?.message || "Erreur lors de l'envoi du message";
    return { success: false, message };
  }
};

// -------------------- Newsletter API --------------------
export const submitNewsletter = async (email) => {
  try {
    const response = await api.post("/newsletter", { email });
    return { success: true, message: response.data.message || "Inscription réussie !" };
  } catch (error) {
    const message = error.response?.data?.message || "Erreur lors de l'inscription";
    return { success: false, message };
  }
};

export default api;