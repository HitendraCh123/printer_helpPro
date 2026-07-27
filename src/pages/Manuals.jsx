import { useState } from "react";
import { Search, BookOpen, ExternalLink, FileText } from "lucide-react";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import { BRANDS, SITE } from "../config/site";
import "../assets/css/Manuals.css";

export default function Manuals() {
  const [query, setQuery] = useState("");
  const filtered = BRANDS.filter((b) => b.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <Seo
        title={`Printer User Manuals & Documentation | ${SITE.name}`}
        description="Find official user manuals, setup guides, and specification sheets for HP, Epson, Canon, Brother, and Dell printers — linked straight from each manufacturer."
        canonicalPath="/manuals"
      />

      <section className="page-hero">
        <div className="page-hero-orb" />
        <div className="container">
          <Reveal>
            <span className="eyebrow">Manuals</span>
            <h1 className="page-title">User Manuals &amp; Documentation</h1>
            <p className="page-sub">
              We link directly to each manufacturer's official manual library — always the most
              accurate and current source for your exact model.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="search-bar">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search by brand (e.g. HP, Canon, Brother)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="manual-grid">
            {filtered.map((b, i) => (
              <Reveal key={b.slug} delay={i * 0.07}>
                <a href={b.driverUrl} target="_blank" rel="noopener noreferrer" className="manual-card">
                  <div className="manual-icon">
                    <BookOpen size={22} />
                  </div>
                  <div className="manual-card-content">
                    <div className="manual-card-logo-row">
                      <img
                        src={b.logoUrl} alt={b.name}
                        className="manual-brand-logo"
                        onError={(e) => { e.target.style.display='none'; }}
                      />
                      <span className="manual-card-brand">{b.name}</span>
                    </div>
                    <h3>{b.name} Manuals &amp; Documentation</h3>
                    <p>Official setup guides, manuals, and specifications straight from {b.name}.</p>
                    <span className="manual-card-cta">Browse Documentation <ExternalLink size={14} /></span>
                  </div>
                  <div className="manual-arrow-wrap">
                    <ExternalLink size={18} />
                  </div>
                </a>
              </Reveal>
            ))}
            {filtered.length === 0 && (
              <div className="no-results">
                <FileText size={40} />
                <p>No brands match "{query}"</p>
                <span>Try searching for HP, Epson, Canon, Brother, or Dell</span>
              </div>
            )}
          </div>

          <Reveal>
            <div className="manual-tip">
              <div className="manual-tip-icon"><FileText size={24} /></div>
              <div>
                <h3>Can't find your exact model?</h3>
                <p>
                  Most manufacturer sites let you search by the model number printed on a label
                  on the front, top, or back of your printer. If you can't locate it, check the
                  original box or packing slip — the model number is usually printed there too.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
