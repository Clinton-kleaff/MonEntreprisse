import { useState, useEffect, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Mail, Briefcase, MessageSquare, Send, CheckCircle, 
  ArrowRight, Clock, Shield, Headphones, FileText, ChevronDown,
  Layout, Globe, Brain, MessageSquare as ChatIcon, Zap, TrendingUp
} from "lucide-react";
import { services } from "../data/services";
import { submitOrder } from "../utils/api";
import Loader from "../components/Loader";

// Map service IDs to icons
const serviceIcons = {
  landing: Layout,
  web: Globe,
  ai: Brain,
  chatbot: ChatIcon,
  automation: Zap,
  seo: TrendingUp,
};

export default function Order() {
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [selectedService, setSelectedService] = useState(null);

  // Pre-select service if passed via navigation state (from ServiceDetail)
  useEffect(() => {
    const preselectedService = location.state?.service;
    if (preselectedService) {
      const found = services.find(s => s.id === preselectedService.id || s.title === preselectedService.title);
      if (found) {
        setFormData(prev => ({ ...prev, service: found.title }));
        setSelectedService(found);
      }
    }
  }, [location.state]);

  // Update selected service details when service changes
  useEffect(() => {
    const found = services.find(s => s.title === formData.service);
    setSelectedService(found);
  }, [formData.service]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const selectService = (serviceTitle) => {
    setFormData(prev => ({ ...prev, service: serviceTitle }));
    setDropdownOpen(false);
    if (errors.service) setErrors({ ...errors, service: "" });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Nom requis";
    if (!formData.email.trim()) newErrors.email = "Email requis";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email invalide";
    if (!formData.service) newErrors.service = "Veuillez sélectionner un service";
    if (!formData.message.trim()) newErrors.message = "Message requis (décrivez votre projet)";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Veuillez corriger les erreurs");
      return;
    }

    setLoading(true);
    try {
      await submitOrder(formData);
      toast.success("Demande envoyée avec succès ! Nous vous contacterons sous 24h.");
      navigate("/");
    } catch (error) {
      toast.error("Erreur lors de l'envoi. Réessayez plus tard.");
    } finally {
      setLoading(false);
    }
  };

  // Get icon for current selected service (for display)
  const SelectedIcon = selectedService && serviceIcons[selectedService.id] ? serviceIcons[selectedService.id] : Briefcase;

  return (
    <>
      <Helmet>
        <title>Commander un service | Solutions Digitales Modernes</title>
        <meta name="description" content="Demandez un devis ou commandez votre solution digitale : site web, application, IA, chatbot, automatisation." />
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
              Commencer votre <span className="text-[#d81b60]">projet</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Remplissez le formulaire ci-dessous. Nous vous répondrons sous 24h avec une proposition détaillée.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="p-6 md:p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <User size={16} className="inline mr-1 text-[#d81b60]" /> Nom complet
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full p-3 border ${errors.name ? "border-red-500" : "border-gray-200"} rounded-xl focus:border-[#d81b60] focus:ring-2 focus:ring-[#d81b60]/20 outline-none transition`}
                        placeholder="Jean Dupont"
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Mail size={16} className="inline mr-1 text-[#d81b60]" /> Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full p-3 border ${errors.email ? "border-red-500" : "border-gray-200"} rounded-xl focus:border-[#d81b60] focus:ring-2 focus:ring-[#d81b60]/20 outline-none transition`}
                        placeholder="jean@exemple.com"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    {/* Professional Custom Dropdown for Service */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Briefcase size={16} className="inline mr-1 text-[#d81b60]" /> Service souhaité
                      </label>
                      <div className="relative" ref={dropdownRef}>
                        <button
                          type="button"
                          onClick={() => setDropdownOpen(!dropdownOpen)}
                          className={`w-full p-3 border ${errors.service ? "border-red-500" : "border-gray-200"} rounded-xl bg-white flex items-center justify-between focus:border-[#d81b60] focus:ring-2 focus:ring-[#d81b60]/20 transition`}
                        >
                          <div className="flex items-center gap-2">
                            {formData.service ? (
                              <>
                                <SelectedIcon size={18} className="text-[#d81b60]" />
                                <span>{formData.service}</span>
                              </>
                            ) : (
                              <span className="text-gray-400">-- Sélectionnez un service --</span>
                            )}
                          </div>
                          <ChevronDown size={18} className={`text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                        </button>

                        <AnimatePresence>
                          {dropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto"
                            >
                              {services.map((service) => {
                                const Icon = serviceIcons[service.id] || Briefcase;
                                return (
                                  <button
                                    key={service.id}
                                    type="button"
                                    onClick={() => selectService(service.title)}
                                    className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 transition border-b border-gray-100 last:border-0"
                                  >
                                    <Icon size={18} className="text-[#d81b60]" />
                                    <div>
                                      <span className="font-medium text-gray-800">{service.title}</span>
                                      <span className="text-xs text-gray-400 ml-2">{service.price}</span>
                                      <p className="text-xs text-gray-500">{service.description}</p>
                                    </div>
                                  </button>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      {errors.service && <p className="text-red-500 text-sm mt-1">{errors.service}</p>}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <MessageSquare size={16} className="inline mr-1 text-[#d81b60]" /> Détails du projet
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className={`w-full p-3 border ${errors.message ? "border-red-500" : "border-gray-200"} rounded-xl focus:border-[#d81b60] focus:ring-2 focus:ring-[#d81b60]/20 outline-none transition resize-none`}
                        placeholder="Décrivez votre projet, vos objectifs, vos contraintes..."
                      />
                      {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#d81b60] hover:bg-[#c2185b] text-white font-bold py-3 rounded-xl transition shadow-lg shadow-[#d81b60]/30 flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {loading ? <Loader /> : <><Send size={18} /> Envoyer la demande</>}
                    </button>
                  </form>

                  {/* Trust badges */}
                  <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap justify-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><CheckCircle size={14} className="text-green-500" /> Réponse sous 24h</span>
                    <span className="flex items-center gap-1"><Shield size={14} /> Données sécurisées</span>
                    <span className="flex items-center gap-1"><Headphones size={14} /> Support prioritaire</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Info Column (unchanged) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Service preview card */}
              {selectedService && (
                <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-[#d81b60]">
                  <h3 className="font-bold text-gray-900 mb-2">{selectedService.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{selectedService.description}</p>
                  <p className="text-[#d81b60] font-bold text-lg">{selectedService.price}</p>
                  <Link
                    to={`/services/${selectedService.id}`}
                    className="inline-flex items-center text-sm text-gray-500 hover:text-[#d81b60] mt-2"
                  >
                    Voir détails <ArrowRight size={14} className="ml-1" />
                  </Link>
                </div>
              )}

              {/* Why choose us */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FileText size={18} className="text-[#d81b60]" /> Pourquoi nous choisir ?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle size={16} className="text-[#d81b60] mt-0.5 flex-shrink-0" />
                    <span>Devis gratuit et sans engagement</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle size={16} className="text-[#d81b60] mt-0.5 flex-shrink-0" />
                    <span>Livraison en moyenne 14 jours</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle size={16} className="text-[#d81b60] mt-0.5 flex-shrink-0" />
                    <span>Support technique 6 mois inclus</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle size={16} className="text-[#d81b60] mt-0.5 flex-shrink-0" />
                    <span>+1200 clients satisfaits</span>
                  </li>
                </ul>
              </div>

              {/* Contact alternative */}
              <div className="bg-[#d81b60]/5 rounded-2xl p-6 text-center">
                <Clock size={32} className="text-[#d81b60] mx-auto mb-2" />
                <p className="text-sm text-gray-700">Besoin d'une réponse rapide ?</p>
                <a href="tel:+50912345678" className="text-[#d81b60] font-semibold text-sm">+509 1234 5678</a>
                <p className="text-xs text-gray-400 mt-2">Ou écrivez-nous sur WhatsApp</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}