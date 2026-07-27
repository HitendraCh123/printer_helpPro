import { useEffect } from "react";

/**
 * Lightweight per-route SEO tag manager — no external dependency needed.
 * Sets the document title and meta description on mount, and restores
 * the site default on unmount so route changes never leak stale tags.
 */
export default function Seo({ title, description, canonicalPath = "/", jsonLd = null }) {
  useEffect(() => {
    const prevTitle = document.title;
    if (title) document.title = title;

    let descTag = document.querySelector('meta[name="description"]');
    const prevDescription = descTag ? descTag.getAttribute("content") : null;
    if (description) {
      if (!descTag) {
        descTag = document.createElement("meta");
        descTag.setAttribute("name", "description");
        document.head.appendChild(descTag);
      }
      descTag.setAttribute("content", description);
    }

    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalTag);
    }
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    canonicalTag.setAttribute("href", `${origin}${canonicalPath}`);

    let ldScript = null;
    if (jsonLd) {
      ldScript = document.createElement("script");
      ldScript.type = "application/ld+json";
      ldScript.text = JSON.stringify(jsonLd);
      document.head.appendChild(ldScript);
    }

    return () => {
      document.title = prevTitle;
      if (descTag && prevDescription !== null) descTag.setAttribute("content", prevDescription);
      if (ldScript) document.head.removeChild(ldScript);
    };
  }, [title, description, canonicalPath, jsonLd]);

  return null;
}
