import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Clock, Send, CheckCircle2, Headphones } from "lucide-react";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import { SITE, BRANDS } from "../config/site";
import "../assets/css/Support.css";

export default function Support() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", brand: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Seo
        title={`Contact Support — Printer Help for HP, Epson, Canon & More | ${SITE.name}`}
        description="Get in touch with our printer support team by phone, email, or contact form. We help with HP, Epson, Canon, Brother, and Dell printers."
        canonicalPath="/support"
      />

      <section className="page-hero">
        <div className="page-hero-orb" />
        <div className="container">
          <Reveal>
            <span className="eyebrow">Support</span>
            <h1 className="page-title">Contact Support</h1>
            <p className="page-sub">
              Already tried the manuals and diagnostic guides? Reach out and our team will help
              you sort it out. We cover HP, Epson, Canon, Brother, Dell, and most other major brands.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container support-layout">

          <Reveal>
            <div className="support-sidebar">
              <h2 className="sidebar-heading">We're Here to Help</h2>
              <p className="sidebar-sub">
                If you've checked the manuals and diagnosis guide and are still stuck,
                reach out to us directly using any of the options below.
              </p>

              <div className="contact-cards">
                <a href={SITE.phoneHref} className="contact-card contact-card-primary">
                  <div className="contact-card-icon phone-icon"><Phone size={22} /></div>
                  <div>
                    <h3>Phone Support</h3>
                    <p className="mono">{SITE.phone}</p>
                    <span className="avail-badge"><span className="avail-dot"/>Available 24/7</span>
                  </div>
                </a>
                <a href={`mailto:${SITE.email}`} className="contact-card">
                  <div className="contact-card-icon"><Mail size={20} /></div>
                  <div>
                    <h3>Email Support</h3>
                    <p className="mono">{SITE.email}</p>
                    <span className="reply-tag">Replies within 2 hours</span>
                  </div>
                </a>
                <div className="contact-card">
                  <div className="contact-card-icon"><MapPin size={20} /></div>
                  <div>
                    <h3>Address</h3>
                    <p>{SITE.address}</p>
                  </div>
                </div>
                <div className="contact-card">
                  <div className="contact-card-icon"><Clock size={20} /></div>
                  <div>
                    <h3>Business Hours</h3>
                    <p>{SITE.hours}</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="form-card">
              {!submitted ? (
                <form onSubmit={handleSubmit}>
                  <div className="form-header">
                    <Headphones size={28} className="form-header-icon" />
                    <h2>Send Us a Message</h2>
                  </div>
                  <div className="field">
                    <label htmlFor="name">Full Name</label>
                    <input id="name" type="text" placeholder="Your full name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div className="field">
                    <label htmlFor="email">Email Address</label>
                    <input id="email" type="email" placeholder="your@email.com" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <div className="field">
                    <label htmlFor="brand">Printer Brand</label>
                    <select id="brand" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })}>
                      <option value="">Select Brand...</option>
                      {BRANDS.map(b => <option key={b.slug} value={b.name}>{b.name}</option>)}
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="message">Describe the Issue</label>
                    <textarea id="message" rows={5} placeholder="Tell us what's going on with your printer..." required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                  </div>
                  <button type="submit" className="btn btn-primary submit-btn">
                    <Send size={16} /> Send Message
                  </button>
                </form>
              ) : (
                <motion.div className="form-success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                  <div className="success-icon"><CheckCircle2 size={48} /></div>
                  <h2>Message Received!</h2>
                  <p>Thanks, {form.name.split(" ")[0] || "there"} — our team will get back to you at <strong>{form.email}</strong> within 2 hours.</p>
                  <a href={SITE.phoneHref} className="btn btn-primary"><Phone size={15} /> Or call us now</a>
                </motion.div>
              )}
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.42 2 2 0 0 1 3.57 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  );
}
