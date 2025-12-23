import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // To redirect after login
import RevealOnScroll from "../components/RevealOnScroll";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Send Credentials to Backend
      const { data } = await axios.post("http://localhost:5000/api/users/login", form);

      // 2. Save the "Badge" (Token) to LocalStorage
      localStorage.setItem("userInfo", JSON.stringify(data));

      // 3. Success & Redirect
      toast.success("Welcome back, Genius! 🧠");
      navigate("/admin");
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full p-3 rounded-lg bg-[var(--surface-glass)] border border-[var(--glass-border)] text-[var(--text-main)] focus:outline-none focus:border-[var(--brand-green)] transition-colors";

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <RevealOnScroll className="glass w-full max-w-md p-8">
        <h2 className="text-3xl font-bold mb-6 text-(--text-main) text-center">
          Admin Login 🔐
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-(--text-muted) mb-1">Email</label>
            <input 
              type="email" 
              name="email" 
              value={form.email} 
              onChange={handleChange} 
              required 
              className={inputClass} 
              placeholder="admin@example.com" 
            />
          </div>

          <div>
            <label className="block text-sm text-(--text-muted) mb-1">Password</label>
            <input 
              type="password" 
              name="password" 
              value={form.password} 
              onChange={handleChange} 
              required 
              className={inputClass} 
              placeholder="••••••••" 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="mt-4 py-3 rounded-lg bg-(--brand-green) text-(--brand-dark) font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Checking ID..." : "Login 🚀"}
          </button>
        </form>
      </RevealOnScroll>
    </div>
  );
};

export default Login;