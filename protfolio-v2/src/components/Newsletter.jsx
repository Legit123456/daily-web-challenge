import React from "react";

const Newsletter = () => {
  return (
    <section className="glass reveal visible p-6 mt-6 mb-6">
      <h2 className="text-2xl font-bold mb-2 text-[var(--text-main)]">Newsletter</h2>
      <p className="text-[var(--text-main)] mb-6">Short, practical updates on my projects and learnings.</p>

      <form id="newsletter-form" className="flex flex-col md:flex-row gap-4">
        <input
          id="newsletter-email"
          type="email"
          placeholder="Your email"
          required
          className="w-full p-3 rounded-lg bg-[var(--surface-glass)] border border-[var(--glass-border)] text-[var(--text-main)] focus:outline-none focus:border-[var(--brand-green)] focus:ring-1 focus:ring-[var(--brand-green)] transition-all"
        />
        <button
          id="subscribe-btn"
          className="px-6 py-3 rounded-lg font-bold text-black bg-gradient-to-r from-[var(--brand-green)] to-green-600 hover:scale-105 transition-transform"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
};

export default Newsletter;
