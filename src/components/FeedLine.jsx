import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import "../assets/css/FeedLine.css";

/**
 * A horizontal dashed line with 1-3 "roller" nodes — visually echoes the
 * path paper travels through a printer. Used as a section divider whose
 * dash animates in on scroll. nodeCount controls how many roller dots
 * appear along the path.
 */
export default function FeedLine({ nodeCount = 1 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const nodes = Array.from({ length: nodeCount }, (_, i) => {
    const pct = nodeCount === 1 ? 50 : (i / (nodeCount - 1)) * 100;
    return pct;
  });

  return (
    <div className="feed-line-wrap" ref={ref}>
      <svg className="feed-line" viewBox="0 0 100 2" preserveAspectRatio="none" aria-hidden="true">
        <motion.path
          d="M0,1 L100,1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: inView ? 1 : 0 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        />
      </svg>
      <div className="feed-line-nodes">
        {nodes.map((pct, i) => (
          <motion.span
            key={i}
            className="feed-node"
            style={{ left: `${pct}%` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: inView ? 1 : 0, opacity: inView ? 1 : 0 }}
            transition={{ delay: 0.4 + i * 0.15, duration: 0.3, ease: "backOut" }}
          />
        ))}
      </div>
    </div>
  );
}

