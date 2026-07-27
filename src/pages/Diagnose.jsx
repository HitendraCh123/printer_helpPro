import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wifi, Cable, RefreshCcw, FileWarning, Settings2, Volume2, ChevronDown, ExternalLink, ArrowRight } from "lucide-react";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import { BRANDS, SITE } from "../config/site";
import "../assets/css/Diagnose.css";

const ISSUES = [
  {
    icon: Wifi,
    title: "Printer Is Offline",
    summary: "Your computer shows the printer as offline and print jobs won't send.",
    steps: [
      "Confirm the printer is powered on and not sitting in sleep mode.",
      "Check the Wi-Fi connection — print a Network Configuration Page from the printer's screen to verify it has an IP address.",
      "Restart both the printer and the computer, then try printing again.",
      "Update the printer firmware and reinstall the latest driver from the manufacturer.",
    ],
  },
  {
    icon: FileWarning,
    title: "Paper Jams",
    summary: "The printer has stopped feeding paper, or a sheet is stuck inside.",
    steps: [
      "Turn the printer off completely before attempting to remove any paper.",
      "Open every access door — rear panel, front tray, and cartridge area — to check for hidden jams.",
      "Pull stuck paper out slowly and straight to avoid tearing it inside the mechanism.",
      "Reload the tray so paper sits flush and isn't overfilled past the fill line.",
    ],
  },
  {
    icon: Settings2,
    title: "Poor Print Quality",
    summary: "Faded pages, streaks, blank sheets, or colors that look wrong.",
    steps: [
      "Check ink or toner levels and replace any cartridge that's critically low.",
      "Run the built-in \"Clean Printhead\" or \"Nozzle Check\" utility from the printer's software.",
      "Confirm the paper type selected in the driver settings matches what's actually loaded.",
      "Remove the cartridge and gently wipe the contacts with a dry, lint-free cloth.",
    ],
  },
  {
    icon: Cable,
    title: "Won't Connect via USB",
    summary: "The computer doesn't recognize the printer once it's plugged in.",
    steps: [
      "Plug directly into a USB port on the computer — avoid USB hubs, which can cause connection drops.",
      "Try a different USB cable; damaged cables are a common, overlooked cause.",
      "Install the driver software first, then connect the USB cable when the installer prompts you to.",
    ],
  },
  {
    icon: Volume2,
    title: "Slow or Stuck Print Jobs",
    summary: "Documents sit in the queue for a long time, or printing seems to have stalled entirely.",
    steps: [
      "Open the print queue and cancel any old or duplicate jobs blocking the line.",
      "Restart the print spooler service (Windows) or reset the printing system (macOS).",
      "Print a smaller test document first to confirm the printer responds normally.",
      "For large files, try exporting to PDF before printing — some print drivers handle PDFs more efficiently than native app files.",
    ],
  },
];

export default function Diagnose() {
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);

  return (
    <>
      <Seo
        title={`Diagnose Printer Problems — Offline, Jams & More | ${SITE.name}`}
        description="Step-by-step fixes for the most common printer problems: offline errors, paper jams, poor print quality, USB connection issues, and stuck print jobs."
        canonicalPath="/diagnose"
      />

      <section className="page-hero">
        <div className="page-hero-orb" />
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="eyebrow">Diagnose</span>
            <h1 className="page-title">Diagnose Printer Issues</h1>
            <p className="page-sub">Find a quick, reliable fix for the most common printing problems below.</p>
          </motion.div>
        </div>
      </section>

      {/* <section className="section">
        <div className="container">
          <Reveal>
            <h2 className="section-heading">Select Your Printer Brand</h2>
            <p className="section-sub-sm">Jump to official drivers and support for your specific brand.</p>
          </Reveal>
          <div className="brand-select-grid">
            {BRANDS.map((b, i) => (
              <Reveal key={b.slug} delay={i * 0.06}>
                <button
                  className={"brand-select-btn" + (selectedBrand === b.slug ? " active" : "")}
                  onClick={() => setSelectedBrand(selectedBrand === b.slug ? null : b.slug)}
                >
                  <img
                    src={b.logoUrl} alt={b.name}
                    className="brand-select-logo"
                    onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }}
                  />
                  <span className="brand-fallback-name" style={{display:'none'}}>{b.name}</span>
                  <span className="brand-select-label">{b.name}</span>
                </button>
              </Reveal>
            ))}
          </div>
          

          <AnimatePresence>
            {selectedBrand && (() => {
              const brand = BRANDS.find((b) => b.slug === selectedBrand);
              return (
                <motion.div
                  className="brand-result-card"
                  initial={{ opacity: 0, y: -12, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -12, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="brand-result-inner">
                    <div>
                      <h3>Official {brand?.name} Drivers &amp; Support</h3>
                      <p>Find official drivers and setup software for <strong>{brand?.name}</strong> printers directly from the manufacturer.</p>
                    </div>
                    <a href={brand?.driverUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                      Go to Official Driver Page <ExternalLink size={15} />
                    </a>
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </div>
      </section> */}

      <section className="section issues-section">
        <div className="container">
          <Reveal>
            <h2 className="section-heading">Common Printer Issues</h2>
            <p className="section-sub-sm">Expand a problem below for step-by-step troubleshooting guidance.</p>
          </Reveal>
          <div className="issue-list">
            {ISSUES.map((issue, i) => {
              const isOpen = openIndex === i;
              return (
                <Reveal key={issue.title} delay={i * 0.06}>
                  <div className="issue-card" data-open={isOpen}>
                    <button className="issue-header" onClick={() => setOpenIndex(isOpen ? null : i)} aria-expanded={isOpen}>
                      <span className="issue-icon"><issue.icon size={20} /></span>
                      <span className="issue-header-text">
                        <span className="issue-title">{issue.title}</span>
                        <span className="issue-summary">{issue.summary}</span>
                      </span>
                      <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.22 }} className="issue-chevron">
                        <ChevronDown size={20} />
                      </motion.span>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="issue-body"
                        >
                          <ul className="issue-steps">
                            {issue.steps.map((step, idx) => (
                              <li key={idx}>
                                <span className="issue-step-num">{idx + 1}</span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal>
            <div className="still-stuck">
              <div className="still-stuck-icon"><RefreshCcw size={22} /></div>
              <div>
                <h3>Still having trouble?</h3>
                <p>Our support team is here to help you get your printer sorted out.</p>
              </div>
              <a href="/support" className="btn btn-primary">Contact Support <ArrowRight size={15} /></a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
