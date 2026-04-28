import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Order from "./pages/Order";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import MentionsLegales from "./pages/MentionsLegales";
import Confidentialite from "./pages/Confidentialite";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import Sectors from "./pages/Sectors";
import SectorDetail from "./pages/SectorDetail";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="bg-white text-gray-900 min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:id" element={<ServiceDetail />} />
              <Route path="/order" element={<Order />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/mentions-legales" element={<MentionsLegales />} />
              <Route path="/confidentialite" element={<Confidentialite />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/sectors" element={<Sectors />} />
              <Route path="/sectors/:slug" element={<SectorDetail />} />
            </Routes>
          </main>
          <Footer />
          <Toaster position="top-right" reverseOrder={false} />
          <ScrollToTop />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;