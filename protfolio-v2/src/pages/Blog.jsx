import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import RevealOnScroll from '../components/RevealOnScroll';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/blogs`);
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen px-4 py-20 max-w-6xl mx-auto">
      <RevealOnScroll>
        <h2 className="text-4xl font-bold text-center mb-4 text-[var(--text-main)]">
          The <span className="text-[var(--brand-green)]">Dev Log</span>
        </h2>
        <p className="text-center text-[var(--text-muted)] mb-12 max-w-2xl mx-auto">
          Insights on coding, project management, and the journey of building software.
        </p>
      </RevealOnScroll>

      {loading ? (
        <div className="text-center text-[var(--brand-green)] animate-pulse">Loading Thoughts...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <RevealOnScroll key={blog._id} className="glass p-0 overflow-hidden hover:scale-[1.02] transition-transform">
              {/* Image Section */}
              <div className="h-48 overflow-hidden bg-gray-900">
                {blog.image ? (
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-700 font-mono text-4xl">
                    {/* Fallback pattern if no image */}
                    {blog.title[0]}
                  </div>
                )}
              </div>
              
              {/* Content Section */}
              <div className="p-6">
                <div className="flex justify-between items-center text-xs text-[var(--brand-green)] mb-3 font-mono">
                  <span>{blog.category}</span>
                  <span>{blog.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-[var(--text-main)] mb-3 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-[var(--text-muted)] text-sm line-clamp-3 mb-4">
                  {/* Strip markdown symbols for preview text */}
                  {blog.content.substring(0, 100).replace(/[#*_`]/g, '')}...
                </p>
                <Link 
                  to={`/blog/${blog.slug}`} 
                  className="inline-block text-sm font-bold text-[var(--text-main)] hover:text-[var(--brand-green)] transition-colors"
                >
                  Read Article →
                </Link>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      )}
      
      {!loading && blogs.length === 0 && (
        <p className="text-center text-[var(--text-muted)]">No articles published yet. Check back soon!</p>
      )}
    </div>
  );
};

export default Blog;