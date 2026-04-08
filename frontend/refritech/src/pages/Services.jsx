import { useState } from "react";
import { services } from "../data/services";
import ServiceCard from "../components/ServiceCard";
import { Helmet } from "react-helmet-async";
import { Search, Layers, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function Services() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      toast("Affichage de tous les services", { icon: "🔍" });
    }
  };

  return (
    <>
      <Helmet>
        <title>Nos Services | Solutions Digitales Modernes</title>
        <meta name="description" content="Découvrez nos services digitaux : landing pages, applications web, IA, chatbots, automatisation et SEO." />
      </Helmet>

      {/* Hero section */}
      <section className="bg-gradient-to-br from-gray-50 to-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-[#d81b60]/10 rounded-full px-4 py-1.5 mb-6">
              <Sparkles size={16} className="text-[#d81b60]" />
              <span className="text-sm font-medium text-[#d81b60]">Solutions innovantes</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Nos <span className="text-[#d81b60]">Services Digitaux</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Des solutions sur mesure pour accélérer votre transformation digitale. 
              Développement web, intelligence artificielle, automatisation et plus encore.
            </p>

            {/* Search bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher un service..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#d81b60] focus:ring-2 focus:ring-[#d81b60]/20 outline-none transition"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {filteredServices.length === 0 ? (
          <div className="text-center py-12">
            <Layers className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Aucun service ne correspond à votre recherche.</p>
            <button
              onClick={() => setSearchTerm("")}
              className="mt-4 text-[#d81b60] hover:underline"
            >
              Réinitialiser la recherche
            </button>
          </div>
        ) : (
          // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          //   {filteredServices.map((service) => (
          //     <ServiceCard key={service.id} service={service} />
          //   ))}
          // </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}

        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-[#d81b60]/5 to-[#d81b60]/10 rounded-2xl p-8 text-center border border-[#d81b60]/20"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Vous avez un projet spécifique ?</h3>
          <p className="text-gray-600 mb-6">Contactez-nous pour une solution entièrement personnalisée.</p>
          <a
            href="/contact"
            className="inline-flex items-center bg-[#d81b60] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#c2185b] transition shadow-lg shadow-[#d81b60]/30"
          >
            Discuter de votre projet
          </a>
        </motion.div>
      </div>
    </>
  );
}