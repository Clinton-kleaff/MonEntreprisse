import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, TrendingUp, Clock, Zap, DollarSign } from "lucide-react";
import { sectors } from "../data/sectors";
import { services } from "../data/services";
import ServiceCard from "../components/ServiceCard";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function SectorDetail() {
  const { slug } = useParams();
  const sector = sectors.find((s) => s.slug === slug);

  useEffect(() => {
    if (sector) {
      toast.success(`Découvrez nos solutions pour ${sector.name}`, {
        icon: "🎯",
        style: { background: "#d81b60", color: "#fff" },
      });
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
        {/* Hero with image */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img
            src={sector.image}
            alt={sector.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          <div className="absolute bottom-6 left-6 md:left-10">
            <Link
              to="/sectors"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition mb-3 text-sm"
            >
              <ArrowLeft size={18} /> Tous les secteurs
            </Link>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <Icon className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white">
                {sector.name}
              </h1>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  {sector.fullDescription}
                </p>

                {/* Benefits */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  {sector.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                      <CheckCircle className="w-5 h-5 text-[#d81b60] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Recommended services */}
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Zap className="text-[#d81b60]" /> Services recommandés pour {sector.name}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {recommendedServicesObj.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Summary sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-br from-[#d81b60]/5 to-white rounded-2xl p-6 border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <TrendingUp size={20} className="text-[#d81b60]" />
                  Impact clé
                </h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <DollarSign size={16} className="text-green-500" /> Revenus augmentés
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock size={16} className="text-blue-500" /> Temps libéré chaque semaine
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap size={16} className="text-yellow-500" /> Automatisation intelligente
                  </li>
                  <li className="flex items-center gap-2">
                    <TrendingUp size={16} className="text-[#d81b60]" /> Croissance durable
                  </li>
                </ul>
              </div>

              <Link
                to="/order"
                className="block w-full bg-[#d81b60] hover:bg-[#c2185b] text-white font-bold py-3 rounded-xl transition shadow-lg text-center"
              >
                Démarrer un projet
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}