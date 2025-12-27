import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../config'; // Ensure this path is correct for your file structure

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API_BASE_URL}/api/subscribe`, { email });
      toast.success("Welcome to the community! 📧");
      setEmail(""); // Clear input
    } catch (error) {
      // Check if it's a "Duplicate" error from backend
      const msg = error.response?.data?.message || "Subscription failed. 😢";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass p-10 mt-10 mb-10 text-center max-w-2xl mx-auto">
      <h3 className="text-3xl font-bold mb-4 text-[var(--text-main)]">
        Join the <span className="text-[var(--brand-green)]">Inner Circle</span>
      </h3>
      <p className="text-[var(--text-muted)] mb-8">
        Get exclusive updates on my latest projects, tech articles, and coding resources. No spam, ever.
      </p>

      <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center">
        <input 
          type="email" 
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com" 
          className="p-4 rounded-xl bg-[var(--surface-glass)] border border-[var(--glass-border)] text-[var(--text-main)] focus:outline-none focus:border-[var(--brand-green)] w-full sm:w-2/3 transition-colors"
        />
        <button 
          type="submit" 
          disabled={loading}
          className="px-8 py-4 rounded-xl font-bold text-black bg-[var(--brand-green)] hover:bg-green-500 hover:shadow-[0_0_20px_rgba(0,255,153,0.3)] transition-all transform hover:-translate-y-1 disabled:opacity-50"
        >
          {loading ? "Joining..." : "Subscribe"}
        </button>
      </form>
    </div>
  );
};

export default Subscribe;