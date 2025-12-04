import React from "react";

const Social = () => {
  // wrapper class uses your 'social-btn' utility defined in index.css
  return (
    <section className="glass reveal visible p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4 text-white">Connect</h2>

      <div className="flex gap-4 flex-wrap items-center">
        <a aria-label="GitHub" href="https://github.com/Legit123456" target="_blank" rel="noreferrer"
           className="social-btn">
          {/* GitHub SVG */}
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M12 .5A12 12 0 0 0 0 12.7a12.3 12.3 0 0 0 8.2 11.7c.6.1.8-.3.8-.6v-2c-3.3.8-4-1.7-4-1.7-.6-1.5-1.4-2-1.4-2-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 .2 2-.7 2-.7-1.8-.2-3.7-1-3.7-4.3 0-1 .3-1.8 1-2.6-.1-.2-.5-1.3.1-2.7 0 0 .8-.2 2.6 1a9 9 0 0 1 5 0c1.8-1.2 2.6-1 2.6-1 .6 1.4.2 2.5.1 2.7.7.8 1 1.6 1 2.6 0 3.3-1.9 4.1-3.7 4.3 1 .8 1.9 2.4 1.9 4.9v3.2c0 .3.3.7.8.6a12.3 12.3 0 0 0 8.2-11.7A12 12 0 0 0 12 .5z"/></svg>
        </a>

        <a aria-label="LinkedIn" href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-btn">
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M4.98 3.5c0 1.38-1.1 2.5-2.48 2.5S0 4.88 0 3.5 1.1 1 2.5 1s2.48 1.12 2.48 2.5zM.46 8h4v12h-4V8zm7.12 0h3.83v1.72h.05c.53-1 1.84-2.05 3.79-2.05 4.05 0 4.8 2.67 4.8 6.13V20h-4v-5.37c0-1.28-.02-2.93-1.78-2.93-1.78 0-2.05 1.39-2.05 2.84V20h-4V8z"/></svg>
        </a>

        <a aria-label="X" href="https://x.com/_InfiniteDomain" target="_blank" rel="noreferrer" className="social-btn">
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M18.2 1H21l-6.5 7.4L22 23h-7.4l-5.2-8-6 8H1l7.1-9.6L1 1h7.5l4.7 7 5-7z"/></svg>
        </a>

        <a aria-label="Facebook" href="https://www.facebook.com/profile.php?id=61553258863799" target="_blank" rel="noreferrer" className="social-btn">
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2v-3h2V9.5a3.5 3.5 0 0 1 3.8-3.8h2.8v3h-2c-.9 0-1.2.4-1.2 1.1V12h3.2l-.5 3h-2.7v7A10 10 0 0 0 22 12"/></svg>
        </a>

        <a aria-label="Instagram" href="https://www.instagram.com/_infinite_domain_/" target="_blank" rel="noreferrer" className="social-btn">
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M12 2.2c3.2 0 3.6 0 4.9.1a5.4 5.4 0 0 1 5 5c.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9a5.4 5.4 0 0 1-5 5c-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1a5.4 5.4 0 0 1-5-5c-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9a5.4 5.4 0 0 1 5-5c1.3-.1 1.7-.1 4.9-.1m0-2.2c-3.3 0-3.7 0-5 .1A7.6 7.6 0 0 0 .1 7.2c-.1 1.3-.1 1.7-.1 4.9s0 3.6.1 4.9a7.6 7.6 0 0 0 6.9 6.9c1.3.1 1.7.1 5 .1s3.7 0 5-.1a7.6 7.6 0 0 0 6.9-6.9c.1-1.3.1-1.7.1-4.9s0-3.6-.1-4.9a7.6 7.6 0 0 0-6.9-6.9C15.7 0 15.3 0 12 0Z"/><circle cx="12" cy="12" r="3.2"/><circle cx="17.5" cy="6.5" r="1.4"/></svg>
        </a>
      </div>
    </section>
  );
};

export default Social;
