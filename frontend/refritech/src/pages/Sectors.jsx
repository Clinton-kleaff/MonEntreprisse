import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Search, X } from "lucide-react";
import { sectors } from "../data/sectors";
import { useState, useMemo } from "react";

export default function Sectors() {
  const [query, setQuery] = useState("");

  const filteredSectors = useMemo(() => {
    if (!query.trim()) return sectors;
    const q = query.toLowerCase();
    return sectors.filter(
      (sector) =>
        sector.name.toLowerCase().includes(q) ||
        sector.shortDescription.toLowerCase().includes(q) ||
        sector.benefits.some((b) => b.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Des solutions pour votre{" "}
            <span className="text-[#d81b60]">secteur d'activité</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez comment nos services (IA, web, automatisation…) transforment concrètement votre quotidien professionnel.
          </p>
        </motion.div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-xl mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Recherchez un secteur (ex: santé, e-commerce, église, sécurité...)"
              className="w-full pl-12 pr-12 py-3.5 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-[#d81b60] focus:border-transparent outline-none transition text-gray-700 placeholder-gray-400"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            )}
          </div>
          {query && (
            <p className="text-sm text-gray-500 mt-2 text-center">
              {filteredSectors.length} secteur{filteredSectors.length > 1 ? "s" : ""} trouvé{filteredSectors.length > 1 ? "s" : ""}
            </p>
          )}
        </motion.div>

        {/* Sector grid */}
        {filteredSectors.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 text-gray-500"
          >
            <p className="text-xl font-medium">Aucun secteur ne correspond à votre recherche.</p>
            <p className="mt-2">Essayez avec d’autres mots-clés (ex: restauration, transport, politique…)</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSectors.map((sector, index) => {
              const Icon = sector.icon;
              return (
                <motion.div
                  key={sector.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  whileHover={{ y: -6 }}
                >
                  <Link
                    to={`/sectors/${sector.slug}`}
                    className="group block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    {/* Image */}
                    <div className="h-44 overflow-hidden">
                      <img
                        src={sector.image}
                        alt={sector.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-[#d81b60]/10">
                          <Icon className="w-5 h-5 text-[#d81b60]" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">{sector.name}</h3>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-3">{sector.shortDescription}</p>
                      <span className="inline-flex items-center mt-3 text-[#d81b60] font-medium text-sm group-hover:underline">
                        En savoir plus <ArrowRight size={16} className="ml-1" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}