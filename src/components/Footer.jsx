import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Printer } from "lucide-react";
import { SITE, BRANDS } from "../config/site";
import "../assets/css/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container footer-grid">
          <div className="footer-brand">
            <div className="brand">
              <span className="brand-mark"><Printer size={16} /></span>
              <span className="brand-name">{SITE.name}</span>
            </div>
            <p className="footer-tagline">{SITE.tagline}</p>
            <ul className="footer-contact">
              <li><Phone size={14} /> <a href={SITE.phoneHref}>{SITE.phone}</a></li>
              <li><Mail size={14} /> <a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li><MapPin size={14} /> <span>{SITE.address}</span></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/diagnose">Troubleshoot a Printer</Link></li>
              <li><Link to="/manuals">User Manuals</Link></li>
              <li><Link to="/support">Contact Support</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Driver Downloads</h4>
            <ul>
              {BRANDS.map((b) => (
                <li key={b.slug}>
                  <a href={b.driverUrl} target="_blank" rel="noopener noreferrer">
                    {b.name} Drivers ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Legal</h4>
            <ul>
              <li><Link to="/terms">Terms &amp; Conditions</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/disclaimer">Disclaimer</Link></li>
            </ul>    
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved. Not affiliated with the printer brands referenced on this site.</p>
        </div>
      </div>
    </footer>
  );
}
