import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Link, useNavigate } from "react-router-dom";

import {
  Phone, CalendarCheck, MessageCircle, Wrench, Settings2,
  Gauge, Network, Headset, CheckCircle2, Send, ArrowRight,
  Cloud, ShieldCheck, Zap
} from "lucide-react";

import Reveal from "../components/Reveal";
import SetupHeader from "../components/SetupHeader";
import Seo from "../components/Seo";
import { SITE } from "../config/site";
import "../assets/css/Setup.css";

const CATEGORIES = [
  {
    title: "Everyday & Wireless Printing",
    desc: "Compact, cloud-ready devices optimized for home offices, remote workers, and seamless mobile connectivity.",
    img: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Enterprise Document Centers",
    desc: "High-capacity multifunction printers (MFPs) engineered for secure workgroups, fast automated duplexing, and high daily duty cycles.",
    img: "https://images.unsplash.com/photo-1568952433726-3896e3881c65?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Creative & Wide-Format",
    desc: "Professional-grade plotters and photo printers featuring extended color gamuts for striking marketing materials and architectural drafts.",
    img: "https://images.unsplash.com/photo-1612278675615-7b093b07772d?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "High-Speed Laser Monochromes",
    desc: "Built for pure efficiency. Rapid text generation with ultra-low cost-per-page metrics for text-heavy corporate environments.",
    img: "https://images.unsplash.com/photo-1581235720704-06d3acc6dd17?q=80&w=600&auto=format&fit=crop",
  },
];

const BUYING_GUIDE = [
  {
    title: "Smart Home Office Printers",
    desc: "Voice-activated, compact inkjet hybrids with borderless printing and intuitive mobile app controls.",
    bestFor: "Remote workers & families",
    img: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=500&auto=format&fit=crop",
  },
  {
    title: "Commercial Laser Printers",
    desc: "Unmatched speed and precision text. Includes enterprise-grade security protocols to protect sensitive corporate data.",
    bestFor: "Legal, medical & corporate offices",
    img: "https://images.unsplash.com/photo-1581235720704-06d3acc6dd17?q=80&w=500&auto=format&fit=crop",
  },
  {
    title: "Vibrant Photo Inkjets",
    desc: "High-resolution micro-piezo technology delivering gallery-quality prints, fine art reproductions, and vivid graphics.",
    bestFor: "Photographers & design agencies",
    img: "https://images.unsplash.com/photo-1612278675615-7b093b07772d?q=80&w=500&auto=format&fit=crop",
  },
  {
    title: "Refillable Supertank Printers",
    desc: "Ditch the cartridges. These mega-tank models dramatically reduce ongoing ink costs and require less frequent maintenance.",
    bestFor: "High-volume color printing",
    img: "https://images.unsplash.com/photo-1612815154131-4d6e0e3e6d09?q=80&w=500&auto=format&fit=crop",
  },
  {
    title: "Networked Multifunction (MFPs)",
    desc: "Your all-in-one hub for printing, scanning, copying, and faxing. Features advanced document feeder technology.",
    bestFor: "Collaborative departments",
    img: "https://images.unsplash.com/photo-1614689103260-32cba0e4b6ba?q=80&w=500&auto=format&fit=crop",
  },
  {
    title: "Mobile & Portable Printers",
    desc: "Lightweight, battery-operated printers equipped with Bluetooth for issuing invoices and documents directly in the field.",
    bestFor: "Sales reps & traveling professionals",
    img: "https://images.unsplash.com/photo-1606229365485-93a4b6113c6c?q=80&w=500&auto=format&fit=crop",
  },
];

const SERVICES = [
  { icon: Settings2, title: "Seamless Device Onboarding", desc: "Complete unboxing, physical assembly, driver installation, and initial calibration to ensure peak print quality from day one." },
  { icon: Cloud, title: "Wireless & Cloud Integration", desc: "Expert configuration for AirPrint, Google Cloud Print, Wi-Fi Direct, and mobile app syncing across all your devices." },
  { icon: Wrench, title: "Hardware Diagnostics & Repair", desc: "Rapid troubleshooting for paper jams, dried printheads, streak issues, and electronic board failures to minimize downtime." },
  { icon: ShieldCheck, title: "Network Security Setup", desc: "Implementation of secure print queues, user authentication (PIN/Badge access), and firewall configurations to protect documents." },
  { icon: Zap, title: "Preventative Maintenance", desc: "Scheduled internal cleaning, roller replacements, and firmware updates to drastically extend your machine's lifecycle." },
  { icon: Headset, title: "On-Demand Remote IT Support", desc: "Instant screen-share and live-chat assistance to resolve software conflicts and offline errors without waiting for a technician." },
];

export default function Setup() {
  const navigate = useNavigate();

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", model: "", issue: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await emailjs.send(
        "service_b50e08n", // Service ID
        "template_hyuxh1l", // Template ID
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          model: form.model,
          issue: form.issue,
        },
        "WHTEW8Ps9-2U_9fEV" // Public Key
      );

      setSubmitted(true);

      setForm({
        name: "",
        email: "",
        phone: "",
        model: "",
        issue: "",
      });

      setTimeout(() => {
        window.location.reload();
        navigate('/setup');
      }, 2000);

    }
    catch (error) {
      console.error("Email Error:", error);
      alert("Failed to send your request. Please try calling us directly.");
    }
  };

  return (
    <>
      <Seo
        title={`Expert Printer Setup, Configuration & Repair Support | ${SITE.name}`}
        description="Comprehensive printer installation, network integration, and technical troubleshooting services. Browse our professional buying guide to find your perfect print solution."
        canonicalPath="/setup"
      />

      <SetupHeader />

      {/* ── HERO ── */}
      <section className="setup-hero" id="home">
        <div className="hero-bg-grid" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="container setup-hero-inner">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="setup-hero-content"
          >
            <h1 className="setup-hero-title">
              Professional Printer <span className="hero-title-accent">Installation & IT Support</span>
            </h1>
            <p className="setup-hero-sub">
              Eliminate connectivity frustrations. From deploying secure enterprise network printers to calibrating home-office devices, our certified technicians ensure flawless performance and zero downtime.
            </p>
            <div className="setup-hero-actions">
              <a href={SITE.phoneHref} className="btn btn-primary">
                <Phone size={16} /> Get Instant Support
              </a>
              <a href="#appointment" className="btn btn-secondary">
                <CalendarCheck size={16} /> Schedule Onboarding
              </a>
              <a href="#appointment" className="btn btn-ghost">
                <MessageCircle size={16} /> Live Expert Chat
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PRINTER CATEGORIES ── */}
      <section className="section" id="categories">
        <div className="container">
          <Reveal>
            <h2 className="section-title centered">Explore Hardware Solutions</h2>
          </Reveal>
          <div className="category-grid">
            {CATEGORIES.map((cat, i) => (
              <Reveal key={cat.title} delay={i * 0.08}>
                <div className="category-card">
                  <div className="category-img-wrap">
                    <img src={cat.img} alt={cat.title} loading="lazy" />
                  </div>
                  <h3>{cat.title}</h3>
                  <p>{cat.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUYING GUIDE ── */}
      <section className="section featured-section" id="products">
        <div className="container">
          <Reveal>
            <h2 className="section-title centered">Curated Device Recommendations</h2>
            <p className="section-sub" style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
              Not sure which machine handles your workload? Review our expert breakdown of the industry's most reliable hardware types to optimize your workflow and reduce consumable costs.
            </p>
          </Reveal>
          <div className="product-grid">
            {BUYING_GUIDE.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <div className="product-card">
                  <div className="product-img-wrap">
                    <img src={p.img} alt={p.title} loading="lazy" />
                  </div>
                  <div className="product-body">
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                    <div className="product-price" style={{ fontSize: 13, fontWeight: 600, color: "var(--signal, #1a56db)" }}>Ideal for: {p.bestFor}</div>
                    <Link to="/diagnose" className="btn btn-primary add-cart-btn">
                      View Deployment Guide <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR SERVICES ── */}
      <section className="section" id="services">
        <div className="container">
          <Reveal>
            <h2 className="section-title centered">Our Technical Capabilities</h2>
          </Reveal>
          <div className="service-grid">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06}>
                <div className="service-card">
                  <div className="service-icon-band">
                    <s.icon size={28} />
                  </div>
                  <div className="service-card-body">
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCHEDULE AN APPOINTMENT ── */}
      <section className="section appointment-section" id="appointment">
        <div className="container">
          <Reveal>
            <h2 className="section-title centered">Request a Service Consultation</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="appointment-form-card">
              {!submitted ? (
                <form onSubmit={handleSubmit}>
                  <div className="field">
                    <label htmlFor="name">Contact Name *</label>
                    <input
                      id="name" name="name" type="text" required
                      placeholder="Enter your full name"
                      value={form.name} onChange={handleChange}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="email">Corporate or Personal Email *</label>
                    <input
                      id="email" name="email" type="email" required
                      placeholder="Enter a valid email address"
                      value={form.email} onChange={handleChange}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="phone">Direct Phone Number *</label>
                    <input
                      id="phone" name="phone" type="tel" maxLength={15} required
                      placeholder="Enter your best contact number"
                      value={form.phone} onChange={handleChange}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="model">Device Make & Model *</label>
                    <input
                      id="model" name="model" type="text" required
                      placeholder="e.g., HP LaserJet Pro MFP M428fdw"
                      value={form.model} onChange={handleChange}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="issue">Nature of Request *</label>
                    <textarea
                      id="issue" name="issue" rows={5} required
                      placeholder="Please provide diagnostic details or describe the setup assistance required..."
                      value={form.issue} onChange={handleChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary submit-btn">
                    <Send size={16} /> Submit Service Request
                  </button>
                </form>
              ) : (
                <motion.div
                  className="form-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="success-icon"><CheckCircle2 size={48} /></div>
                  <h2>Request Received</h2>
                  <p>Your diagnostic ticket has been successfully logged. A support specialist will reach out shortly.</p>
                  <a href={SITE.phoneHref} className="btn btn-primary"><Phone size={15} /> Call for Immediate Dispatch</a>
                </motion.div>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}