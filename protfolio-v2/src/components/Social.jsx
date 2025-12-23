import React from "react";
import { SOCIALS } from "../data"; // Import Data

const Social = () => {
  return (
    <section className="glass reveal visible p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4 text-(--text-main)">Connect</h2>

      <div className="flex gap-4 flex-wrap items-center">
        {/* THE LOOP: Clean, Readable, Maintainable */}
        {SOCIALS.map((social) => (
          <a
            key={social.id}
            aria-label={social.name}
            href={social.url}
            target="_blank"
            rel="noreferrer"
            className="social-btn"
          >
            {/* We render the SVG path dynamically */}
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
              <path d={social.path} />
            </svg>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Social;