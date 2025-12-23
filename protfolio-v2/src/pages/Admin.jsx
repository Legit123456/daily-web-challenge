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

  const [projects, setProjects] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null); // Track if we are editing (null = add mode)

  // 1. Fetch Projects
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

  // 2. Handle Submit (Smart Logic: Add vs Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const techArray = form.tech.split(",").map((item) => item.trim());
    const payload = { ...form, tech: techArray };

    try {
      if (editId) {
        // --- UPDATE MODE (PUT) ---
        await toast.promise(
          axios.put(`http://localhost:5000/api/projects/${editId}`, payload),
          {
            pending: 'Updating project...',
            success: 'Project updated successfully! 🔄',
            error: 'Failed to update project. 😢'
          }
        );
      } else {
        // --- ADD MODE (POST) ---
        await toast.promise(
          axios.post("http://localhost:5000/api/projects", payload),
          {
            pending: 'Saving project...',
            success: 'Project added successfully! 🚀',
            error: 'Failed to add project. 😢'
          }
        );
      }
      
      // Reset everything
      setForm({ title: "", description: "", tech: "", github: "", link: "" });
      setEditId(null); // Exit edit mode
      fetchProjects(); // Refresh list
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 3. Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await axios.delete(`http://localhost:5000/api/projects/${id}`);
        toast.success("Project deleted! 🗑️");
        fetchProjects();
      } catch (error) {
        toast.error("Failed to delete project.");
      }
    }
  };

  // 4. Handle Edit Click (Populate Form)
  const handleEdit = (project) => {
    setForm({
      title: project.title,
      description: project.description,
      tech: project.tech.join(", "), // Convert array back to string
      github: project.github,
      link: project.link,
    });
    setEditId(project._id); // Enable Edit Mode
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to form
  };

  // 5. Cancel Edit
  const handleCancelEdit = () => {
    setForm({ title: "", description: "", tech: "", github: "", link: "" });
    setEditId(null);
  };

  const inputClass = "w-full p-3 rounded-lg bg-[var(--surface-glass)] border border-[var(--glass-border)] text-[var(--text-main)] focus:outline-none focus:border-[var(--brand-green)] transition-colors";

  return (
    <div className="px-4 py-10 max-w-4xl mx-auto">
      
      <RevealOnScroll className="glass mb-10">
        <h2 className="text-3xl font-bold mb-6 text-(--text-main) text-center">
          {editId ? "Edit Project ✏️" : "Admin Dashboard 🛠️"}
        </h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm text-(--text-muted) mb-1">Project Title</label>
                <input type="text" name="title" value={form.title} onChange={handleChange} required className={inputClass} placeholder="Project Name" />
            </div>
            <div>
                <label className="block text-sm text-(--text-muted) mb-1">Tech Stack</label>
                <input type="text" name="tech" value={form.tech} onChange={handleChange} className={inputClass} placeholder="React, Node..." />
            </div>
          </div>
          
          <div>
            <label className="block text-sm text-(--text-muted) mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} required rows="3" className={inputClass} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-(--text-muted) mb-1">GitHub URL</label>
              <input type="url" name="github" value={form.github} onChange={handleChange} required className={inputClass} />
            </div>
            <div>
              <label className="block text-sm text-(--text-muted) mb-1">Live Demo URL</label>
              <input type="url" name="link" value={form.link} onChange={handleChange} className={inputClass} />
            </div>
          </div>
          
          <div className="flex gap-4 mt-2">
            <button type="submit" disabled={loading} className="flex-1 py-3 rounded-lg bg-(--brand-green) text-(--brand-dark) font-bold hover:opacity-90 transition-opacity">
              {loading ? "Processing..." : editId ? "Update Project 🔄" : "Add Project 🚀"}
            </button>
            
            {editId && (
              <button 
                type="button" 
                onClick={handleCancelEdit}
                className="px-6 py-3 rounded-lg bg-gray-500/20 text-gray-300 font-bold hover:bg-gray-500/40 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </RevealOnScroll>

      {/* PROJECT LIST */}
      <RevealOnScroll className="glass">
        <h3 className="text-2xl font-bold mb-6 text-(--text-main)">Manage Projects</h3>
        <div className="flex flex-col gap-4">
          {projects.map((project) => (
            <div key={project._id} className="flex flex-col md:flex-row justify-between items-center p-4 bg-(--surface-glass) rounded-lg border border-(--glass-border)">
              <div className="mb-4 md:mb-0 max-w-lg">
                <h4 className="text-lg font-bold text-(--text-main)">{project.title}</h4>
                <p className="text-sm text-(--text-muted) line-clamp-1">{project.description}</p>
              </div>
              <div className="flex gap-2">
                {/* EDIT BUTTON */}
                <button 
                  onClick={() => handleEdit(project)}
                  className="px-4 py-2 bg-yellow-500/20 text-yellow-500 border border-yellow-500/50 rounded hover:bg-yellow-500 hover:text-black transition-colors cursor-pointer font-bold"
                >
                  Edit ✏️
                </button>
                {/* DELETE BUTTON */}
                <button 
                  onClick={() => handleDelete(project._id)}
                  className="px-4 py-2 bg-red-500/20 text-red-500 border border-red-500/50 rounded hover:bg-red-500 hover:text-white transition-colors cursor-pointer font-bold"
                >
                  Delete 🗑️
                </button>
              </div>
            </div>
          ))}
          {projects.length === 0 && <p className="text-(--text-muted) text-center">No projects found.</p>}
        </div>
      </RevealOnScroll>
    </div>
  );
};

export default Admin;