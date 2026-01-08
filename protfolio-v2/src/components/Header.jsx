import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { loadTheme, applyTheme, saveTheme } from "../components/utils/theme"; // Adjusted path based on your structure
import { PROFILE } from "../data";

// Helper for Active Link Styling
const NavLink = ({ to, label, currentPath, onClick, className }) => {
  const isActive = currentPath === to;
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`${className} ${
        isActive 
          ? "text-[var(--brand-green)] bg-[rgba(0,255,153,0.1)] border-[var(--brand-green)]" 
          : "text-[var(--text-main)] hover:text-[var(--brand-green)] border-transparent"
      }`}
    >
      {label}
    </Link>
  );
};

const MobileMenuButton = ({ cycleTheme, theme, currentPath }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative md:hidden">
      <button
        aria-expanded={open}
        aria-label="Open menu"
        onClick={() => setOpen((o) => !o)}
        className="p-2 rounded-md border border-[var(--glass-border)] text-[var(--text-main)] hover:bg-[var(--surface-glass)] transition-colors"
      >
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        )}
      </button>

      {/* Mobile Dropdown - THICK GLASS & AMOLED FIX */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-[#0a0a0a]/95 backdrop-blur-xl border border-[var(--glass-border)] rounded-xl shadow-2xl p-2 flex flex-col gap-2 z-[100]">
          <NavLink 
            to="/" label="Home" currentPath={currentPath} onClick={() => setOpen(false)} 
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 border"
          />
          <NavLink 
            to="/projects" label="Projects" currentPath={currentPath} onClick={() => setOpen(false)} 
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 border"
          />
          <NavLink 
            to="/blog" label="Blog" currentPath={currentPath} onClick={() => setOpen(false)} 
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 border"
          />

          <div className="h-px bg-white/10 my-1"></div>

          <button
            onClick={() => { cycleTheme(); setOpen(false); }}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--text-main)] hover:bg-white/5 text-left"
          >
             {/* AMOLED Icon Fix */}
             <span className="flex items-center justify-center w-5 h-5">
                {theme === "light" && "☀️"}
                {theme === "dark" && "🌙"}
                {theme === "amoled" && (
                    <div className="w-4 h-4 bg-black border-2 border-[var(--text-main)] rounded-full"></div>
                )}
            </span>
            <span>
                {theme === "light" ? "Light Mode" : theme === "amoled" ? "AMOLED Mode" : "Dark Mode"}
            </span>
          </button>

          <a
            href="/Umar_Mukhtar_Ahmad_CV.pdf"
            download
            className="flex items-center gap-3 px-4 py-3 text-[var(--brand-green)] font-bold hover:bg-[rgba(0,255,150,0.04)]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v12m0 0l-4-4m4 4l4-4M21 21H3" /></svg>
            <span>Download CV</span>
          </a>
        </div>
      )}
    </div>
  );
};

const Header = () => {
  const [theme, setTheme] = useState(loadTheme());
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Scroll Listener to Trigger the Morph
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function cycleTheme() {
    const next = theme === "light" ? "dark" : theme === "dark" ? "amoled" : "light";
    setTheme(next);
    saveTheme(next);
  }

  return (
    // DYNAMIC HEADER CONTAINER
    <header 
        className={`z-50 transition-all duration-500 ease-in-out flex flex-row md:flex-row justify-between items-center ${
            isScrolled 
                ? "fixed top-0 left-4 right-4 max-w-7xl mx-auto glass rounded-2xl border border-[var(--glass-border)] shadow-2xl px-6 py-3 md:left-0 md:right-0" // Floating Pill State
                : "relative container mx-auto mt-0 px-6 py-6 glass border-b border-[var(--glass-border)] rounded-none md:rounded-b-xl" // Initial State (Like your original)
        }`}
    >
      
      {/* Brand Section */}
      <Link to="/" className="flex flex-row items-center gap-3.5 no-underline mr-auto md:mr-0">
        <div className="relative">
            <img
            src={PROFILE.avatar}
            alt="Profile"
            className={`rounded-full object-cover border-[3px] border-[var(--brand-green)]/50 shadow-[0_0_20px_rgba(0,255,100,0.15)] transition-all duration-300 ${
                isScrolled ? "w-13 h-13 md:w-14 md:h-14" : "w-[84px] h-[84px] md:w-24 md:h-24" // Shrink Avatar on scroll
            }`}
            />
        </div>

        <div className="flex flex-col">
          <h1 className={`font-bold text-[var(--text-main)] transition-all duration-300 ${
              isScrolled ? "text-lg md:text-xl" : "text-xl md:text-2xl"
          }`}>
            {PROFILE.name}
          </h1>
          <p className={`text-[var(--text-main)] font-medium transition-all duration-300 ${
              isScrolled ? "text-[10px] md:text-xs" : "text-sm md:text-base"
          }`}>
            {PROFILE.role}
          </p>
        </div>
      </Link>

      {/* Actions Section */}
      <nav className="header-actions flex items-end gap-4 mt-4 md:mt-0">
        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-3">
          <NavLink 
            to="/" label="Home" currentPath={location.pathname} 
            className="font-bold px-3 py-2 rounded border text-[var(--text-main)]"
          />
          <NavLink 
            to="/projects" label="Projects" currentPath={location.pathname} 
            className="font-medium px-3 py-2 rounded border text-[var(--text-main)]"
          />
          <NavLink 
            to="/blog" label="Blog" currentPath={location.pathname} 
            className="font-medium px-3 py-2 rounded border text-[var(--text-main)]"
          />

          <button
            id="theme-toggle"
            onClick={cycleTheme}
            className="px-3 py-2 text-sm md:text-base rounded-lg border border-[var(--glass-border)] text-[var(--text-main)] hover:bg-[var(--surface-glass)] transition-colors cursor-pointer flex items-center justify-center min-w-[40px]"
          >
            {theme === "light" && "☀️"}
            {theme === "dark" && "🌙"}
            {/* AMOLED Fix: Visible Circle */}
            {theme === "amoled" && (
                <div className="w-4 h-4 bg-black border-2 border-[var(--text-main)] text-[var(--text-main)] rounded-full"></div>
            )}
          </button>

          <a
            className="px-3 py-2 text-sm md:text-base rounded-lg border-2 border-[var(--brand-green)] text-[var(--brand-green)] font-bold hover:bg-[rgba(0,255,150,0.06)] transition-colors no-underline"
            href="/Umar_Mukhtar_Ahmad_CV.pdf"
            download
          >
            Download CV
          </a>
        </div>

        {/* Mobile menu button */}
        <MobileMenuButton cycleTheme={cycleTheme} theme={theme} currentPath={location.pathname} />
      </nav>
    </header>
  );
};

export default Header;