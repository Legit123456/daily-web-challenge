import React from "react";
import RevealOnScroll from "./RevealOnScroll";
import { PROFILE } from "../data"; // Import

const About = () => {
  return (
    <RevealOnScroll className="glass mt-6">
      <h2 className="text-2xl font-bold mb-4 text-(--text-main)">About</h2>
      <p className="text-(--text-main) leading-relaxed text-lg opacity-90">
        <strong className="block mb-2 font-bold">{PROFILE.role}</strong>
        {PROFILE.bio}
      </p>
    </RevealOnScroll>
  );
};

export default About;