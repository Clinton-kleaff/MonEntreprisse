// src/components/ServiceCard.jsx
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Layout,
  Globe,
  Brain,
  MessageSquare,
  Zap,
  TrendingUp,
  X,
  Cpu,
  Palette,
  BarChart,
  Video as VideoIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import MediaGalleryModal from "./MediaGalleryModal";

// Map icon strings to Lucide components
const iconMap = {
  Layout,
  Globe,
  Brain,
  MessageSquare,
  Zap,
  TrendingUp,
  Cpu,
  Palette,
  BarChart,
};

// Helper to get Cloudinary video thumbnail (first frame)
const getVideoThumbnail = (videoUrl) => {
  if (!videoUrl || !videoUrl.includes('cloudinary.com')) return videoUrl;
  // Cloudinary transformation to get JPG from first frame
  return videoUrl.replace('/upload/', '/upload/so_0,f_jpg,w_120,h_120,c_fill/');
};

export default function ServiceCard({ service }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const IconComponent = iconMap[service.icon] || Layout;

  // Navigate to detail page when card is clicked
  const handleCardClick = () => {
    navigate(`/services/${service.id}`);
  };

  // Open quick view modal, prevent card navigation
  const handleQuickView = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  // Open media gallery, prevent card navigation
  const handleOpenGallery = (e) => {
    e.stopPropagation();
    setIsGalleryOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);
  const closeGallery = () => setIsGalleryOpen(false);

  // Get first video for thumbnail
  const firstVideo = service.videos && service.videos[0];
  const videoThumbnail = firstVideo ? getVideoThumbnail(firstVideo) : null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        whileHover={{ y: -8 }}
        onClick={handleCardClick}
        className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer relative"
      >
        {/* Badge at top center */}
        {(service.popular || service.badge) && (
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10">
            <span className="bg-[#d81b60] text-white text-[10px] sm:text-xs font-semibold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full shadow-md whitespace-nowrap">
              {service.popular ? "⭐ Populaire" : service.badge}
            </span>
          </div>
        )}

        <div className="p-6">
          {/* Icon and thumbnail row */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d81b60]/10 to-[#d81b60]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <IconComponent className="w-6 h-6 text-[#d81b60]" />
              </div>
            </div>

            {/* Video thumbnail preview */}
            {videoThumbnail && (
              <div
                onClick={handleOpenGallery}
                className="w-12 h-12 rounded-lg overflow-hidden shadow-md cursor-pointer hover:ring-2 hover:ring-[#d81b60] transition-all flex-shrink-0"
              >
                <img
                  src={videoThumbnail}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
          <p className="text-gray-500 text-sm mb-3">{service.description}</p>
          <p className="text-[#d81b60] font-bold text-lg mb-4">{service.price}</p>

          <div className="flex items-center justify-between gap-2 mt-2 flex-wrap">
            {/* Detail link – kept for accessibility, but click is handled by card */}
            <Link
              to={`/services/${service.id}`}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center text-gray-700 hover:text-[#d81b60] font-medium transition-colors text-sm"
            >
              Détails <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Voir vidéos button */}
            {service.videos && service.videos.length > 0 && (
              <button
                onClick={handleOpenGallery}
                className="inline-flex items-center gap-1 text-xs bg-gray-50 hover:bg-[#d81b60]/10 text-gray-600 hover:text-[#d81b60] px-3 py-1 rounded-full transition"
              >
                <VideoIcon size={12} /> Voir vidéos
              </button>
            )}
            
            <button
              onClick={handleQuickView}
              className="text-xs bg-gray-50 hover:bg-[#d81b60]/10 text-gray-600 hover:text-[#d81b60] px-3 py-1 rounded-full transition"
            >
              + Info rapide
            </button>
          </div>
        </div>
      </motion.div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden shadow-2xl"
            >
              {/* Header - fixed */}
              <div className="flex-shrink-0 p-6 pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d81b60]/10 to-[#d81b60]/20 flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-[#d81b60]" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">{service.title}</h2>
                  </div>
                  <button
                    onClick={closeModal}
                    className="p-1 rounded-full hover:bg-gray-100 transition"
                  >
                    <X size={20} className="text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Scrollable middle content */}
              <div className="flex-1 overflow-y-auto px-6 pt-4 custom-scrollbar">
                <p className="text-gray-600 mb-4">{service.fullDescription}</p>
                <div className="mb-4">
                  <span className="text-2xl font-bold text-[#d81b60]">{service.price}</span>
                </div>
                {service.features && (
                  <div className="border-t pt-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Fonctionnalités incluses</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="text-[#d81b60] mt-1">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Footer buttons - fixed, one line on mobile */}
              <div className="flex-shrink-0 p-6 pt-2">
                <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-nowrap sm:gap-3 sm:justify-end">
                  <button
                    onClick={() => {
                      closeModal();
                      setIsGalleryOpen(true);
                    }}
                    className="inline-flex items-center justify-center gap-2 border-2 border-[#d81b60] text-[#d81b60] px-3 py-2 rounded-full text-sm font-medium hover:bg-[#d81b60] hover:text-white transition sm:px-6 sm:w-auto"
                  >
                    <VideoIcon size={16} /> Voir les vidéos
                  </button>
                  <Link
                    to={`/services/${service.id}`}
                    onClick={closeModal}
                    className="bg-[#d81b60] text-white px-3 py-2 rounded-full text-sm font-medium hover:bg-[#ad1457] transition text-center sm:px-6 sm:w-auto"
                  >
                    Voir tous les détails
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Media Gallery Modal */}
      <MediaGalleryModal
        isOpen={isGalleryOpen}
        onClose={closeGallery}
        videos={service.videos || []}
        title={service.title}
      />
    </>
  );
}