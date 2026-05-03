// src/pages/ServiceDetail.jsx
import { useParams, Link, useNavigate } from "react-router-dom";
import { services } from "../data/services";
import { Helmet } from "react-helmet-async";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import {
  CheckCircle,
  ArrowLeft,
  ShoppingCart,
  Calendar,
  Clock,
  Lock,
  Users,
  Zap,
  Video as VideoIcon,
  Play,
  X,
  Layout,
  Globe,
  Brain,
  MessageSquare,
  TrendingUp,
  BarChart,
  Cpu,
  Palette,
  Send,
  Camera,
  Mail,
  CalendarDays,
  Film,
  CreditCard,
  Package,
} from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useState } from "react";
import MediaGalleryModal from "../components/MediaGalleryModal";

const iconMap = {
  Layout,
  Globe,
  Brain,
  MessageSquare,
  Zap,
  TrendingUp,
  BarChart,
  Cpu,
  Palette,
  Send,
  Camera,
  FaWhatsapp,
  FaInstagram,
  Mail,
  Calendar: CalendarDays,
  Film,
  CreditCard,
  Package,
};

const getVideoThumbnail = (videoUrl) => {
  if (!videoUrl || !videoUrl.includes("cloudinary.com")) return videoUrl;
  return videoUrl.replace("/upload/", "/upload/so_0,f_jpg,w_600,c_fill/");
};

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = services.find((s) => s.id === id);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isPlayingInline, setIsPlayingInline] = useState(false);

  if (!service) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900">Service non trouvé</h2>
        <button
          onClick={() => navigate("/services")}
          className="text-[#d81b60] mt-4 inline-block"
        >
          ← Retour aux services
        </button>
      </div>
    );
  }

  const handleOrder = () => {
    navigate("/order", {
      state: { service: { id: service.id, title: service.title } },
    });
    toast.success(`Service "${service.title}" présélectionné !`, {
      duration: 3000,
      icon: "🎯",
    });
  };

  const firstVideo = service.videos && service.videos[0];
  const videoThumbnail = firstVideo ? getVideoThumbnail(firstVideo) : null;
  const ServiceIcon = iconMap[service.icon] || Globe;

  return (
    <>
      <Helmet>
        <title>{service.title} | Solutions Digitales Modernes</title>
        <meta name="description" content={service.fullDescription} />
      </Helmet>

      <div className="bg-gray-50 min-h-screen py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/services"
            className="inline-flex items-center text-gray-600 hover:text-[#d81b60] mb-8 transition-colors"
          >
            <ArrowLeft size={18} className="mr-1" /> Tous les services
          </Link>

          <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16">
            {/* ===== LEFT COLUMN : Text & CTAs ===== */}
            <div className="flex-1 w-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-[#d81b60]/10">
                  <ServiceIcon className="w-7 h-7 text-[#d81b60]" />
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
                  {service.title}
                </h1>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                <Clock size={14} /> Livraison rapide
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <Users size={14} /> +1200 projets réalisés
              </div>

              <p className="text-lg text-gray-700 leading-relaxed mb-8 max-w-xl">
                {service.fullDescription}
              </p>

              <p className="text-3xl font-bold text-[#d81b60] mb-6">
                {service.price}
              </p>

              {/* CTA Buttons – equal width on small screens */}
              <div className="flex flex-wrap gap-4 mb-6">
                <button
                  onClick={handleOrder}
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-[#d81b60] text-white px-6 sm:px-8 py-3 rounded-xl font-semibold hover:bg-[#c2185b] transition shadow-md"
                >
                  <ShoppingCart size={18} /> Commander ce service
                </button>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto border-2 border-gray-300 text-gray-700 px-6 sm:px-8 py-3 rounded-xl font-semibold hover:border-[#d81b60] hover:text-[#d81b60] transition"
                >
                  <Calendar size={18} /> Demander un rendez-vous
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Lock size={14} className="text-[#d81b60]" /> Paiement sécurisé
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-300 hidden sm:inline-block" />
                <span className="flex items-center gap-1">✓ Support 24/7</span>
                <span className="w-1 h-1 rounded-full bg-gray-300 hidden sm:inline-block" />
                <span className="flex items-center gap-1">✓ Sans engagement</span>
              </div>
            </div>

            {/* ===== RIGHT COLUMN : Visual Card or Inline Video Player ===== */}
            {videoThumbnail && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="flex-1 relative w-full lg:mt-0 mt-10"
              >
                {/* Glow effects (hidden when video is playing) */}
                {!isPlayingInline && (
                  <>
                    <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#d81b60]/20 rounded-full blur-3xl -z-10"></div>
                    <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-purple-200/30 rounded-full blur-3xl -z-10"></div>
                  </>
                )}

                {/* Card or Inline Player */}
                {isPlayingInline ? (
                  // Inline video player – protected
                  <div
                    className="relative rounded-2xl overflow-hidden shadow-2xl"
                    onContextMenu={(e) => e.preventDefault()}
                    style={{ userSelect: "none", WebkitTouchCallout: "none" }}
                  >
                    <video
                      src={firstVideo}
                      controls
                      autoPlay
                      disablePictureInPicture
                      controlsList="nodownload nofullscreen"
                      className="w-full h-auto block"
                      style={{ maxHeight: "70vh" }}
                      onContextMenu={(e) => e.preventDefault()}
                    />
                    {/* Close button to return to card view */}
                    <button
                      onClick={() => setIsPlayingInline(false)}
                      className="absolute top-3 right-3 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition z-10"
                      aria-label="Fermer la vidéo"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ) : (
                  // Original card with thumbnail and play button
                  <div
                    onClick={() => setIsGalleryOpen(true)}
                    className="group relative bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 
                               shadow-xl shadow-[#d81b60]/10
                               before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:p-[2px] before:bg-gradient-to-br before:from-[#d81b60]/30 before:to-purple-400/30
                               hover:shadow-2xl hover:shadow-[#d81b60]/20 hover:scale-[1.02]"
                    style={{ borderRadius: '1rem' }}
                  >
                    {/* Fake browser top bar */}
                    <div className="flex items-center gap-2 p-4 pb-2 bg-gray-50/80">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>

                    <img
                      src={videoThumbnail}
                      alt={service.title}
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />

                    {/* Play button overlay – triggers inline play */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();          // don't open gallery modal
                        setIsPlayingInline(true);
                      }}
                      className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                        <Play size={28} className="text-[#d81b60] ml-1" />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* Features list */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-white rounded-2xl shadow-lg p-6 md:p-10"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Zap size={22} className="text-[#d81b60]" /> Ce qui est inclus
            </h2>
            <ul className="grid sm:grid-cols-2 gap-4">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-gray-700 text-lg">
                  <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="mt-8 text-center text-sm text-gray-400">
            <Lock size={14} className="inline mr-1 text-[#d81b60]" /> Paiement sécurisé •
            Support 24/7 • Sans engagement
          </div>
        </div>
      </div>

      {/* Media Gallery Modal (already protected via MediaGalleryModal) */}
      <MediaGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        videos={service.videos || []}
        title={service.title}
      />
    </>
  );
}