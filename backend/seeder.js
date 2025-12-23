import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './models/Project.js'; // Import the Model

dotenv.config();

// --- THE DATA ---
const projects = [
  {
    title: "Forever E-commerce",
    description: "A full-stack e-commerce platform built with the MERN stack. Features secure payments, user authentication, and a dynamic product catalog.",
    tech: ["React", "Vite", "Tailwind", "Node.js", "Express", "MongoDB", "Axios"],
    link: "#", 
    github: "https://github.com/Legit123456" 
  },
  {
    title: "Glassmorphic Portfolio",
    description: "The official version 2.0 of my personal portfolio. Built with React, Tailwind CSS, and a custom glassmorphism design system.",
    tech: ["React", "Tailwind", "Vite"],
    link: "https://portfolio-v2-murex-chi.vercel.app/",
    github: "https://github.com/Legit123456/portfolio-v2"
  },
  {
    title: "CBT Practice App",
    description: "A JAMB/WAEC practice platform for students. Features a timer, score tracking, and subject selection.",
    tech: ["JavaScript", "HTML/CSS", "Local Storage"],
    link: "#",
    github: "#"
  },
  {
    title: "Anime Blog (Upcoming)",
    description: "A content platform for anime enthusiasts. Will feature reviews, character analysis, and community discussions.",
    tech: ["MERN Stack", "React", "MongoDB"],
    link: "#",
    github: "#"
  }
];

// --- THE LOGIC ---
const importData = async () => {
  try {
    // 1. Connect to DB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🔌 MongoDB Connected for Seeding...');

    // 2. Wipe existing data (Prevent Duplicates)
    await Project.deleteMany();
    console.log('🧹 Old data cleared.');

    // 3. Insert new data
    await Project.insertMany(projects);
    console.log('✅ Data Imported Successfully!');

    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

importData();