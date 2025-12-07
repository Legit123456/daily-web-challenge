import React from "react";
import RevealOnScroll from "./RevealOnScroll";

const Skills = () => {
  // Updated Pill to use variables for border and bg
  const Pill = ({ children }) => (
    <li className="px-4 py-2 rounded-full bg-[var(--surface-glass)] border border-[var(--glass-border)] text-[var(--text-main)] font-medium text-sm hover:bg-[var(--glass-border)] transition-colors cursor-default">
      {children}
    </li>
  );

  return (
    <>
      <RevealOnScroll className="glass mt-6">
        <h2 className="text-2xl font-bold mb-4 text-[var(--text-main)]">Skills</h2>
        <ul className="flex flex-wrap gap-3 list-none p-0 m-0">
          <Pill>HTML</Pill><Pill>CSS</Pill><Pill>JavaScript</Pill>
          <Pill>React</Pill><Pill>Node.js</Pill><Pill>TailwindCSS</Pill>
          <Pill>Express</Pill><Pill>MongoDB</Pill><Pill>Git</Pill>
        </ul>
      </RevealOnScroll>

      <RevealOnScroll className="glass mt-6">
        <h2 className="text-2xl font-bold mb-4 text-[var(--text-main)]">Hobbies</h2>
        <ul className="flex flex-wrap gap-3 list-none p-0 m-0">
          <Pill>Coding</Pill><Pill>Project Mgmt</Pill><Pill>Fitness</Pill>
          <Pill>Gaming</Pill><Pill>Reading</Pill><Pill>Anime</Pill>
        </ul>
      </RevealOnScroll>
    </>
  );
};

export default Skills;