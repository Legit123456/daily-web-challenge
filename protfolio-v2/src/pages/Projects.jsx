import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import RevealOnScroll from "../components/RevealOnScroll";

// Project Card Component
const ProjectCard = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Adjusted threshold to 100 characters for testing
  const isLongDescription = project.description.length > 100; 

  return (
    <RevealOnScroll className="glass p-6! hover:translate-y-[-5px] transition-transform duration-300 flex flex-col h-full">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-(--brand-green)">
          {project.title}
        </h3>
      </div>
      
      <div className="mb-4">
        {/* We use the custom CSS class 'line-clamp-3' here */}
        <p className={`text-(--text-main) text-sm leading-relaxed opacity-90 ${!isExpanded ? 'line-clamp-3' : ''}`}>
          {project.description}
        </p>
        
        {isLongDescription && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-(--brand-green) text-xs font-bold mt-2 hover:underline cursor-pointer focus:outline-none"
          >
            {isExpanded ? "Show Less" : "Read More"}
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.map((tech, index) => (
          <span 
            key={index} 
            className="px-2 py-1 text-xs rounded-md bg-(--surface-glass) border border-(--glass-border) text-(--text-muted)"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4 mt-auto">
        <a href={project.github} target="_blank" rel="noreferrer" className="text-sm font-bold text-(--text-main) hover:text-(--brand-green) transition-colors flex items-center gap-1">
           View Code ↗
        </a>
        {project.link !== "#" && (
          <a href={project.link} target="_blank" rel="noreferrer" className="text-sm font-bold text-(--text-main) hover:text-(--brand-green) transition-colors">
            Live Demo ↗
          </a>
        )}
      </div>
    </RevealOnScroll>
  );
};

// Main Projects Page
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/projects");
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="px-4">
      <RevealOnScroll className="mb-8">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-(--text-muted) hover:text-(--brand-green) transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </RevealOnScroll>

      <RevealOnScroll>
        <h2 className="text-3xl font-bold mb-6 text-(--text-main)">Featured Projects</h2>
      </RevealOnScroll>

      {loading ? (
        <div className="text-(--text-main) text-center py-10">Loading Projects...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;