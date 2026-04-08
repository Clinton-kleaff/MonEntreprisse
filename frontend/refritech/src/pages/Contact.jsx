import { useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Mail, Send, MapPin, Phone, Clock, CheckCircle } from "lucide-react";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { submitContact } from "../utils/api";
import Loader from "../components/Loader";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", message: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email requis";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email invalide";
    if (!formData.message.trim()) newErrors.message = "Message requis";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Veuillez remplir tous les champs");
      return;
    }
    setLoading(true);
    try {
      await submitContact(formData);
      toast.success("Message envoyé ! Nous vous répondrons rapidement.");
      setFormData({ email: "", message: "" });
    } catch (error) {
      toast.error("Erreur, réessayez plus tard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact | Solutions Digitales Modernes</title>
        <meta name="description" content="Contactez notre équipe pour tout projet, devis ou support. Disponibles 7j/7." />
      </Helmet>

      <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Contactez-<span className="text-[#d81b60]">nous</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Une question ? Un projet ? Écrivez-nous, nous vous répondons sous 24h.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Mail className="text-[#d81b60]" size={24} /> Envoyez-nous un message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full p-3 border ${errors.email ? "border-red-500" : "border-gray-200"} rounded-xl focus:border-[#d81b60] focus:ring-2 focus:ring-[#d81b60]/20 outline-none transition`}
                    placeholder="votre@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full p-3 border ${errors.message ? "border-red-500" : "border-gray-200"} rounded-xl focus:border-[#d81b60] focus:ring-2 focus:ring-[#d81b60]/20 outline-none transition resize-none`}
                    placeholder="Décrivez votre demande..."
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#d81b60] hover:bg-[#c2185b] text-white font-bold py-3 rounded-xl transition shadow-lg shadow-[#d81b60]/30 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loading ? <Loader /> : <><Send size={18} /> Envoyer</>}
                </button>
              </form>
              <div className="mt-6 text-center text-xs text-gray-400 flex justify-center gap-4">
                <span><CheckCircle size={12} className="inline text-green-500" /> Réponse garantie</span>
                <span><CheckCircle size={12} className="inline text-green-500" /> Données confidentielles</span>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <MapPin size={20} className="text-[#d81b60]" /> Nos coordonnées
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-gray-400 mt-1" />
                    <span className="text-gray-600">Haiti, Port-au-Prince, Delmas 33</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-gray-400" />
                    <a href="tel:+50912345678" className="text-gray-600 hover:text-[#d81b60]">+509 1234 5678</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-gray-400" />
                    <a href="mailto:contact@monentreprise.ht" className="text-gray-600 hover:text-[#d81b60]">contact@monentreprise.ht</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={18} className="text-gray-400" />
                    <span className="text-gray-600">Lun - Ven : 9h - 19h | Sam : 10h - 16h</span>
                  </div>
                </div>
              </div>

              {/* Social links with FontAwesome icons */}
              <div className="bg-gradient-to-r from-[#d81b60]/5 to-[#d81b60]/10 rounded-2xl p-6 text-center">
                <h3 className="font-semibold text-gray-800 mb-4">Suivez-nous</h3>
                <div className="flex justify-center gap-6">
                  <a href="#" className="text-gray-500 hover:text-[#d81b60] transition">
                    <FaFacebook size={24} />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-[#d81b60] transition">
                    <FaTwitter size={24} />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-[#d81b60] transition">
                    <FaLinkedin size={24} />
                  </a>
                </div>
              </div>

              {/* Genuine interactive map */}
              <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100">
                <iframe
                  title="Carte de notre localisation"
                  src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Haiti+Port-au-Prince+Delmas+33"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                ></iframe>
                <div className="p-3 text-center text-xs text-gray-400 bg-white">
                  <MapPin size={12} className="inline mr-1" /> Haiti, Port-au-Prince, Delmas 33
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}