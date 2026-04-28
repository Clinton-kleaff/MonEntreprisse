import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { sectors } from "../data/sectors";

export default function Sectors() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Des solutions pour votre{" "}
            <span className="text-[#d81b60]">secteur d'activité</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez comment nos services (IA, web, automatisation…) transforment concrètement votre quotidien professionnel.
          </p>
        </motion.div>

        {/* Sector grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sectors.map((sector, index) => {
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
      </div>
    </div>
  );
}