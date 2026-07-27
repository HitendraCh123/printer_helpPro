import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, Printer } from "lucide-react";
import { SITE } from "../config/site";
import "../assets/css/Header.css";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Diagnose", to: "/diagnose" },
  { label: "Manuals", to: "/manuals" },
  { label: "Support", to: "/support" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* TOP BAR */}
      <div className="topbar">
        <div className="container topbar-inner">
          <span className="topbar-msg">🖨️ Free driver guides &amp; live troubleshooting help</span>
          <a href={SITE.phoneHref} className="topbar-phone">
            <Phone size={13} /> {SITE.phone}
          </a>
        </div>
      </div>

      <motion.header
        className="header"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        data-scrolled={scrolled}
      >
        <div className="container header-inner">
          <Link to="/" className="brand" onClick={() => setOpen(false)}>
            <span className="brand-mark">
              <Printer size={16} />
            </span>
            <span className="brand-name">{SITE.name}</span>
          </Link>

          <nav className="nav-desktop" aria-label="Main">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <a href={SITE.phoneHref} className="header-phone">
            <Phone size={15} strokeWidth={2.2} />
            <span className="mono">{SITE.phone}</span>
          </a>

          <button
            className="nav-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              className="nav-mobile"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              aria-label="Main mobile"
            >
              {NAV_LINKS.map((link) => (
                <NavLink key={link.to} to={link.to} className="nav-mobile-link" onClick={() => setOpen(false)}>
                  {link.label}
                </NavLink>
              ))}
              <a href={SITE.phoneHref} className="nav-mobile-link nav-mobile-phone">
                <Phone size={16} /> {SITE.phone}
              </a>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
