import LegalPage from "./LegalPage";
import Seo from "../components/Seo";
import { SITE } from "../config/site";

export default function Privacy() {
  return (
    <>
      <Seo
        title={`Privacy Policy | ${SITE.name}`}
        description={`What information ${SITE.name} collects and how it's used.`}
        canonicalPath="/privacy"
      />
      <LegalPage title="Privacy Policy" updated="July 2026">
        <p>
          This policy explains what information {SITE.name} collects and how it's used. We keep
          this simple on purpose — we only collect what we need to help you.
        </p>

        <h2>Information we collect</h2>
        <ul>
          <li>Contact details you provide through our support or appointment forms (name, email, phone, message).</li>
          <li>Basic, anonymized analytics about how visitors use the site, such as which pages are viewed.</li>
        </ul>

        <h2>How we use it</h2>
        <p>
          We use the information you submit only to respond to your support request or
          appointment booking. We do not sell your personal information, and we don't share it
          with third parties for marketing purposes.
        </p>

        <h2>Cookies</h2>
        <p>
          This site may use minimal, functional cookies needed for basic operation. We don't use
          cookies for cross-site advertising tracking.
        </p>

        <h2>Manufacturer links</h2>
        <p>
          When you follow a link to an official manufacturer site (HP, Epson, Canon, Brother,
          Dell, etc.), that site's own privacy policy applies to any information you provide
          there — we have no access to it and aren't responsible for their practices.
        </p>

        <h2>Data retention</h2>
        <p>
          We retain support and appointment messages only as long as needed to resolve your
          request, and delete them on a routine basis afterward.
        </p>

        <h2>Contact</h2>
        <p>
          For privacy questions or to request that we delete your information, reach us at{" "}
          {SITE.email}.
        </p>
      </LegalPage>
    </>
  );
}
