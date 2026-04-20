// src/components/MediaGalleryModal.jsx
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MediaGalleryModal({ isOpen, onClose, videos, title }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">
                {title || "Galerie vidéo"}
              </h3>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar" style={{ maxHeight: "calc(90vh - 80px)" }}>
              {videos && videos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {videos.map((video, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow"
                    >
                      <video
                        src={video}
                        autoPlay
                        loop                      
                        playsInline
                        controls={false}
                        className="w-full h-auto max-h-[400px] object-contain bg-black/5 rounded-xl"
                      />
                      {/* Optional overlay with play icon on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <p>Aucune vidéo disponible pour ce service</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}