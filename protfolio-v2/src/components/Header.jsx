import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadTheme, applyTheme, saveTheme } from "./utils/theme";
import { PROFILE } from "../data";

// Small helper component for mobile menu button and dropdown
const MobileMenuButton = ({ cycleTheme, theme }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        aria-expanded={open}
        aria-label="Open menu"
        onClick={() => setOpen((o) => !o)}
        className="p-2 rounded-md border border-(--glass-border) text-(--text-main) hover:bg-(--surface-glass) transition-colors"
      >
        {open ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {open && (
        <div className="relative left-0 top-full mt-2 w-64 glass border border-(--glass-border) rounded-lg shadow-lg z-100000 py-2">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-(--text-main) hover:bg-[var(--surface-glass)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-(--brand-green)"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l9-9 9 9v8a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-5H9v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8z"
              />
            </svg>
            <span>Home</span>
          </Link>

          <Link
            to="/projects"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-(--text-main) hover:bg-[var(--surface-glass)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-(--brand-green)"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7M3 7l9-4 9 4"
              />
            </svg>
            <span>Projects</span>
          </Link>

          <Link
            to="/blog"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-(--text-main) hover:bg-[var(--surface-glass)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-(--brand-green)"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 8h10M7 12h8m-8 4h6"
              />
            </svg>
            <span>Blog</span>
          </Link>

          <button
            onClick={() => {
              cycleTheme();
              setOpen(false);
            }}
            className="flex items-center gap-3 w-full text-left px-4 py-3 text-(--text-main) hover:bg-[var(--surface-glass)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-(--brand-green)"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 3v1M12 20v1M4.2 4.2l.7.7M18.1 18.1l.7.7M1 12h1M22 12h1M4.2 19.8l.7-.7M18.1 5.9l.7-.7M12 5a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"
              />
            </svg>
            <span>
              {theme === "light"
                ? "☀️ Light"
                : theme === "amoled"
                ? "⚫ AMOLED"
                : "🌙 Dark"}
            </span>
          </button>

          <a
            href="/Umar_Mukhtar_Ahmad_CV.pdf"
            download
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-(--brand-green) font-bold hover:bg-[rgba(0,255,150,0.04)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-(--brand-green)"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 3v12m0 0l-4-4m4 4l4-4M21 21H3"
              />
            </svg>
            <span>Download CV</span>
          </a>
        </div>
      )}
    </div>
  );
};

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
    <header className="container site-header glass reveal visible flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mt-0 rounded-t-none! relative">
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
      <nav className="header-actions reveal visible">
        {/* Desktop menu */}
        <div className="hidden md:flex w-full md:w-auto justify-end md:justify-start items-center gap-3">
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
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <MobileMenuButton cycleTheme={cycleTheme} theme={theme} />
        </div>

        {/* Mobile dropdown (rendered by MobileMenuButton via portal-like placement) */}
      </nav>
    </header>
  );
};

export default Header;
