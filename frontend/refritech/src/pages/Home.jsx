import Hero from "../components/Hero";
import ServiceCard from "../components/ServiceCard";
import Testimonial from "../components/Testimonial";
import { services } from "../data/services";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Développez votre entreprise avec des solutions digitales modernes</title>
        <meta
          name="description"
          content="Sites web, applications, intelligence artificielle et automatisation pour accélérer votre croissance."
        />
      </Helmet>

      {/* Hero Section - Full width, prominent like the image */}
      <Hero />

        {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-3 py-1 text-sm font-semibold text-[#d81b60] bg-[#d81b60]/10 rounded-full mb-4">
              Nos prestations
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Des solutions <span className="text-[#d81b60]">complètes</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Pour propulser votre croissance digitale avec des technologies modernes et un accompagnement sur mesure.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          {/* Optional CTA after services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-[#d81b60] font-semibold hover:gap-3 transition-all"
            >
              Voir tous nos services <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* Now using the enhanced Testimonial component below */}
      <Testimonial /> 
    </>
  );
}