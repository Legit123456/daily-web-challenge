import React from "react";
import RevealOnScroll from "./RevealOnScroll";
import { SKILLS, HOBBIES } from "../data"; // Import the data

const Skills = () => {
  
  const Pill = ({ children }) => (
    <li className="px-4 py-2 rounded-full bg-(--surface-glass) border border-(--glass-border) text-(--text-main) font-medium text-sm hover:bg-(--glass-border) transition-colors cursor-default">
      {children}
    </li>
  );

  return (
    <>
      <RevealOnScroll className="glass mt-6">
        <h2 className="text-2xl font-bold mb-4 text-(--text-main)">Skills</h2>
        <ul className="flex flex-wrap gap-3 list-none p-0 m-0">
          {/* THE LOGIC: Loop through the SKILLS array */}
          {SKILLS.map((skill, index) => (
            <Pill key={index}>{skill}</Pill>
          ))}
        </ul>
      </RevealOnScroll>

      <RevealOnScroll className="glass mt-6">
        <h2 className="text-2xl font-bold mb-4 text-(--text-main)">Hobbies</h2>
        <ul className="flex flex-wrap gap-3 list-none p-0 m-0">
          {/* THE LOGIC: Loop through the HOBBIES array */}
          {HOBBIES.map((hobby, index) => (
             <Pill key={index}>{hobby}</Pill>
          ))}
        </ul>
      </RevealOnScroll>
    </>
  );
};

export default Skills;