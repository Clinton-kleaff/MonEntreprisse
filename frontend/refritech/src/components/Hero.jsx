import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    // ✅ Added lg:pt-6 – reduces top padding on laptop screens only
    <section className="relative bg-[#f8f9fa] pt-16 pb-24 sm:pt-20 sm:pb-32 lg:pt-6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-16">
          
          {/* Left Column: Text Content */}
          <div className="flex-1 text-left z-10 w-full">
            {/* Rating Badge – now higher on laptops */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-5 sm:mb-6 text-xs sm:text-sm text-gray-500 font-medium">
              <span className="flex items-center whitespace-nowrap">⭐ 4.8</span>
              <span className="flex items-center whitespace-nowrap">G 4.5</span>
              <span className="text-gray-400 whitespace-normal">basé sur 1,200+ avis</span>
            </div>

            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1e293b] leading-tight mb-5 sm:mb-6"
            >
              Développez votre entreprise avec des <span className="text-[#d81b60]">Solutions digitales modernes</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 sm:mb-10 max-w-xl leading-relaxed"
            >
              Sites web, applications, intelligence artificielle et automatisation pour gagner du temps et accélérer votre croissance.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto"
            >
              <Link 
                to="/services" 
                className="bg-[#d81b60] hover:bg-[#c2185b] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-md font-bold transition-all shadow-lg shadow-pink-200 text-center"
              >
                Voir les services
              </Link>
              <Link 
                to="/order" 
                className="border-2 border-gray-200 text-gray-800 hover:bg-gray-50 px-6 sm:px-8 py-3 sm:py-4 rounded-md font-bold transition-all text-center"
              >
                Démarrer un projet
              </Link>
            </motion.div>
            
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 text-xs text-gray-400">
              <span className="flex items-center gap-1">✓ Sécurisé</span>
              <span className="w-1 h-1 rounded-full bg-gray-300 hidden sm:inline-block" />
              <span className="flex items-center gap-1">✓ Support 24/7</span>
              <span className="w-1 h-1 rounded-full bg-gray-300 hidden sm:inline-block" />
              <span className="flex items-center gap-1">✓ Sans engagement</span>
            </div>
          </div>

          {/* Right Column: Visual Component */}
          {/* Right Column: Visual Component */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="flex-1 relative w-full mt-8 lg:mt-0"
              >
                {/* Glow background like the reference */}
                <div className="absolute -top-16 -right-16 w-72 h-72 bg-[#d81b60]/20 rounded-full blur-3xl -z-10"></div>
                <div className="absolute bottom-0 left-0 w-56 h-56 bg-purple-200/30 rounded-full blur-3xl -z-10"></div>

                {/* Card container (Databox style) */}
                <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 p-4">

                  {/* Fake browser top bar */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 bg-red-300 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-300 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-300 rounded-full"></div>
                  </div>

                  {/* Image */}
                  <img 
                    src="https://live.staticflickr.com/65535/55185652952_5240acd69a_c.jpg"
                    alt="Digital Solutions Dashboard" 
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </div>
              </motion.div>
        </div>

        {/* Logo Cloud */}
        <div className="mt-16 sm:mt-20 pt-8 sm:pt-10 border-t border-gray-100">
          <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6 sm:mb-8">
            Utilisé par +7,000 entreprises
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 md:gap-16 opacity-40 grayscale">
             <span className="font-bold text-base sm:text-xl text-gray-800">EBAY</span>
             <span className="font-bold text-base sm:text-xl text-gray-800">PWC</span>
             <span className="font-bold text-base sm:text-xl text-gray-800">SAMSONITE</span>
             <span className="font-bold text-base sm:text-xl text-gray-800">TOAST</span>
          </div>
        </div>
      </div>
    </section>
  );
}