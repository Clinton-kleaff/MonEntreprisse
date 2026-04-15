import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Mail, Send, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";

export default function ForgotPassword() {
  const { forgotPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError("Email valide requis");
      return;
    }
    setError("");
    setLoading(true);
    await forgotPassword(email);
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <>
      <Helmet>
        <title>Mot de passe oublié | WaGradeTech</title>
      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">Mot de passe oublié ?</h2>
            <p className="text-gray-600 mt-2">
              Saisissez votre email, nous vous enverrons un lien de réinitialisation.
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Mail size={16} className="inline mr-1 text-[#d81b60]" /> Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:border-[#d81b60] focus:ring-2 focus:ring-[#d81b60]/20 outline-none transition"
                  placeholder="votre@email.com"
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#d81b60] hover:bg-[#c2185b] text-white font-bold py-3 rounded-xl transition shadow-md flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? <Loader /> : <><Send size={18} /> Envoyer</>}
              </button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="bg-green-50 text-green-700 p-4 rounded-xl">
                Un email de réinitialisation a été envoyé à <strong>{email}</strong>.
              </div>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-[#d81b60] hover:underline"
              >
                <ArrowLeft size={16} /> Retour à la connexion
              </Link>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm text-gray-500 hover:text-[#d81b60]">
              ← Retour à la connexion
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}