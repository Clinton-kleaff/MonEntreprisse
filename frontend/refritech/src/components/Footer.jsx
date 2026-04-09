import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { submitNewsletter } from "../utils/api";

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!newsletterEmail.includes("@") || !newsletterEmail.trim()) {
      toast.error("Email valide requis");
      return;
    }
    setLoading(true);
    const result = await submitNewsletter(newsletterEmail);
    setLoading(false);
    if (result.success) {
      toast.success(result.message);
      setNewsletterEmail("");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Wagrade</h3>
            <p className="text-gray-400 text-sm mb-4">
              Solutions digitales modernes pour accélérer votre croissance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#d81b60] transition">
                <FontAwesomeIcon icon={faFacebook} size="lg" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#d81b60] transition">
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#d81b60] transition">
                <FontAwesomeIcon icon={faLinkedin} size="lg" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Liens rapides</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services" className="text-gray-400 hover:text-[#d81b60] transition">Services</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-[#d81b60] transition">À propos</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-[#d81b60] transition">Contact</Link></li>
            </ul>
          </div>

          {/* Legal & contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Légal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/mentions-legales" className="text-gray-400 hover:text-[#d81b60] transition">Mentions légales</Link></li>
              <li><Link to="/confidentialite" className="text-gray-400 hover:text-[#d81b60] transition">Politique de confidentialité</Link></li>
            </ul>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin size={14} /> Haiti, Port-au-Prince, Delmas 33
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Phone size={14} /> +509 1234 5678
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Mail size={14} /> contact@wagrade.ht
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-white mb-4">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-3">
              Recevez nos actualités et offres exclusives.
            </p>
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Votre email"
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-[#d81b60]"
                required
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-[#d81b60] hover:bg-[#c2185b] text-white px-3 py-2 rounded-lg transition disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Wagrade — Tous droits réservés
        </div>
      </div>
    </footer>
  );
}