import mongoose from 'mongoose';

const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true }, // URL friendly ID
  content: { type: String, required: true }, // This will store Markdown
  category: { type: String, required: true },
  image: { type: String }, // Cover image
  readTime: { type: String }, // e.g. "5 min read"
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;