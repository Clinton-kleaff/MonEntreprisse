import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Building, Server, Mail, Fingerprint } from "lucide-react";
import { motion } from "framer-motion";

export default function MentionsLegales() {
  return (
    <>
      <Helmet>
        <title>Mentions légales | WaGradeTech</title>
        <meta
          name="description"
          content="Mentions légales de WaGradeTech – informations sur l'éditeur, l'hébergement et la propriété intellectuelle."
        />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white py-12 md:py-20"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-[#d81b60] transition mb-6 text-sm"
          >
            <ArrowLeft size={16} /> Retour à l'accueil
          </Link>

          {/* Header */}
          <div className="mb-10 text-center md:text-left">
            <div className="flex justify-center md:justify-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#d81b60]/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-[#d81b60]" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
              Mentions <span className="text-[#d81b60]">légales</span>
            </h1>
            <p className="text-gray-500 max-w-2xl">
              Conformément aux dispositions des articles 6-III et 19 de la loi pour la confiance dans l'économie numérique.
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-gray max-w-none">
            <section className="mb-8 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <Building size={20} className="text-[#d81b60]" />
                <h2 className="text-xl font-bold text-gray-800 m-0">Éditeur du site</h2>
              </div>
              <p className="text-gray-600 mt-2">
                <strong>WaGradeTech</strong><br />
                Société spécialisée en solutions digitales modernes<br />
                Siège social : Delmas 33, Port-au-Prince, Haïti<br />
                Téléphone : +509 1234 5678<br />
                Email : <a href="mailto:contact@wagradetech.ht" className="text-[#d81b60] hover:underline">contact@wagradetech.ht</a><br />
                Numéro d'identification : 123 456 789 (RNM Haïti)<br />
                Directeur de publication : John Doe
              </p>
            </section>

            <section className="mb-8 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <Server size={20} className="text-[#d81b60]" />
                <h2 className="text-xl font-bold text-gray-800 m-0">Hébergement</h2>
              </div>
              <p className="text-gray-600">
                Ce site est hébergé par :<br />
                <strong>OVHcloud</strong><br />
                2 rue Kellermann – 59100 Roubaix – France<br />
                Tél : +33 9 72 10 10 07<br />
                <a href="https://www.ovhcloud.com" className="text-[#d81b60] hover:underline" target="_blank" rel="noopener noreferrer">www.ovhcloud.com</a>
              </p>
            </section>

            <section className="mb-8 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <Fingerprint size={20} className="text-[#d81b60]" />
                <h2 className="text-xl font-bold text-gray-800 m-0">Propriété intellectuelle</h2>
              </div>
              <p className="text-gray-600">
                L'ensemble des éléments composant ce site (textes, logos, images, vidéos, code source) est la propriété exclusive de WaGradeTech, sauf mentions contraires. Toute reproduction, distribution ou utilisation sans autorisation préalable est interdite.
              </p>
            </section>

            <section className="mb-8 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <Mail size={20} className="text-[#d81b60]" />
                <h2 className="text-xl font-bold text-gray-800 m-0">Contact</h2>
              </div>
              <p className="text-gray-600">
                Pour toute question relative à ces mentions légales ou à l’utilisation du site, vous pouvez nous écrire à :<br />
                <a href="mailto:legal@wagradetech.ht" className="text-[#d81b60] hover:underline">legal@wagradetech.ht</a>
              </p>
            </section>

            <p className="text-sm text-gray-400 mt-8">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
}