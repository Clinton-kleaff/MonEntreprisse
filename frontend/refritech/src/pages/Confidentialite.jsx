import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Eye, Database, Cookie, MailQuestion } from "lucide-react";
import { motion } from "framer-motion";

export default function Confidentialite() {
  return (
    <>
      <Helmet>
        <title>Politique de confidentialité | WaGradeTech</title>
        <meta
          name="description"
          content="Politique de confidentialité de WaGradeTech – collecte des données, cookies, RGPD et vos droits."
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
                <Shield className="w-6 h-6 text-[#d81b60]" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
              Politique de <span className="text-[#d81b60]">confidentialité</span>
            </h1>
            <p className="text-gray-500 max-w-2xl">
              Nous accordons une importance capitale à la protection de vos données personnelles.
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-gray max-w-none">
            <section className="mb-8 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <Database size={20} className="text-[#d81b60]" />
                <h2 className="text-xl font-bold text-gray-800 m-0">Collecte des informations</h2>
              </div>
              <p className="text-gray-600">
                Nous collectons les données que vous nous fournissez volontairement via :
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-1 mt-2">
                <li>Le formulaire de contact (nom, email, message)</li>
                <li>L’inscription à la newsletter (adresse email)</li>
                <li>Le passage de commande (nom, adresse, téléphone, email)</li>
              </ul>
              <p className="text-gray-600 mt-2">
                Ces données sont utilisées uniquement pour répondre à vos demandes, traiter vos commandes et vous envoyer nos actualités (si vous y avez consenti).
              </p>
            </section>

            <section className="mb-8 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <Cookie size={20} className="text-[#d81b60]" />
                <h2 className="text-xl font-bold text-gray-800 m-0">Cookies et traceurs</h2>
              </div>
              <p className="text-gray-600">
                Notre site utilise des cookies techniques nécessaires à son bon fonctionnement (gestion de session, préférences). Nous n’utilisons pas de cookies publicitaires tiers sans votre consentement explicite. Vous pouvez paramétrer votre navigateur pour refuser les cookies, mais certaines fonctionnalités pourraient être altérées.
              </p>
            </section>

            <section className="mb-8 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <Eye size={20} className="text-[#d81b60]" />
                <h2 className="text-xl font-bold text-gray-800 m-0">Vos droits (RGPD & loi haïtienne)</h2>
              </div>
              <p className="text-gray-600">
                Conformément à la réglementation applicable, vous disposez des droits suivants :
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-1 mt-2">
                <li>Droit d’accès à vos données personnelles</li>
                <li>Droit de rectification ou d’effacement</li>
                <li>Droit à la limitation du traitement</li>
                <li>Droit d’opposition</li>
                <li>Droit à la portabilité des données</li>
              </ul>
              <p className="text-gray-600 mt-2">
                Pour exercer ces droits, contactez notre délégué à la protection des données à l’adresse : <a href="mailto:dpo@wagradetech.ht" className="text-[#d81b60] hover:underline">dpo@wagradetech.ht</a>
              </p>
              <p className="text-gray-600 mt-2">
                Nous nous engageons à répondre dans un délai maximum de 30 jours.
              </p>
            </section>

            <section className="mb-8 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <MailQuestion size={20} className="text-[#d81b60]" />
                <h2 className="text-xl font-bold text-gray-800 m-0">Sécurité et hébergement</h2>
              </div>
              <p className="text-gray-600">
                Vos données sont hébergées sur des serveurs sécurisés en Europe. Nous mettons en œuvre des mesures techniques et organisationnelles pour empêcher toute perte, utilisation frauduleuse ou accès non autorisé.
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