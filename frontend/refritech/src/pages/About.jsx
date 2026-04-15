import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Target, Lightbulb, TrendingUp, Users, Award, Clock } from "lucide-react";

export default function About() {
  const values = [
    { icon: Lightbulb, title: "Innovation constante", desc: "Nous utilisons les dernières technologies pour vous offrir des solutions avant-gardistes." },
    { icon: TrendingUp, title: "Résultats mesurables", desc: "Chaque projet vise un ROI clair et des indicateurs de performance suivis." },
    { icon: Users, title: "Transparence & confiance", desc: "Une communication claire et un partenariat gagnant-gagnant." },
  ];

  const stats = [
    { value: "1200+", label: "Projets réalisés", icon: Award },
    { value: "98%", label: "Clients satisfaits", icon: TrendingUp },
    { value: "24h", label: "Délai de réponse", icon: Clock },
  ];

  return (
    <>
      <Helmet>
        <title>À propos | Solutions Digitales Modernes</title>
        <meta name="description" content="Découvrez notre histoire, notre mission et nos valeurs : accompagner les entreprises dans leur transformation digitale avec innovation et transparence." />
      </Helmet>

      <div className="bg-white">
        {/* Hero section */}
        <section className="bg-gradient-to-br from-gray-50 to-white py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                À propos de <span className="text-[#d81b60]">WaGradeTech</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Nous aidons les entreprises à se transformer grâce aux technologies modernes.
                Fondée en 2025, notre mission est de démocratiser l'accès aux solutions digitales de qualité.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center gap-2 bg-[#d81b60]/10 rounded-full px-4 py-1.5 mb-4">
                  <Target size={16} className="text-[#d81b60]" />
                  <span className="text-sm font-medium text-[#d81b60]">Notre mission</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Accélérer votre croissance digitale
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Chez WaGradeTech, nous croyons que chaque entreprise, quelle que soit sa taille,
                  mérite des solutions digitales performantes, accessibles et évolutives.
                  Notre équipe d'experts combine créativité, technologie et stratégie pour
                  transformer vos idées en succès concrets.
                </p>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <Clock size={18} className="text-[#d81b60]" />
                    <span className="text-sm text-gray-600">Support 7j/7</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={18} className="text-[#d81b60]" />
                    <span className="text-sm text-gray-600">Équipe dédiée</span>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-[#d81b60]/5 to-[#d81b60]/10 rounded-2xl p-8 text-center"
              >
                <img
                  src="https://live.staticflickr.com/65535/55187097631_39b4920030_c.jpg"
                  alt="Notre équipe"
                  className="rounded-xl shadow-md w-full object-cover mb-4"
                />
                <p className="text-gray-500 text-sm">Une équipe passionnée à votre écoute</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Nos valeurs</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Ce qui nous guide au quotidien pour vous offrir le meilleur.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition"
                >
                  <div className="w-12 h-12 bg-[#d81b60]/10 rounded-xl flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-[#d81b60]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6"
                >
                  <stat.icon className="w-10 h-10 text-[#d81b60] mx-auto mb-3" />
                  <div className="text-4xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-gray-500 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-[#d81b60]/5 to-[#d81b60]/10">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Prêt à faire passer votre entreprise au niveau supérieur ?
            </h2>
            <p className="text-gray-600 mb-6">Discutons de votre projet et trouvons la solution idéale.</p>
            <a
              href="/contact"
              className="inline-flex items-center bg-[#d81b60] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#c2185b] transition shadow-lg shadow-[#d81b60]/30"
            >
              Contactez-nous
            </a>
          </div>
        </section>
      </div>
    </>
  );
}


// Be silent