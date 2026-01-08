import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../config";
import axios from "axios";
import { toast } from "react-toastify";
import RevealOnScroll from "../components/RevealOnScroll";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import MarkdownToolbar from '../components/MarkdownToolbar';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("projects");

  // Helper to insert markdown at cursor position
  const handleFormatInsert = (formatString) => {
    const textarea = document.getElementById('blog-content-area');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = blogForm.content;
    const before = text.substring(0, start);
    const after = text.substring(end, text.length);

    const newText = before + formatString + after;
    setBlogForm({ ...blogForm, content: newText });

    setTimeout(() => textarea.focus(), 0);
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

  const [stats, setStats] = useState({
    totalVisits: 0,
    recentVisits: [],
    deviceStats: [],
  });
  const [projects, setProjects] = useState([]);
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    tech: "",
    github: "",
    link: "",
  });
  const [projectImage, setProjectImage] = useState(null);
  const [projectPreview, setProjectPreview] = useState("");
  const [editProjectId, setEditProjectId] = useState(null);

  const [blogs, setBlogs] = useState([]);
  const [blogForm, setBlogForm] = useState({
    title: "",
    content: "",
    category: "Tech",
    readTime: "5 min",
  });
  const [blogImage, setBlogImage] = useState(null);
  const [blogPreview, setBlogPreview] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const authConfig = {
          headers: { Authorization: `Bearer ${userInfo?.token}` },
        };

        const statsRes = await axios.get(`${API_BASE_URL}/api/users/analytics`, authConfig);
        setStats(statsRes.data);

        // Fix: Removed incorrect 2nd argument from axios.get
        const projRes = await axios.get(`${API_BASE_URL}/api/projects`, authConfig);
        setProjects(projRes.data);

        const blogRes = await axios.get(`${API_BASE_URL}/api/blogs`);
        setBlogs(blogRes.data);
      } catch (error) {
        console.error("Error loading admin data", error);
        if (error.response?.status === 401) handleLogout();
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    toast.success("Logged out");
    navigate("/login");
  };

  const handleFileChange = (e, setFile, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    Object.keys(projectForm).forEach((key) => formData.append(key, projectForm[key]));
    if (projectImage) formData.append("image", projectImage);

    try {
      const url = editProjectId
        ? `${API_BASE_URL}/api/projects/${editProjectId}`
        : `${API_BASE_URL}/api/projects`;
      const method = editProjectId ? axios.put : axios.post;
      
      await toast.promise(method(url, formData, getAuthHeaders()), {
        pending: "Saving Project...",
        success: "Project Saved!",
        error: "Error saving project",
      });

      setProjectForm({ title: "", description: "", tech: "", github: "", link: "" });
      setProjectImage(null);
      setProjectPreview("");
      setEditProjectId(null);

      const { data } = await axios.get(`${API_BASE_URL}/api/projects`, getAuthHeaders());
      setProjects(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleProjectDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/projects/${id}`, getAuthHeaders());
      setProjects(projects.filter((p) => p._id !== id));
      toast.success("Project deleted");
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    Object.keys(blogForm).forEach((key) => formData.append(key, blogForm[key]));
    if (blogImage) formData.append("image", blogImage);

    try {
      await toast.promise(
        axios.post(`${API_BASE_URL}/api/blogs`, formData, getAuthHeaders()),
        {
          pending: "Publishing Article...",
          success: "Article Published! ✍️",
          error: "Error publishing",
        }
      );
      setBlogForm({ title: "", content: "", category: "Tech", readTime: "5 min" });
      setBlogImage(null);
      setBlogPreview("");

      const { data } = await axios.get(`${API_BASE_URL}/api/blogs`);
      setBlogs(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleBlogDelete = async (id) => {
    if (!window.confirm("Delete this article?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/blogs/${id}`, getAuthHeaders());
      setBlogs(blogs.filter((b) => b._id !== id));
      toast.success("Article deleted");
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  const inputClass = "w-full p-3 rounded-lg bg-[var(--surface-glass)] border border-[var(--glass-border)] text-[var(--text-main)] focus:outline-none focus:border-[var(--brand-green)] transition-colors mb-4";
  const tabClass = (tab) => `flex-1 py-3 text-center cursor-pointer transition-all font-bold ${activeTab === tab ? "bg-[var(--brand-green)] text-black" : "text-[var(--text-muted)] hover:bg-[var(--surface-glass)]"}`;

  return (
    <div className="px-4 py-10 max-w-6xl mx-auto min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-[var(--text-main)]">Admin Console</h2>
        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-bold transition-colors">
          Logout
        </button>
      </div>

      {/* STATS OVERVIEW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="p-6 bg-[var(--surface-glass)] rounded-lg border border-[var(--glass-border)] text-center">
          <h3 className="text-[var(--text-muted)] text-sm uppercase">Total Visits</h3>
          <p className="text-4xl font-bold text-[var(--brand-green)]">{stats.totalVisits}</p>
        </div>
        <div className="p-6 bg-[var(--surface-glass)] rounded-lg border border-[var(--glass-border)]">
          <h3 className="text-[var(--text-muted)] text-sm uppercase mb-2">Device Stats</h3>
          {stats.deviceStats.map((s) => (
            <div key={s._id} className="flex justify-between text-sm">
              <span className="text-[var(--text-main)]">{s._id}</span>
              <span className="text-[var(--brand-green)]">{s.count}</span>
            </div>
          ))}
        </div>
        <div className="p-6 bg-[var(--surface-glass)] rounded-lg border border-[var(--glass-border)]">
          <h3 className="text-[var(--text-muted)] text-sm uppercase mb-2">Recent Visits</h3>
          {stats.recentVisits.map((v, i) => (
            <div key={i} className="text-xs text-[var(--text-muted)] border-b border-gray-700 py-1 last:border-0">
              {v.browser} - {new Date(v.timestamp).toLocaleTimeString()}
            </div>
          ))}
        </div>
      </div>

      {/* TABS */}
      <div className="flex mb-8 border border-[var(--glass-border)] rounded-lg overflow-hidden">
        <div onClick={() => setActiveTab("projects")} className={tabClass("projects")}>Project Manager</div>
        <div onClick={() => setActiveTab("blogs")} className={tabClass("blogs")}>Blog Writer</div>
      </div>

      {/* CONTENT AREA */}
      <RevealOnScroll className="glass p-6">
        {activeTab === "projects" ? (
          <div>
            <form onSubmit={handleProjectSubmit} className="mb-8 p-4 bg-white/5 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold mb-4 text-[var(--text-main)]">{editProjectId ? "Edit Project" : "Add New Project"}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input placeholder="Title" value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} className={inputClass} required />
                <input placeholder="Tech Stack" value={projectForm.tech} onChange={(e) => setProjectForm({ ...projectForm, tech: e.target.value })} className={inputClass} />
              </div>
              <textarea placeholder="Description" value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} className={inputClass} rows="3" required />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input placeholder="GitHub URL" value={projectForm.github} onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })} className={inputClass} />
                <input placeholder="Live Link" value={projectForm.link} onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })} className={inputClass} />
              </div>
              <div className="flex items-center gap-4 mb-4">
                <input type="file" onChange={(e) => handleFileChange(e, setProjectImage, setProjectPreview)} className="text-[var(--text-muted)] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[var(--brand-green)] file:text-black hover:file:bg-green-400" />
                {projectPreview && <img src={projectPreview} alt="Preview" className="h-16 w-16 object-cover rounded-lg border border-white/20" />}
              </div>
              <button type="submit" disabled={loading} className="w-full bg-[var(--brand-green)] py-3 rounded font-bold text-black hover:scale-[1.02] transition-transform">
                {loading ? "Saving..." : "Save Project"}
              </button>
            </form>

            <h3 className="text-xl font-bold mb-4 text-[var(--text-main)]">Existing Projects</h3>
            <div className="space-y-4">
              {projects.map((p) => (
                <div key={p._id} className="flex justify-between items-center p-4 bg-[var(--surface-glass)] rounded-xl border border-[var(--glass-border)] hover:border-[var(--brand-green)] transition-all">
                  <div className="flex items-center gap-4 overflow-hidden">
                    {/* THUMBNAIL IMAGE */}
                    <div className="flex-shrink-0 w-16 h-16 bg-gray-800 rounded-lg overflow-hidden">
                        {p.image ? (
                            <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">No Img</div>
                        )}
                    </div>
                    {/* DETAILS */}
                    <div className="min-w-0">
                        <h4 className="font-bold text-[var(--text-main)] truncate">{p.title}</h4>
                        <p className="text-xs text-[var(--text-muted)] line-clamp-1">{p.description}</p>
                        <div className="text-xs text-[var(--brand-green)] mt-1 font-mono">{p.tech}</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 flex-shrink-0 ml-4">
                    <button onClick={() => { setProjectForm(p); setProjectPreview(p.image); setEditProjectId(p._id); window.scrollTo(0, 0); }} className="text-yellow-400 hover:text-yellow-300 font-bold text-sm">Edit</button>
                    <button onClick={() => handleProjectDelete(p._id)} className="text-red-500 hover:text-red-400 font-bold text-sm">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <form onSubmit={handleBlogSubmit} className="mb-8 p-4 bg-white/5 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold mb-4 text-[var(--text-main)]">Write New Article</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input placeholder="Article Title" value={blogForm.title} onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })} className={inputClass} required />
                <div className="flex gap-2">
                  <input placeholder="Category" value={blogForm.category} onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })} className={inputClass} />
                  <input placeholder="Read Time" value={blogForm.readTime} onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })} className={inputClass} />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
                {/* Left Column: Editor */}
                <div className="flex flex-col h-[400px]">
                    <label className="block text-[var(--text-muted)] text-sm mb-2">Content</label>
                    <MarkdownToolbar insertText={handleFormatInsert} />
                    <textarea 
                        id="blog-content-area"
                        placeholder="Write your masterpiece..." 
                        value={blogForm.content} 
                        onChange={e => setBlogForm({...blogForm, content: e.target.value})} 
                        className="w-full flex-grow p-4 bg-black/30 border border-[var(--glass-border)] border-t-0 rounded-b-lg font-mono text-sm text-gray-300 focus:outline-none resize-none"
                        required 
                    />
                </div>

                {/* Right Column: Live Preview */}
                <div className="flex flex-col h-[400px]">
                    <label className="block text-[var(--text-muted)] text-sm mb-2">Live Preview</label>
                    <div className="flex-grow overflow-y-auto p-6 bg-white rounded-lg text-black prose prose-sm max-w-none">
                        <ReactMarkdown>{blogForm.content || "*Preview will appear here...*"}</ReactMarkdown>
                    </div>
                </div>
               </div>

              <div className="flex items-center gap-4 mb-4">
                <input type="file" onChange={(e) => handleFileChange(e, setBlogImage, setBlogPreview)} className="text-[var(--text-muted)] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[var(--brand-green)] file:text-black hover:file:bg-green-400" />
                {blogPreview && <img src={blogPreview} alt="Preview" className="h-16 w-16 object-cover rounded-lg border border-white/20" />}
              </div>
              <button type="submit" disabled={loading} className="w-full bg-[var(--brand-green)] py-3 rounded font-bold text-black hover:scale-[1.02] transition-transform">
                {loading ? "Publish Article" : "Publish Article"}
              </button>
            </form>

            <h3 className="text-xl font-bold mb-4 text-[var(--text-main)]">Published Articles</h3>
            <div className="space-y-4">
              {blogs.map((b) => (
                <div key={b._id} className="flex justify-between items-center p-4 bg-[var(--surface-glass)] rounded-xl border border-[var(--glass-border)] hover:border-[var(--brand-green)] transition-all">
                  <div className="flex items-center gap-4 overflow-hidden">
                     {/* THUMBNAIL IMAGE */}
                     <div className="flex-shrink-0 w-16 h-16 bg-gray-800 rounded-lg overflow-hidden">
                        {b.image ? (
                            <img src={b.image} alt={b.title} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-2xl text-gray-600 font-bold">{b.title[0]}</div>
                        )}
                    </div>
                    {/* DETAILS */}
                    <div className="min-w-0">
                        <h4 className="font-bold text-[var(--text-main)] truncate">{b.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-[var(--brand-green)] font-mono mt-1">
                            <span className="bg-green-900/30 px-2 py-0.5 rounded">{b.category}</span>
                            <span>{b.readTime}</span>
                        </div>
                    </div>
                  </div>
                  <button onClick={() => handleBlogDelete(b._id)} className="text-red-500 hover:text-red-400 font-bold text-sm ml-4">Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </RevealOnScroll>
    </div>
  );
};

export default AdminPanel;