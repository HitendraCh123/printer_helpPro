import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Search, Download, PlayCircle, Wifi, ShieldCheck, Cable,
  CheckCircle2, AlertCircle, ArrowRight, BookOpen, Zap, Clock, Layers, X
} from "lucide-react";
import Reveal from "../components/Reveal";
import FeedLine from "../components/FeedLine";
import Seo from "../components/Seo";
import { BRANDS, SITE } from "../config/site";
import connectPrinter from "../assets/images/pexels-george-milton-7014415.jpg"

import printer_connect_hero from "../assets/images/printer_connect_hero.png";

import "../assets/css/Home.css";

function detectOS() {
  const ua = window.navigator.userAgent;
  if (ua.includes("Win")) return "Windows";
  if (ua.includes("Mac")) return "macOS";
  if (ua.includes("Linux")) return "Linux";
  if (ua.includes("Android")) return "Android";
  if (ua.includes("like Mac")) return "iOS";
  return "your device";
}

const STEPS = [
  { icon: Search, num: "01", title: "Identify Your Printer", text: "Tell us your printer's brand and model, or let us auto-detect your operating system in one click." },
  { icon: Download, num: "02", title: "Get the Official Driver", text: "We point you straight to the correct, manufacturer-signed driver for your exact OS — no mirrors, no bundled extras." },
  { icon: PlayCircle, num: "03", title: "Install & Print", text: "Run the installer, follow the on-screen prompts, and send your first print job within minutes." },
];

const CONNECT_POINTS = [
  { icon: Wifi, text: "Clear, step-by-step connection walkthroughs" },
  { icon: ShieldCheck, text: "Firmware and security update guidance" },
  { icon: Cable, text: "Wi-Fi and network pairing help for every major brand" },
];

const STATS = [
  { icon: Layers, num: "5", label: "Major Brands Covered" },
  { icon: BookOpen, num: "40+", label: "Setup & Fix Guides" },
  { icon: Zap, num: "< 5 min", label: "Avg. Setup Time" },
  { icon: Clock, num: "24/7", label: "Self-Help Access" },
];

const SETUP_STEPS = [
  "Unbox your printer and connect it to a stable power source.",
  "Install the ink or toner cartridges as shown in the quick-start guide.",
  "Load compatible paper into the input tray and adjust the paper guides to fit.",
  "Set your preferred language, region, and date/time from the control panel.",
  "Download and install the latest official driver for your operating system.",
  "Print a test page to confirm the connection and check print quality.",
];

const OFFLINE_FIXES = [
  "Check every cable connection — make sure the USB or network cable is fully seated.",
  "Manually set the printer to \"online\" from your operating system's printer settings.",
  "Clear any stuck jobs from the print queue before sending a new one.",
  "Reinstall the driver — an outdated or corrupted driver is the most common cause of offline errors.",
  "Run the manufacturer's built-in print-and-scan diagnostic tool, if available.",
  "Open the printer and check carefully for a hidden paper jam.",
];

const FAQS = [
  {
    q: "Are printer drivers actually free to download?",
    a: "Yes, always. Genuine printer drivers are free directly from the manufacturer. We link straight to those official pages, so you never need to pay for a driver download.",
  },
  {
    q: "Why does my printer show \"offline\" even though it's connected?",
    a: "It's almost always a software or network-settings issue, not a hardware fault. Start with the offline checklist below, or visit our Diagnose page for a full walkthrough.",
  },
  {
    q: "Do I need to reinstall the driver after a Windows or macOS update?",
    a: "Sometimes. Major OS updates occasionally reset print settings or break driver compatibility. If your printer stops responding right after an update, reinstalling the latest driver usually fixes it.",
  },
  {
    q: "Can I set up a printer without the installation CD?",
    a: "Yes — most current printers no longer need one. Download the latest driver from the manufacturer's official site instead; it will always be more current than the disc that shipped in the box.",
  },
];

function CountUp({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const num = parseFloat(target);
    if (isNaN(num)) { setCount(target); return; }
    let start = 0;
    const step = (num / duration) * 16;
    const interval = setInterval(() => {
      start += step;
      if (start >= num) { setCount(num % 1 === 0 ? num : num.toFixed(1)); clearInterval(interval); }
      else setCount(num % 1 === 0 ? Math.floor(start) : start.toFixed(1));
    }, 16);
    return () => clearInterval(interval);
  }, [inView, target, duration]);
  return <span ref={ref}>{typeof count === "string" ? count : count}{suffix}</span>;
}

export default function Home() {
  const [os, setOs] = useState("Windows");
  const [confirmed, setConfirmed] = useState(null);
  const [showOsModal, setShowOsModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { setOs(detectOS()); }, []);

  function handleYesContinue() {
    setShowOsModal(false);
    navigate(`/setup?os=${encodeURIComponent(os)}`);
  }

  const handleChooseManually = () => {
    setShowOsModal(false); // Modal close
    navigate("/setup");    // Setup page par redirect
  };

  useEffect(() => {
    document.body.style.overflow = showOsModal ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showOsModal]);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <Seo
        title={`${SITE.name} — Printer Driver Downloads, Setup Guides & Support`}
        description={SITE.metaDescription}
        canonicalPath="/"
        jsonLd={faqJsonLd}
      />

      {/* ──── HERO ──── */}
      <section className="hero">
        <div className="hero-bg-grid" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="container hero-inner">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <motion.span
              className="hero-badge"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <span className="hero-badge-dot" />
              Free Driver Downloads &amp; Setup Guides
            </motion.span>
            <h1 className="hero-title">
              Printer Drivers, Setup &amp;<br />
              <span className="hero-title-accent">Support — All in One Place</span>
            </h1>
            <p className="hero-sub">
              Identify your printer to get the correct official driver, a clear installation
              walkthrough, and fixes for the most common printer problems — completely free.
            </p>
            <div className="hero-actions">
              <button type="button" className="btn btn-primary" onClick={() => setShowOsModal(true)}>
                Identify Your Printer <ArrowRight size={16} />
              </button>
              <Link to="/support" className="btn btn-secondary">
                Talk to Support
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.2, ease: "easeOut" }}
          >
            <img src={printer_connect_hero} alt="Laptop and printer connecting over Wi-Fi during driver setup" className="hero-illustration" />
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {showOsModal && (
          <motion.div
            className="os-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setShowOsModal(false)}
          >
            <motion.div
              className="os-card os-modal-card"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="os-modal-close"
                aria-label="Close"
                onClick={() => setShowOsModal(false)}
              >
                <X size={18} />
              </button>

              <div className="os-card-header">
                <span className="os-card-label">Operating System Detected</span>
                <div className="os-card-row">
                  <span className="status-dot" />
                  <span className="os-card-value mono">{os}</span>
                </div>
                <p className="os-card-sub">We've detected you are using: <strong>{os}</strong></p>
              </div>
              {confirmed === null && (
                <div className="os-card-body">
                  <p className="os-card-question">Is this correct?</p>
                  <div className="os-card-actions">
                    <button className="btn btn-primary btn-sm" onClick={handleYesContinue}>
                      <CheckCircle2 size={15} /> Yes, Continue to Setup
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={handleChooseManually}
                    >
                      No, Let me choose
                    </button>
                  </div>
                </div>
              )}
              {confirmed === true && (
                <motion.p className="os-result success" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <CheckCircle2 size={16} /> Great! Head to <Link to="/diagnose" onClick={() => setShowOsModal(false)}>Diagnose</Link> to find your model.
                </motion.p>
              )}
              {confirmed === false && (
                <motion.p className="os-result" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <AlertCircle size={16} /> Select your system on the <Link to="/diagnose" onClick={() => setShowOsModal(false)}>Diagnose</Link> page.
                </motion.p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ──── STATS ──── */}
      <section className="stats-strip">
        <div className="container stats-grid">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              className="stat-item"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
            >
              <s.icon size={20} className="stat-icon" />
              <span className="stat-num">{s.num}</span>
              <span className="stat-label">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="container"><FeedLine nodeCount={1} /></div>

      {/* ──── HOW TO INSTALL ──── */}
      <section className="section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Getting Started</span>
            <h2 className="section-title">How to Install Your Printer</h2>
            <p className="section-sub">Three simple steps to get connected and printing — no technician required.</p>
          </Reveal>
          <div className="steps-row">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.12}>
                <div className="step-card">
                  <div className="step-num">{step.num}</div>
                  <div className="step-icon"><step.icon size={22} /></div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                  {i < STEPS.length - 1 && <div className="step-connector" />}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="container"><FeedLine nodeCount={3} /></div>

      {/* ──── BRANDS ──── */}
      <section className="section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Coverage</span>
            <h2 className="section-title">We Cover All Major Printer Brands</h2>
            <p className="section-sub">Direct links to official drivers and support, sourced straight from each manufacturer.</p>
          </Reveal>

          {/* <div className="brand-grid">
            {BRANDS.map((b, i) => (
              <Reveal key={b.slug} delay={i * 0.07}>
                <a href={b.driverUrl} target="_blank" rel="noopener noreferrer" className="brand-card">
                  <img src={b.logoUrl} alt={b.name + " logo"} className="brand-logo" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                  <span className="brand-name-fallback" style={{ display: 'none' }}>{b.name}</span>
                  <span className="brand-cta">Official Drivers ↗</span>
                </a>
              </Reveal>
            ))}
          </div> */}
        </div>
      </section>

      {/* ──── CONNECT SEAMLESSLY ──── */}
      <section className="connect-section">
        <div className="connect-bg-pattern" />
        <div className="container connect-grid">
          <Reveal>
            <span className="eyebrow eyebrow-light">Seamless Connection</span>
            <h2 className="section-title light">Connect Any Printer, on Any Device</h2>
            <p className="section-sub light">
              Printing shouldn't depend on which laptop, desktop, or phone you grabbed first.
              Whether you're on Windows, macOS, or mobile, our guided setup walks you through
              installing the right driver and getting connected without the guesswork.
            </p>
            <ul className="connect-list">
              {CONNECT_POINTS.map((p) => (
                <li key={p.text}>
                  <span className="connect-check"><p.icon size={16} /></span>
                  <span>{p.text}</span>
                </li>
              ))}
            </ul>
            <Link to="/setup" className="btn btn-ghost">Find My Model <ArrowRight size={16} /></Link>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="connect-visual">
              <img src={connectPrinter} alt="" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ──── ABOUT ──── */}
      <section className="section">
        <div className="container about-grid">
          <Reveal>
            <span className="eyebrow">About {SITE.name}</span>
            <h2 className="section-title">Straightforward Printer Help, No Fluff</h2>
            <p className="about-text">
              Printers are one of the few pieces of home and office tech almost everyone still
              owns — and one of the few that still trips people up. Between confusing installer
              wizards, outdated driver links, and cryptic blinking lights, getting a printer
              working shouldn't take an entire afternoon.
            </p>
            <p className="about-text" style={{ marginTop: '16px' }}>
              {SITE.name} exists to fix that. We maintain clear, current setup instructions and
              troubleshooting guides for the most popular printer brands, and we link directly to
              each manufacturer's official driver page — never a mirror, never a bundled installer,
              just the real thing.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="steps-list-card">
              <h3>How to Proceed with Printer Setup?</h3>
              <ol className="numbered-steps">
                {SETUP_STEPS.map((step, i) => (
                  <li key={i}><span className="step-bullet">{i + 1}</span>{step}</li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ──── FAQ ──── */}
      <section className="section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">FAQ</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-sub">Quick answers to the questions we hear most often.</p>
          </Reveal>
          <div className="offline-grid">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.06}>
                <div className="offline-card">
                  <p style={{ fontWeight: 600, marginBottom: 8 }}>{f.q}</p>
                  <p>{f.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ──── OFFLINE FIX ──── */}
      <section className="offline-section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Common Issues</span>
            <h2 className="section-title">How to Fix a Printer Offline Issue</h2>
            <p className="section-sub">
              If your printer has abruptly stopped responding, "offline" status is the first
              thing to troubleshoot. Here are the fastest ways to get it back online:
            </p>
          </Reveal>
          <div className="offline-grid">
            {OFFLINE_FIXES.map((fix, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="offline-card">
                  <span className="offline-num">0{i + 1}</span>
                  <p>{fix}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="cta-banner">
              <div className="cta-banner-text">
                <h3>Still having trouble?</h3>
                <p>Our support team is available 24/7 by phone to help you get back to printing.</p>
              </div>
              <div className="cta-banner-actions">
                <a href={SITE.phoneHref} className="btn btn-primary"><Phone size={15} />{SITE.phone}</a>
                <Link to="/support" className="btn btn-secondary">Send a Message</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Phone({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.42 2 2 0 0 1 3.57 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

