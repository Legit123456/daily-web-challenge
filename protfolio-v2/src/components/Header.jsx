import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadTheme, applyTheme, saveTheme } from "./utils/theme";
import { PROFILE } from "../data";

const Header = () => {
  // Initialize theme state from your util
  const [theme, setTheme] = useState(loadTheme());

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  function cycleTheme() {
    const next =
      theme === "light" ? "dark" : theme === "dark" ? "amoled" : "light";
    setTheme(next);
    saveTheme(next);
  }

  return (
    // FIX: Using 'items-start' on mobile to match original left-align
    <header className="container site-header glass reveal visible flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mt-0 rounded-t-none!">
      {/* Brand Section */}
      <Link to="/" className="flex flex-row items-center gap-3.5 no-underline">
        <img
          src={PROFILE.avatar}
          alt="Profile"
          className="avatar w-[84px] h-[84px] md:w-24 md:h-24 rounded-full object-cover border-[3px] border-(--brand-green)/50 shadow-[0_0_20px_rgba(0,255,100,0.15)]"
        />

        <div className="flex flex-col">
          <h1 className="text-xl md:text-2xl font-bold text-(--text-main) reveal visible">
            {PROFILE.name}
          </h1>
          <p className="text-(--text-main) text-sm md:text-base font-medium reveal visible mt-0.5">
            {PROFILE.role}
          </p>
        </div>
      </Link>

      {/* Actions Section */}
      {/* FIX: w-full and justify-between on mobile to match original */}
      <nav className="header-actions flex w-full md:w-auto justify-end md:justify-start items-center gap-3 reveal visible">
        <Link
          to="/"
          className="text-(--text-main) font-bold hover:text-(--brand-green) transition-colors border border-(--glass-border) rounded px-3 py-2"
        >
          Home
        </Link>

        <Link
          to="/projects"
          className="text-(--text-main) font-medium hover:text-(--brand-green) transition-colors border border-(--glass-border) rounded px-3 py-2"
        >
          Projects
        </Link>

        <Link
          to="/blog"
          className="text-(--text-main) font-medium hover:text-(--brand-green) transition-colors border border-(--glass-border) rounded px-3 py-2"
        >
          Blog
        </Link>

        <button
          id="theme-toggle"
          onClick={cycleTheme}
          className="px-3 py-2 text-sm md:text-base rounded-lg border border-(--glass-border) text-(--text-main) hover:bg-(--surface-glass) transition-colors cursor-pointer"
        >
          {theme === "light"
            ? "☀️ Light"
            : theme === "amoled"
            ? "⚫ AMOLED"
            : "🌙 Dark"}
        </button>

        <a
          className="px-3 py-2 text-sm md:text-base rounded-lg border-2 border-(--brand-green) text-(--brand-green) font-bold hover:bg-[rgba(0,255,150,0.06)] transition-colors no-underline"
          href="/Umar_Mukhtar_Ahmad_CV.pdf"
          download
        >
          Download CV
        </a>
      </nav>
    </header>
  );
};

export default Header;
