import React, { useEffect, useState } from "react";
import { loadTheme, applyTheme, saveTheme } from "./utils/theme";

const Header = () => {
  const [theme, setTheme] = useState(loadTheme());

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  function cycleTheme() {
    const next = theme === "light" ? "dark" : theme === "dark" ? "amoled" : "light";
    setTheme(next);
    saveTheme(next);
  }

  return (
    <header className="site-header container glass reveal visible mx-auto p-6 flex flex-col md:flex-row justify-between items-center gap-6">
      {/* Brand */}
      <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
        {/* Profile image restored */}
        <img
          src="/Profile.jpg"
          alt="Profile"
          className="avatar w-24 h-24 rounded-full object-cover border-4 border-[rgba(26,255,0,0.31)] shadow-[0_0_20px_rgba(0,255,100,0.15)]"
        />

        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-white reveal visible">Umar Mukhtar Ahmad</h1>

          <p className="text-[rgba(0,255,150,0.6)] font-medium reveal visible">
            Full Stack Developer &amp; Project Manager
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 reveal visible">
        <button
          id="theme-toggle"
          onClick={cycleTheme}
          aria-label="Toggle theme"
          className="px-4 py-2 rounded-lg border border-white/10 text-white hover:bg-white/5 transition-colors cursor-pointer"
        >
          {theme === "light" ? "☀️ Light" : theme === "amoled" ? "⚫ AMOLED" : "🌙 Dark"}
        </button>

        <a
          className="px-4 py-2 rounded-lg border-2 border-[var(--brand-green)] text-[var(--brand-green)] font-bold hover:bg-[rgba(0,255,150,0.06)] transition-colors no-underline"
          href="/Umar_Mukhtar_Ahmad_CV.pdf"
          download
        >
          Download CV
        </a>
      </div>
    </header>
  );
};

export default Header;
