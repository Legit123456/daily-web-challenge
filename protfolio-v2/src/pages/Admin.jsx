import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../config";
import axios from "axios";
import { toast } from "react-toastify";
import RevealOnScroll from "../components/RevealOnScroll";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [stats, setStats] = useState({ 
    totalVisits: 0, 
    recentVisits: [], 
    deviceStats: [] 
  });
  
  const [form, setForm] = useState({
    title: "",
    description: "",
    tech: "",
    github: "",
    link: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    toast.success("Logged out successfully 👋");
    navigate("/login");
  };

  const fetchStats = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/users/analytics`, getAuthHeaders());
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchProjects = async () => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/api/projects`, 
        getAuthHeaders() 
      );
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchStats();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const getAuthHeaders = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    return {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
        "Content-Type": "multipart/form-data",
      },
    };
  };

  // CLEANED SUBMIT LOGIC
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("tech", form.tech); // Backend will handle the .split(',')
    formData.append("github", form.github);
    formData.append("link", form.link);
    if (image) formData.append("image", image);

    try {
      if (editId) {
        await toast.promise(
          axios.put(`${API_BASE_URL}/api/projects/${editId}`, formData, getAuthHeaders()),
          {
            pending: 'Updating project...',
            success: 'Project updated successfully! 🔄',
            error: 'Failed to update project. 😢'
          }
        );
      } else {
        await toast.promise(
          axios.post(`${API_BASE_URL}/api/projects`, formData, getAuthHeaders()),
          {
            pending: 'Uploading project...',
            success: 'Project added successfully! 🚀',
            error: 'Failed to add project. 😢'
          }
        );
      }
      
      // Reset after success
      setForm({ title: "", description: "", tech: "", github: "", link: "" });
      setImage(null);
      setPreview("");
      setEditId(null);
      fetchProjects();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        await axios.delete(`${API_BASE_URL}/api/projects/${id}`, {
            headers: { Authorization: `Bearer ${userInfo?.token}` }
        });
        toast.success("Project deleted! 🗑️");
        fetchProjects();
      } catch (error) {
        toast.error("Failed to delete project.");
      }
    }
  };

  const handleEdit = (project) => {
    setForm({
      title: project.title,
      description: project.description,
      tech: project.tech.join(", "),
      github: project.github,
      link: project.link,
    });
    setPreview(project.image); // Show existing image as preview
    setEditId(project._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setForm({ title: "", description: "", tech: "", github: "", link: "" });
    setPreview("");
    setImage(null);
    setEditId(null);
  };

  const inputClass = "w-full p-3 rounded-lg bg-[var(--surface-glass)] border border-[var(--glass-border)] text-[var(--text-main)] focus:outline-none focus:border-[var(--brand-green)] transition-colors";

  return (
    <div className="px-4 py-10 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-(--text-main)">
          {editId ? "Edit Project ✏️" : "Admin Dashboard 🛠️"}
        </h2>
        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-bold transition-colors">
          Logout ✌️
        </button>
      </div>

      {/* --- ANALYTICS DASHBOARD --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        
        {/* Card 1: Total Traffic */}
        <div className="p-6 bg-(--surface-glass) rounded-lg border border-(--glass-border) flex flex-col items-center justify-center hover:scale-[1.02] transition-transform">
          <h3 className="text-(--text-muted) text-sm uppercase tracking-wider mb-2">Total Visits</h3>
          <p className="text-5xl font-bold text-(--brand-green)">{stats.totalVisits}</p>
          <p className="text-xs text-(--text-muted) mt-2">All-time unique page loads</p>
        </div>

        {/* Card 2: Device Intelligence */}
        <div className="p-6 bg-(--surface-glass) rounded-lg border border-(--glass-border)">
          <h3 className="text-(--text-muted) text-sm uppercase tracking-wider mb-4">Device Breakdown</h3>
          <div className="flex flex-col gap-3">
            {stats.deviceStats.map((stat) => (
              <div key={stat._id} className="flex items-center justify-between">
                <span className="text-(--text-main) font-bold">{stat._id || "Unknown"}</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-24 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-(--brand-green)" 
                      style={{ width: `${(stat.count / stats.totalVisits) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-(--text-muted)">{stat.count}</span>
                </div>
              </div>
            ))}
            {stats.deviceStats.length === 0 && <p className="text-sm text-(--text-muted) italic">No data yet</p>}
          </div>
        </div>

        {/* Card 3: Live Feed (Last 5) */}
        <div className="p-6 bg-(--surface-glass) rounded-lg border border-(--glass-border) overflow-hidden">
          <h3 className="text-(--text-muted) text-sm uppercase tracking-wider mb-4">Recent Spies</h3>
          <div className="flex flex-col gap-3 text-sm">
            {stats.recentVisits.map((visit, index) => (
              <div key={index} className="flex justify-between items-center border-b border-(--glass-border) pb-2 last:border-0">
                <div>
                  <span className="block text-(--text-main) font-bold">{visit.browser}</span>
                  <span className="text-xs text-(--text-muted)">{visit.os}</span>
                </div>
                <span className="text-xs text-(--brand-green)">
                  {new Date(visit.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </div>
            ))}
            {stats.recentVisits.length === 0 && <p className="text-sm text-(--text-muted) italic">No recent visits</p>}
          </div>
        </div>

      </div>
      
      <RevealOnScroll className="glass mb-10 p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="title" value={form.title} onChange={handleChange} required className={inputClass} placeholder="Project Title" />
            <input type="text" name="tech" value={form.tech} onChange={handleChange} className={inputClass} placeholder="Tech Stack (React, Node...)" />
          </div>
          
          <textarea name="description" value={form.description} onChange={handleChange} required rows="3" className={inputClass} placeholder="Description" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="url" name="github" value={form.github} onChange={handleChange} required className={inputClass} placeholder="GitHub URL" />
            <input type="url" name="link" value={form.link} onChange={handleChange} className={inputClass} placeholder="Live Demo URL" />
          </div>

          {/* IMAGE INPUT BELONGS HERE */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-(--text-muted)">Project Image</label>
            <input type="file" onChange={handleFileChange} className={inputClass} accept="image/*" />
            {preview && <img src={preview} alt="Preview" className="mt-2 w-48 h-32 object-cover rounded border border-(--brand-green)" />}
          </div>
          
          <div className="flex gap-4 mt-2">
            <button type="submit" disabled={loading} className="flex-1 py-3 rounded-lg bg-(--brand-green) text-(--brand-dark) font-bold hover:opacity-90 transition-opacity">
              {loading ? "Processing..." : editId ? "Update Project 🔄" : "Add Project 🚀"}
            </button>
            {editId && (
              <button type="button" onClick={handleCancelEdit} className="px-6 py-3 rounded-lg bg-gray-500/20 text-gray-300 font-bold hover:bg-gray-500/40">
                Cancel
              </button>
            )}
          </div>
        </form>
      </RevealOnScroll>

      <RevealOnScroll className="glass p-6">
        <h3 className="text-2xl font-bold mb-6 text-(--text-main)">Manage Projects</h3>
        <div className="flex flex-col gap-4">
          {projects.map((project) => (
            <div key={project._id} className="flex flex-col md:flex-row justify-between items-center p-4 bg-(--surface-glass) rounded-lg border border-(--glass-border)">
              <div className="flex items-center gap-4">
                {project.image && <img src={project.image} alt="" className="w-12 h-12 object-cover rounded" />}
                <div>
                    <h4 className="text-lg font-bold text-(--text-main)">{project.title}</h4>
                    <p className="text-sm text-(--text-muted) line-clamp-1">{project.description}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4 md:mt-0">
                <button onClick={() => handleEdit(project)} className="px-4 py-2 bg-yellow-500/20 text-yellow-500 border border-yellow-500/50 rounded hover:bg-yellow-500 hover:text-black">Edit</button>
                <button onClick={() => handleDelete(project._id)} className="px-4 py-2 bg-red-500/20 text-red-500 border border-red-500/50 rounded hover:bg-red-500 hover:text-white">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </RevealOnScroll>
    </div>
  );
};

export default Admin;