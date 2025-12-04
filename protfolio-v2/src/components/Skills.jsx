import React from "react";

const Skills = () => {
  const Pill = ({ children }) => (
    <li className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[rgba(0,255,150,0.9)] font-medium text-sm hover:bg-white/10 transition-colors cursor-default">
      {children}
    </li>
  );

  return (
    <>
      <section className="glass reveal visible p-6 mt-6">
        <h2 className="text-2xl font-bold mb-4 text-white">Skills</h2>
        <ul className="flex flex-wrap gap-3 list-none p-0 m-0">
          <Pill>HTML</Pill>
          <Pill>CSS</Pill>
          <Pill>JavaScript</Pill>
          <Pill>React</Pill>
          <Pill>Node.js</Pill>
          <Pill>TailwindCSS</Pill>
          <Pill>Express</Pill>
          <Pill>MongoDB</Pill>
          <Pill>Git</Pill>
          <Pill>GitHub</Pill>
        </ul>
      </section>

      <section className="glass reveal visible p-6 mt-6">
        <h2 className="text-2xl font-bold mb-4 text-white">Hobbies</h2>
        <ul className="flex flex-wrap gap-3 list-none p-0 m-0">
          <Pill>Coding</Pill>
          <Pill>Project Mgmt</Pill>
          <Pill>Fitness</Pill>
          <Pill>Gaming</Pill>
          <Pill>Reading</Pill>
          <Pill>Anime</Pill>
        </ul>
      </section>
    </>
  );
};

export default Skills;
