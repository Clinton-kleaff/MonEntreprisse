// src/pages/SectorDetail.jsx
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle,
  TrendingUp,
  Clock,
  Zap,
  DollarSign,
  Target,               
} from "lucide-react";
import { sectors } from "../data/sectors";
import { services } from "../data/services";
import ServiceCard from "../components/ServiceCard";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

export default function SectorDetail() {
  const { slug } = useParams();
  const sector = sectors.find((s) => s.slug === slug);

  // Empêche l’affichage double du toast (StrictMode)
  const toastShownRef = useRef(false);

  useEffect(() => {
    if (sector && !toastShownRef.current) {
      toast.success(`Découvrez nos solutions pour ${sector.name}`, {
        icon: <Target size={20} />,          
        style: { background: "#d81b60", color: "#fff", fontFamily: "ui-sans-serif", fontSize: "13px"  },
      });
      toastShownRef.current = true;
    }
  }, [sector]);

  if (!sector) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-xl">Secteur introuvable.</p>
      </div>
    );
  }

  const Icon = sector.icon;
  const recommendedServicesObj = services.filter((s) =>
    sector.recommendedServices.includes(s.id)
  );

  return (
    <>
      <Helmet>
        <title>{sector.name} – Solutions digitales | WaGradeTech</title>
        <meta name="description" content={sector.shortDescription} />
      </Helmet>

      <div className="bg-white min-h-screen">
        {/* ===== Hero‑like section ===== */}
          <section className="relative bg-[#f8f9fa] pt-4 pb-24 sm:pt-6 sm:pb-32 overflow-hidden">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-16">
              {/* Colonne gauche : texte */}
              <div className="flex-1 text-left z-10 w-full">
                <Link
                  to="/sectors"
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-[#d81b60] mb-4 transition"
                >
                  <ArrowLeft size={18} /> Tous les secteurs
                </Link>

                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-[#d81b60]/10">
                    <Icon className="w-7 h-7 text-[#d81b60]" />
                  </div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1e293b] leading-tight">
                    {sector.name}
                  </h1>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed mb-6 max-w-xl">
                  {sector.shortDescription}
                </p>

                <p className="text-gray-600 leading-relaxed mb-8 max-w-xl">
                  {sector.fullDescription}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {sector.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#d81b60] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400 mb-8">
                  <span className="flex items-center gap-1">
                    <DollarSign size={14} className="text-green-500" /> Revenus augmentés
                  </span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full hidden sm:inline-block" />
                  <span className="flex items-center gap-1">
                    <Clock size={14} className="text-blue-500" /> Temps libéré
                  </span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full hidden sm:inline-block" />
                  <span className="flex items-center gap-1">
                    <Zap size={14} className="text-yellow-500" /> Automatisation
                  </span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full hidden sm:inline-block" />
                  <span className="flex items-center gap-1">
                    <TrendingUp size={14} className="text-[#d81b60]" /> Croissance durable
                  </span>
                </div>

                <Link
                  to="/order"
                  className="inline-flex items-center gap-2 bg-[#d81b60] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#c2185b] transition shadow-md"
                >
                  Démarrer un projet
                </Link>
              </div>

              {/* Colonne droite : image avec bordure magenta */}
              {/* Colonne droite : image avec box-shadow magenta */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="flex-1 relative w-full mt-8 lg:mt-0"
                >
                  <div className="absolute -top-16 -right-16 w-72 h-72 bg-[#d81b60]/20 rounded-full blur-3xl -z-10"></div>
                  <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-purple-200/30 rounded-full blur-3xl -z-10"></div>

                  {/* ✅ Image avec ombre magenta plus transparente et moderne */}
                    <img
                      src={sector.image}
                      alt={sector.name}
                      className="relative w-full h-auto object-cover rounded-xl shadow-[0_0_10px_rgba(116,17,96,0.3)]"
                      loading="lazy"
                    />
                </motion.div>
            </div>
          </div>
        </section>

        {/* ===== Services recommandés ===== */}       
          <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <span className="inline-block px-3 py-1 text-sm font-semibold text-[#d81b60] bg-[#d81b60]/10 rounded-full mb-4">
                  Recommandations
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                  Services recommandés pour{" "}
                  <span className="text-[#d81b60]">{sector.name}</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Des solutions pensées pour répondre aux besoins spécifiques de votre secteur.
                </p>
              </motion.div>

              {/* ✅ Grille ajustée : sm: 2 colonnes → tablette + grands téléphones */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {recommendedServicesObj.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </div>
          </section>
      </div>
    </>
  );
}