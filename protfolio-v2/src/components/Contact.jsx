import React from "react";
import RevealOnScroll from "./RevealOnScroll";

const Contact = () => {
  // Using variables for input background and text
  const inputClass = "w-full p-3 rounded-lg bg-[var(--surface-glass)] border border-[var(--glass-border)] text-[var(--text-main)] focus:outline-none focus:border-[var(--brand-green)] focus:ring-1 focus:ring-[var(--brand-green)] transition-all mt-2 mb-4 placeholder-gray-500";
  const labelClass = "block text-[var(--text-muted)] font-semibold text-sm";

  return (
    <RevealOnScroll className="glass mt-6 mb-10">
      <h2 className="text-2xl font-bold mb-6 text-[var(--text-main)]">Send a Message</h2>
      <form id="contact-form">
        <div><label htmlFor="name" className={labelClass}>Name</label><input type="text" id="name" required className={inputClass} placeholder="Your Name" /></div>
        <div><label htmlFor="email" className={labelClass}>Email</label><input type="email" id="email" required className={inputClass} placeholder="your@email.com" /></div>
        <div><label htmlFor="message" className={labelClass}>Message</label><textarea id="message" rows="5" required className={inputClass} placeholder="How can I help you?"></textarea></div>
        <button id="send-btn" type="submit" className="w-full py-4 mt-2 rounded-xl font-bold text-black bg-gradient-to-r from-[var(--brand-green)] to-green-600 hover:scale-[1.02] hover:shadow-lg transition-all transform">Send Message</button>
      </form>
    </RevealOnScroll>
  );
};

export default Contact;