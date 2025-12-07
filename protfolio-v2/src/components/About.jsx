import React from "react";
import RevealOnScroll from "./RevealOnScroll";

const About = () => {
  return (
    <RevealOnScroll className="glass mt-6">
      <h2 className="text-2xl font-bold mb-4 text-[var(--text-main)]">About</h2>
      <p className="text-[var(--text-main)] leading-relaxed text-lg opacity-90">
        <strong className="block mb-2 font-bold">Full Stack Developer & Project Manager.</strong>
        I build scalable web applications and manage the lifecycle from concept to deployment.
        I focus on readable code, solid UX, and delivering business value.
      </p>
    </RevealOnScroll>
  );
};

export default About;