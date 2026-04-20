// src/pages/ServiceDetail.jsx
import { useParams, Link, useNavigate } from "react-router-dom";
import { services } from "../data/services";
import { Helmet } from "react-helmet-async";
import { CheckCircle, ArrowLeft, ShoppingCart, Calendar, Clock, Lock, Users, Zap, Video as VideoIcon } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useState } from "react";
import MediaGalleryModal from "../components/MediaGalleryModal";

// Helper to get Cloudinary video thumbnail (first frame)
const getVideoThumbnail = (videoUrl) => {
  if (!videoUrl || !videoUrl.includes('cloudinary.com')) return videoUrl;
  return videoUrl.replace('/upload/', '/upload/so_0,f_jpg,w_120,h_120,c_fill/');
};

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = services.find((s) => s.id === id);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  if (!service) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900">Service non trouvé</h2>
        <button onClick={() => navigate("/services")} className="text-[#d81b60] mt-4 inline-block">
          ← Retour aux services
        </button>
      </div>
    );
  }

  const handleOrder = () => {
    navigate("/order", { state: { service: { id: service.id, title: service.title } } });
    toast.success(`Service "${service.title}" présélectionné !`, {
      duration: 3000,
      icon: "🎯",
    });
  };

  const firstVideo = service.videos && service.videos[0];
  const videoThumbnail = firstVideo ? getVideoThumbnail(firstVideo) : null;

  return (
    <>
      <Helmet>
        <title>{service.title} | Solutions Digitales Modernes</title>
        <meta name="description" content={service.fullDescription} />
      </Helmet>

      <div className="bg-gray-50 min-h-screen py-12 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <Link
            to="/services"
            className="inline-flex items-center text-gray-600 hover:text-[#d81b60] mb-8 transition-colors"
          >
            <ArrowLeft size={18} className="mr-1" /> Tous les services
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-6 md:p-10">
              <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 flex-wrap mb-2">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{service.title}</h1>
                    {/* Video thumbnail preview */}
                    {videoThumbnail && (
                      <div
                        onClick={() => setIsGalleryOpen(true)}
                        className="w-16 h-16 rounded-lg overflow-hidden shadow-md cursor-pointer hover:ring-2 hover:ring-[#d81b60] transition-all flex-shrink-0"
                      >
                        <img
                          src={videoThumbnail}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 max-sm:whitespace-nowrap">
                    <Clock size={14} /> Livraison rapide
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <Users size={14} /> +1200 projets réalisés
                  </div>
                </div>
                <p className="text-2xl md:text-3xl font-bold text-[#d81b60]">{service.price}</p>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed mb-8">{service.fullDescription}</p>

              {/* Features list */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Zap size={20} className="text-[#d81b60]" /> Ce qui est inclus
                </h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle size={18} className="text-green-500 flex-shrink-0" /> {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleOrder}
                  className="inline-flex items-center gap-2 bg-[#d81b60] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#c2185b] transition shadow-md"
                >
                  <ShoppingCart size={18} /> Commander ce service
                </button>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:border-[#d81b60] hover:text-[#d81b60] transition"
                >
                  <Calendar size={18} /> Demander un rendez-vous
                </Link>
                {/* Voir vidéos button */}
                {service.videos && service.videos.length > 0 && (
                  <button
                    onClick={() => setIsGalleryOpen(true)}
                    className="inline-flex items-center gap-2 border-2 border-[#d81b60] text-[#d81b60] px-8 py-3 rounded-xl font-semibold hover:bg-[#d81b60] hover:text-white transition"
                  >
                    <VideoIcon size={18} /> Voir les vidéos
                  </button>
                )}
              </div>

              {/* Additional trust badge */}
              <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm text-gray-400">
                <Lock size={16} className="inline mr-1 mb-1 text-[#d81b60]" /> Paiement sécurisé • Support 24/7 • Sans engagement
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Media Gallery Modal */}
      <MediaGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        videos={service.videos || []}
        title={service.title}
      />
    </>
  );
}