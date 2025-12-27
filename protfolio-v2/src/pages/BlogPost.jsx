import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import ReactMarkdown from 'react-markdown';

const BlogPost = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/blogs/${slug}`);
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog post", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-[var(--brand-green)]">Loading Article...</div>;
  if (!blog) return <div className="min-h-screen flex items-center justify-center text-red-500">Article not found.</div>;

  return (
    <div className="min-h-screen px-4 py-24 max-w-3xl mx-auto">
      <Link to="/blog" className="text-[var(--text-muted)] hover:text-[var(--brand-green)] mb-8 inline-block">
        ← Back to Library
      </Link>

      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-[var(--text-main)] mb-4 leading-tight">{blog.title}</h1>
        <div className="flex justify-center gap-4 text-sm text-[var(--text-muted)] font-mono">
          <span className="text-[var(--brand-green)]">{blog.category}</span>
          <span>•</span>
          <span>{blog.readTime}</span>
          <span>•</span>
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Hero Image */}
      {blog.image && (
        <img 
          src={blog.image} 
          alt={blog.title} 
          className="w-full h-64 md:h-96 object-cover rounded-xl mb-12 border border-[var(--glass-border)]"
        />
      )}

      {/* Markdown Content Renderer */}
      <article className="prose prose-invert prose-lg max-w-none text-[var(--text-secondary)]">
        {/* We use ReactMarkdown with custom components to style the output */}
        <ReactMarkdown
          components={{
            h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-[var(--text-main)] mt-8 mb-4" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-[var(--text-main)] mt-8 mb-4 border-b border-gray-700 pb-2" {...props} />,
            h3: ({node, ...props}) => <h3 className="text-xl font-bold text-[var(--text-main)] mt-6 mb-3" {...props} />,
            p: ({node, ...props}) => <p className="mb-6 leading-relaxed text-gray-300" {...props} />,
            ul: ({node, ...props}) => <ul className="list-disc list-inside mb-6 text-gray-300" {...props} />,
            ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-6 text-gray-300" {...props} />,
            li: ({node, ...props}) => <li className="mb-2" {...props} />,
            code: ({node, inline, className, children, ...props}) => {
                return inline ? (
                  <code className="bg-gray-800 text-[var(--brand-green)] px-1 py-0.5 rounded font-mono text-sm" {...props}>{children}</code>
                ) : (
                  <div className="bg-[#1a1a1a] p-4 rounded-lg overflow-x-auto mb-6 border border-gray-700">
                    <code className="font-mono text-sm text-gray-300" {...props}>{children}</code>
                  </div>
                );
            },
            blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-[var(--brand-green)] pl-4 italic text-gray-400 my-6" {...props} />,
            a: ({node, ...props}) => <a className="text-[var(--brand-green)] hover:underline" {...props} />
          }}
        >
          {blog.content}
        </ReactMarkdown>
      </article>
    </div>
  );
};

export default BlogPost;