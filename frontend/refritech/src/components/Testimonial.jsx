import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sophie Martin",
    role: "CEO, TechStart",
    text: "Service incroyable, mon business a doublé grâce à leur solution digitale. L'équipe est à l'écoute et très professionnelle.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
  },
  {
    name: "Thomas Dubois",
    role: "Directeur Marketing, GrowthCo",
    text: "L'équipe est réactive et professionnelle. Notre site génère 40% de leads en plus depuis la refonte.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
  },
  {
    name: "Marie-Claire Bernard",
    role: "Fondatrice, ÉcoSolutions",
    text: "L'automatisation de nos processus nous a fait gagner 15h par semaine. Un accompagnement au top !",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
  },
  {
    name: "David Lefèvre",
    role: "CTO, Innov8",
    text: "L'application web sur mesure est parfaite, scalable et sécurisée. Je recommande vivement.",
    image: "https://randomuser.me/api/portraits/men/91.jpg",
    rating: 4,
  },
];

export default function Testimonial() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-sm font-semibold text-[#d81b60] bg-[#d81b60]/10 rounded-full mb-4">
            Témoignages
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Ce que nos <span className="text-[#d81b60]">clients disent</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ils nous font confiance et leurs résultats parlent d’eux‑mêmes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${i < t.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <Quote size={28} className="text-[#d81b60]/20" />
              </div>
              <p className="text-gray-700 leading-relaxed mb-6 italic">“{t.text}”</p>
              <div className="flex items-center gap-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-[#d81b60]/20"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{t.name}</h4>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-gray-400">
            +1200 clients satisfaits • Note moyenne 4.9/5 • Recommandé par 98% de nos clients
          </p>
        </motion.div>
      </div>
    </section>
  );
}