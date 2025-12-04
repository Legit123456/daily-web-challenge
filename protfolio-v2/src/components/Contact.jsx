import React from "react";

const Contact = () => {
  const inputClass = "w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[var(--brand-green)] focus:ring-1 focus:ring-[var(--brand-green)] transition-all mt-2 mb-4";
  const labelClass = "block text-gray-400 font-semibold text-sm";

  return (
    <section className="glass reveal visible p-6 mt-6 mb-10">
      <h2 className="text-2xl font-bold mb-6 text-white">Send a Message</h2>

      <form id="contact-form">
        <div>
          <label htmlFor="name" className={labelClass}>Name</label>
          <input type="text" id="name" required className={inputClass} placeholder="Your Name" />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>Email</label>
          <input type="email" id="email" required className={inputClass} placeholder="your@email.com" />
        </div>

        <div>
          <label htmlFor="message" className={labelClass}>Message</label>
          <textarea id="message" rows="5" required className={inputClass} placeholder="How can I help you?"></textarea>
        </div>

        <button
          id="send-btn"
          type="submit"
          className="w-full py-4 mt-2 rounded-xl font-bold text-black bg-gradient-to-r from-[var(--brand-green)] to-[var(--brand-green-dark)] hover:scale-[1.02] hover:shadow-lg transition-all transform"
        >
          Send Message
        </button>
      </form>
    </section>
  );
};

export default Contact;
