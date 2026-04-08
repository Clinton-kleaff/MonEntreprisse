import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { login as apiLogin, register as apiRegister, forgotPassword as apiForgotPassword, logout as apiLogout, getCurrentUser } from "../utils/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const result = await getCurrentUser();
        if (result.success) {
          setUser(result.user);
          // Also ensure localStorage user data is in sync
          localStorage.setItem("user", JSON.stringify(result.user));
        } else {
          // Token invalid or expired – clear storage
          localStorage.removeItem("authToken");
          localStorage.removeItem("user");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const result = await apiLogin(email, password);
      if (result.success) {
        setUser(result.user);
        toast.success("Connecté avec succès !");
        return true;
      } else {
        toast.error(result.message || "Échec de la connexion");
        return false;
      }
    } catch (error) {
      toast.error("Une erreur est survenue");
      return false;
    }
  };

  const register = async (name, email, password) => {
    try {
      const result = await apiRegister(name, email, password);
      if (result.success) {
        setUser(result.user);
        toast.success("Compte créé avec succès !");
        return true;
      } else {
        toast.error(result.message || "Échec de l'inscription");
        return false;
      }
    } catch (error) {
      toast.error("Une erreur est survenue");
      return false;
    }
  };

  const logout = () => {
    apiLogout(); // clears localStorage
    setUser(null);
    toast.success("Déconnecté");
  };

  const forgotPassword = async (email) => {
    try {
      const result = await apiForgotPassword(email);
      if (result.success) {
        toast.success(result.message || `Un lien de réinitialisation a été envoyé à ${email}`);
        return true;
      } else {
        toast.error(result.message || "Erreur lors de l'envoi");
        return false;
      }
    } catch (error) {
      toast.error("Une erreur est survenue");
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, forgotPassword }}>
      {children}
    </AuthContext.Provider>
  );
};