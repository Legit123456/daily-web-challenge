import React from "react";
import RevealOnScroll from "./RevealOnScroll";
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../config';

const Contact = () => {
  // Using variables for input background and text
  const inputClass = "w-full p-3 rounded-lg bg-[var(--surface-glass)] border border-[var(--glass-border)] text-[var(--text-main)] focus:outline-none focus:border-[var(--brand-green)] focus:ring-1 focus:ring-[var(--brand-green)] transition-all mt-2 mb-4 placeholder-gray-500";
  const labelClass = "block text-[var(--text-muted)] font-semibold text-sm";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await axios.post(`${API_BASE_URL}/api/messages`, formData);
      toast.success("Message sent! I'll get back to you soon. 🚀");
      setFormData({ name: "", email: "", message: "" }); // Clear form
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message. Try again later. 😢");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <RevealOnScroll className="glass mt-6 mb-10">
      <h2 className="text-2xl font-bold mb-6 text-(--text-main)">Send a Message</h2>
      <form onSubmit={handleSubmit} id="contact-form">
        <div><label htmlFor="name" className={labelClass}>Name</label><input onChange={handleChange} type="text" name="name" id="name" value={formData.name} required className={inputClass} placeholder="Your Name" /></div>
        <div><label htmlFor="email" className={labelClass}>Email</label><input onChange={handleChange} name="email" value={formData.email} type="email" id="email" required className={inputClass} placeholder="your@email.com" /></div>
        <div><label htmlFor="message" className={labelClass}>Message</label><textarea onChange={handleChange} name="message" id="message" value={formData.message} rows="5" required className={inputClass} placeholder="How can I help you?"></textarea></div>
        <button id="send-btn" type="submit" disabled={isSubmitting} className="w-full py-4 mt-2 rounded-xl font-bold text-black bg-gradient-to-r from-(--brand-green)] to-green-600 hover:scale-[1.02] hover:shadow-lg transition-all transform">{isSubmitting ? "Sending..." : "Send Message"}</button>
      </form>
    </RevealOnScroll>
  );
};

export default Contact;