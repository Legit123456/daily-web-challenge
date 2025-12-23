import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import RevealOnScroll from "../components/RevealOnScroll";

const Admin = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    tech: "",
    github: "",
    link: "",
  });

  const [projects, setProjects] = useState([]); // Store list of projects
  const [loading, setLoading] = useState(false);

  // 1. Fetch Projects on Load
  const fetchProjects = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/projects");
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const techArray = form.tech.split(",").map((item) => item.trim());
    const payload = { ...form, tech: techArray };

    try {
      await toast.promise(
        axios.post("http://localhost:5000/api/projects", payload),
        {
          pending: 'Saving project...',
          success: 'Project added successfully! 🚀',
          error: 'Failed to add project. 😢'
        }
      );
      
      setForm({ title: "", description: "", tech: "", github: "", link: "" });
      fetchProjects(); // Refresh the list after adding
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle Delete Function
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await axios.delete(`http://localhost:5000/api/projects/${id}`);
        toast.success("Project deleted! 🗑️");
        fetchProjects(); // Refresh the list immediately
      } catch (error) {
        toast.error("Failed to delete project.");
      }
    }
  };

  const inputClass = "w-full p-3 rounded-lg bg-[var(--surface-glass)] border border-[var(--glass-border)] text-[var(--text-main)] focus:outline-none focus:border-[var(--brand-green)] transition-colors";

  return (
    <div className="px-4 py-10 max-w-4xl mx-auto">
      {/* SECTION 1: ADD FORM */}
      <RevealOnScroll className="glass mb-10">
        <h2 className="text-3xl font-bold mb-6 text-[var(--text-main)] text-center">
          Admin Dashboard 🛠️
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm text-[var(--text-muted)] mb-1">Project Title</label>
                <input type="text" name="title" value={form.title} onChange={handleChange} required className={inputClass} placeholder="Project Name" />
            </div>
            <div>
                <label className="block text-sm text-[var(--text-muted)] mb-1">Tech Stack</label>
                <input type="text" name="tech" value={form.tech} onChange={handleChange} className={inputClass} placeholder="React, Node..." />
            </div>
          </div>
          
          <div>
            <label className="block text-sm text-[var(--text-muted)] mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} required rows="3" className={inputClass} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[var(--text-muted)] mb-1">GitHub URL</label>
              <input type="url" name="github" value={form.github} onChange={handleChange} required className={inputClass} />
            </div>
            <div>
              <label className="block text-sm text-[var(--text-muted)] mb-1">Live Demo URL</label>
              <input type="url" name="link" value={form.link} onChange={handleChange} className={inputClass} />
            </div>
          </div>
          <button type="submit" disabled={loading} className="mt-2 py-3 rounded-lg bg-[var(--brand-green)] text-[var(--brand-dark)] font-bold hover:opacity-90 transition-opacity">
            {loading ? "Uploading..." : "Add Project 🚀"}
          </button>
        </form>
      </RevealOnScroll>

      {/* SECTION 2: MANAGE PROJECTS */}
      <RevealOnScroll className="glass">
        <h3 className="text-2xl font-bold mb-6 text-[var(--text-main)]">Manage Projects</h3>
        <div className="flex flex-col gap-4">
          {projects.map((project) => (
            <div key={project._id} className="flex flex-col md:flex-row justify-between items-center p-4 bg-[var(--surface-glass)] rounded-lg border border-[var(--glass-border)]">
              <div className="mb-4 md:mb-0">
                <h4 className="text-lg font-bold text-[var(--text-main)]">{project.title}</h4>
                <p className="text-sm text-[var(--text-muted)] line-clamp-1">{project.description}</p>
              </div>
              <div className="flex gap-2">
                 {/* Delete Button */}
                <button 
                  onClick={() => handleDelete(project._id)}
                  className="px-4 py-2 bg-red-500/20 text-red-500 border border-red-500/50 rounded hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                >
                  Delete 🗑️
                </button>
              </div>
            </div>
          ))}
          {projects.length === 0 && <p className="text-[var(--text-muted)] text-center">No projects found.</p>}
        </div>
      </RevealOnScroll>
    </div>
  );
};

export default Admin;