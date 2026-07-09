import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Phone } from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Diagnose from "./pages/Diagnose";
import Manuals from "./pages/Manuals";
import Support from "./pages/Support";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Disclaimer from "./pages/Disclaimer";
import Setup from "./pages/Setup";
import { SITE } from "./config/site";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function Chrome() {
  const { pathname } = useLocation();
  const isSetup = pathname === "/setup";

  return (
    <>
      {!isSetup && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/diagnose" element={<Diagnose />} />
          <Route path="/manuals" element={<Manuals />} />
          <Route path="/support" element={<Support />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/setup" element={<Setup />} />
        </Routes>
      </main>
      {!isSetup && <Footer />}
      {!isSetup && (
        <a href={SITE.phoneHref} className="floating-cta" aria-label="Call Now">
          <span className="floating-cta-dot" />
          <Phone size={16} />
          <span>Call Now</span>
        </a>
      )}
    </>
  );
}

function App() {
  return (
    <BrowserRouter basename="/printerhelp_pro">
      <ScrollToTop />
      <Chrome />
    </BrowserRouter>
  );
} 

export default App;
