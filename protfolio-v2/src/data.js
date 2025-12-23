// src/data.js

export const PROFILE = {
  name: "Umar Mukhtar Ahmad",
  role: "Full Stack Developer & Project Manager",
  bio: "I build scalable web applications and manage the lifecycle from concept to deployment. I focus on readable code, solid UX, and delivering business value.",
  email: "umartimi678@gmail.com", 
  avatar: "/Profile.jpg"
};

export const SKILLS = [
  "HTML", "CSS", "JavaScript", 
  "React", "Node.js", "TailwindCSS", 
  "Express", "MongoDB", "Git", "GitHub"
];

export const HOBBIES = [
  "Coding", "Project Mgmt", "Fitness", 
  "Gaming", "Reading", "Watching Anime"
];

// --- NEW PROJECTS DATA ---
export const PROJECTS = [
  {
    id: 1,
    title: "Forever E-commerce",
    description: "A full-stack e-commerce platform built with the MERN stack. Features secure payments, user authentication, and a dynamic product catalog.",
    tech: ["React", "Vite", "Tailwind", "Node.js", "Express", "MongoDB", "Axios"],
    link: "#", // Add live link if you have one
    github: "https://github.com/Legit123456" 
  },
  {
    id: 2,
    title: "Glassmorphic Portfolio",
    description: "The official version 2.0 of my personal portfolio. Built with React, Tailwind CSS, and a custom glassmorphism design system.",
    tech: ["React", "Tailwind", "Vite"],
    link: "#",
    github: "https://github.com/Legit123456"
  },
  {
    id: 3,
    title: "CBT Practice App (Upcoming)",
    description: "A JAMB/WAEC practice platform for students. Features a timer, score tracking, and subject selection.",
    tech: ["React", "Vite", "Tailwind", "Node.js", "Express", "MongoDB", "Axios"],
    link: "#",
    github: "#"
  },
  {
    id: 4,
    title: "Anime Blog (Upcoming)",
    description: "A content platform for anime enthusiasts. Will feature reviews, character analysis, and community discussions.",
    tech: ["MERN Stack", "React", "MongoDB"],
    link: "#",
    github: "#"
  }
];

export const SOCIALS = [
  {
    id: 1,
    name: "GitHub",
    url: "https://github.com/Legit123456",
    // We can keep the SVG path string here to render it dynamically!
    path: "M12 .5A12 12 0 0 0 0 12.7a12.3 12.3 0 0 0 8.2 11.7c.6.1.8-.3.8-.6v-2c-3.3.8-4-1.7-4-1.7-.6-1.5-1.4-2-1.4-2-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 .2 2-.7 2-.7-1.8-.2-3.7-1-3.7-4.3 0-1 .3-1.8 1-2.6-.1-.2-.5-1.3.1-2.7 0 0 .8-.2 2.6 1a9 9 0 0 1 5 0c1.8-1.2 2.6-1 2.6-1 .6 1.4.2 2.5.1 2.7.7.8 1 1.6 1 2.6 0 3.3-1.9 4.1-3.7 4.3 1 .8 1.9 2.4 1.9 4.9v3.2c0 .3.3.7.8.6a12.3 12.3 0 0 0 8.2-11.7A12 12 0 0 0 12 .5z"
  },
  {
    id: 2,
    name: "LinkedIn",
    url: "https://linkedin.com",
    path: "M4.98 3.5c0 1.38-1.1 2.5-2.48 2.5S0 4.88 0 3.5 1.1 1 2.5 1s2.48 1.12 2.48 2.5zM.46 8h4v12h-4V8zm7.12 0h3.83v1.72h.05c.53-1 1.84-2.05 3.79-2.05 4.05 0 4.8 2.67 4.8 6.13V20h-4v-5.37c0-1.28-.02-2.93-1.78-2.93-1.78 0-2.05 1.39-2.05 2.84V20h-4V8z"
  },
  {
    id: 3,
    name: "X",
    url: "https://x.com/_InfiniteDomain",
    path: "M18.2 1H21l-6.5 7.4L22 23h-7.4l-5.2-8-6 8H1l7.1-9.6L1 1h7.5l4.7 7 5-7z"
  },
  {
    id: 4,
    name: "Facebook",
    url: "https://www.facebook.com/profile.php?id=61553258863799",
    path: "M22 12a10 10 0 1 0-11.6 9.9v-7h-2v-3h2V9.5a3.5 3.5 0 0 1 3.8-3.8h2.8v3h-2c-.9 0-1.2.4-1.2 1.1V12h3.2l-.5 3h-2.7v7A10 10 0 0 0 22 12"
  },
  {
    id: 5,
    name: "Instagram",
    url: "https://www.instagram.com/_infinite_domain_/",
    path: "M12 2.2c3.2 0 3.6 0 4.9.1a5.4 5.4 0 0 1 5 5c.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9a5.4 5.4 0 0 1-5 5c-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1a5.4 5.4 0 0 1-5-5c-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9a5.4 5.4 0 0 1 5-5c1.3-.1 1.7-.1 4.9-.1m0-2.2c-3.3 0-3.7 0-5 .1A7.6 7.6 0 0 0 .1 7.2c-.1 1.3-.1 1.7-.1 4.9s0 3.6.1 4.9a7.6 7.6 0 0 0 6.9 6.9c1.3.1 1.7.1 5 .1s3.7 0 5-.1a7.6 7.6 0 0 0 6.9-6.9c.1-1.3.1-1.7.1-4.9s0-3.6-.1-4.9a7.6 7.6 0 0 0-6.9-6.9C15.7 0 15.3 0 12 0Z"
  },
  {
    id: 6,
    name: "WhatsApp",
    url: "https://wa.me/2348183318313", 
    path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.231-.298.347-.497.116-.198.058-.372-.029-.545-.087-.174-.793-1.911-1.087-2.618-.29-.693-.578-.601-.793-.607-.206-.007-.446-.007-.694-.007-.248 0-.651.094-.992.466-.34.372-1.296 1.266-1.296 3.09 0 1.824 1.328 3.587 1.513 3.835.185.248 2.613 3.991 6.331 5.596 2.451 1.058 3.398 1.058 3.998.988.665-.078 1.758-.718 2.006-1.412.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
  },
];