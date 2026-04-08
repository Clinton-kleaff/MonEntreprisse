import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page non trouvée | Solutions Digitales Modernes</title>
        <meta name="description" content="La page que vous cherchez n'existe pas. Retournez à l'accueil." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-lg"
        >
          <div className="mb-6 flex justify-center">
            <Search size={80} className="text-[#d81b60]/30" />
          </div>
          <h1 className="text-7xl font-extrabold text-gray-900 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-2">Oups ! Page introuvable</p>
          <p className="text-gray-500 mb-8">
            La page que vous cherchez a peut-être été déplacée ou n'existe plus.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#d81b60] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#c2185b] transition shadow-md"
          >
            <Home size={18} /> Retour à l'accueil
          </Link>
        </motion.div>
      </div>
    </>
  );
}