import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, ShoppingCart, Menu, X, MessageCircle, Printer } from "lucide-react";
import { SITE } from "../config/site";
import "../assets/css/SetupHeader.css";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Categories", href: "#categories" },
  { label: "Products", href: "#products" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#appointment" },
];

export default function SetupHeader() {
  const [open, setOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="sh-strip" data-scrolled={scrolled}>
        <div className="container sh-strip-inner">
          {/* Brand + live status */}
          <a href="#home" className="sh-brand">
            <span className="sh-brand-mark"><Printer size={16} /></span>
            <span className="sh-brand-text">
              <span className="sh-brand-name">{SITE.name}</span>
              <span className="sh-status">
                <span className="sh-status-dot" />
                Lines open now
              </span>
            </span>
          </a>

          {/* Nav as a signal path */}
          <nav className="sh-nav" aria-label="Setup page navigation">
            {NAV_LINKS.map((link) => (
              <a key={link.label} href={link.href} className="sh-nav-link">
                {link.label}
              </a>
            ))}
          </nav>

          {/* Readout + actions */}
          <div className="sh-actions">
            <a href={SITE.phoneHref} className="sh-readout">
              <span className="sh-readout-label">Call</span>
              <span className="sh-readout-value mono">{SITE.phone}</span>
            </a>
            <a href="#cart" className="sh-node" aria-label="Cart">
              <ShoppingCart size={18} />
              <span className="sh-node-badge">0</span>
            </a>
            <button
              type="button"
              className="sh-toggle"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              className="sh-mobile-nav"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22 }}
              aria-label="Setup page navigation mobile"
            >
              {NAV_LINKS.map((link) => (
                <a key={link.label} href={link.href} className="sh-mobile-link" onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              ))}
              <a href={SITE.phoneHref} className="sh-mobile-link sh-mobile-phone">
                <Phone size={15} /> {SITE.phone}
              </a>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Floating call node */}
      <a href={SITE.phoneHref} className="sh-float-call" aria-label="Call Now">
        <span className="sh-float-ping" />
        <Phone size={20} />
      </a>

      {/* Floating chat node */}
      <div className="sh-chat-wrap">
        <AnimatePresence>
          {chatOpen && (
            <motion.div
              className="sh-chat-bubble"
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.96 }}
              transition={{ duration: 0.18 }}
            >
              <strong>Need a hand?</strong>
              <span>Our line is open — {SITE.phone}</span>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          type="button"
          className="sh-chat-toggle"
          aria-label="Chat with us"
          onClick={() => setChatOpen((v) => !v)}
        >
          <MessageCircle size={20} />
        </button>
      </div>
    </>
  );
}
