import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tech: [
      {
        type: String, // This creates an array of strings ["React", "Node"]
      },
    ],
    link: {
      type: String,
      default: '#', // Default value if no link is provided
    },
    github: {
      type: String,
      required: true,
    },
    image: {
      type: String, // We will just store the URL path string here later
      default: '/default-project.jpg',
    },
  },
  {
    timestamps: true, // Automatically adds 'createdAt' and 'updatedAt'
  }
);

const Project = mongoose.model('Project', projectSchema);

export default Project;