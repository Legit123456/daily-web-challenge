import React from 'react';
import { Link } from 'react-router-dom'; // <--- Import Link
import RevealOnScroll from './RevealOnScroll';
import { PROFILE } from '../data';

const Hero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center text-center py-20 min-h-[60vh]">
      <RevealOnScroll>
        <div className="z-10">
          <h2 className="text-[var(--text-muted)] text-xl font-mono mb-4 tracking-wide">
            Hello, World. I am
          </h2>
          <h1 className="text-5xl md:text-7xl font-extrabold text-[var(--text-main)] mb-6 tracking-tight">
            {PROFILE.name}
          </h1>
          <p className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            {PROFILE.role} with a passion for building <span className="text-[var(--brand-green)]">scalable</span> solutions.
          </p>
          
          <div className="flex gap-4 justify-center mt-8">
            {/* FIX: Use standard Link component with the "Big Button" styles */}
            <Link 
              to="/projects" 
              className="px-8 py-3 rounded-xl bg-[var(--brand-green)] text-black font-bold hover:shadow-[0_0_20px_rgba(0,255,153,0.4)] transition-all transform hover:-translate-y-1"
            >
              View Work
            </Link>
            
            {/* Scroll link to Contact section (Keep as <a> because it uses an ID #) */}
            <a 
              href="#contact" 
              className="px-8 py-3 rounded-xl border border-[var(--glass-border)] text-[var(--text-main)] hover:bg-[var(--surface-glass)] transition-all"
            >
              Contact Me
            </a>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};

export default Hero;