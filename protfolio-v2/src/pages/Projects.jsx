import React from "react";
import RevealOnScroll from "../components/RevealOnScroll";
import { PROJECTS } from "../data";
import { Link } from "react-router-dom";

const Projects = () => {
  return (
    <div className="px-4">

      <RevealOnScroll className="mb-8">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--brand-green)] transition-colors"
        >
          {/* Simple Arrow SVG */}
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </RevealOnScroll>

      <RevealOnScroll>
        <h2 className="text-3xl font-bold mb-6 text-[var(--text-main)]">Featured Projects</h2>
      </RevealOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROJECTS.map((project) => (
          <RevealOnScroll key={project.id} className="glass !p-6 hover:translate-y-[-5px] transition-transform duration-300">
            <h3 className="text-xl font-bold text-[var(--brand-green)] mb-2">
              {project.title}
            </h3>
            
            <p className="text-[var(--text-main)] text-sm mb-4 leading-relaxed opacity-90">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech, index) => (
                <span 
                  key={index} 
                  className="px-2 py-1 text-xs rounded-md bg-[var(--surface-glass)] border border-[var(--glass-border)] text-[var(--text-muted)]"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 mt-auto">
              <a href={project.github} target="_blank" rel="noreferrer" className="text-sm font-bold text-[var(--text-main)] hover:text-[var(--brand-green)] transition-colors flex items-center gap-1">
                 View Code ↗
              </a>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
};

export default Projects;