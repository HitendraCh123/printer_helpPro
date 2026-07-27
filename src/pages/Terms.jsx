import LegalPage from "./LegalPage";
import Seo from "../components/Seo";
import { SITE } from "../config/site";

export default function Terms() {
  return (
    <>
      <Seo
        title={`Terms & Conditions | ${SITE.name}`}
        description={`The terms that govern your use of ${SITE.name}'s printer setup guides and support services.`}
        canonicalPath="/terms"
      />
      <LegalPage title="Terms & Conditions" updated="July 2026">
        <p>
          These terms govern your use of {SITE.name}. By using this site, you agree to the
          terms below. If you don't agree with any part of them, please don't use the site.
        </p>

        <h2>Independent service</h2>
        <p>
          {SITE.name} is an independent provider of printer setup guides and troubleshooting
          support. We are not affiliated with, sponsored by, or endorsed by HP, Epson, Canon,
          Brother, Dell, or any other printer manufacturer referenced on this site.
        </p>

        <h2>Use of content</h2>
        <p>
          Guides and troubleshooting steps on this site are provided for general informational
          purposes and reflect common, generally recommended practice — they aren't a substitute
          for your printer's own documentation. We link directly to official manufacturer sites
          for driver downloads and detailed documentation, and we encourage you to download
          software only from those official sources.
        </p>

        <h2>Appointments and support requests</h2>
        <p>
          Submitting a support form or booking a setup appointment through this site does not
          create a binding service contract until confirmed by our team. We'll do our best to
          respond within the timeframes stated on the Support page.
        </p>

        <h2>No warranty</h2>
        <p>
          We make reasonable efforts to keep guides accurate and current, but printer hardware,
          software, and manufacturer websites change frequently. We provide this site "as is"
          without warranties of any kind, express or implied.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          We aren't liable for any indirect, incidental, or consequential damages arising from
          your use of this site or reliance on the guides published here.
        </p>

        <h2>Changes to these terms</h2>
        <p>
          We may update these terms from time to time. Continued use of the site after changes
          are posted means you accept the revised terms.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms can be sent to {SITE.email} or by phone at {SITE.phone}.
        </p>
      </LegalPage>
    </>
  );
}
