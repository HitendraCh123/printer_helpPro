import Reveal from "../components/Reveal";
import "../assets/css/LegalPage.css";

export default function LegalPage({ title, updated, children }) {
  return (
    <section className="legal-page">
      <div className="container legal-container">
        <Reveal>
          <h1>{title}</h1>
          <p className="legal-updated">Last updated: {updated}</p>
          <div className="legal-body">{children}</div>
        </Reveal>
      </div>
    </section>
  );
}

