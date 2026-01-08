import React from "react";
import RevealOnScroll from "./RevealOnScroll";
import { PROFILE } from "../data";

const About = () => {
  return (
    <RevealOnScroll className="glass p-8 md:p-12 border-l-4 border-l-[var(--brand-green)]"> {/* Added styling */}
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1">
            <h2 className="text-3xl font-bold mb-6 text-[var(--text-main)] flex items-center gap-3">
                About Me 
                <span className="w-20 h-[2px] bg-[var(--glass-border)]"></span>
            </h2>
            <p className="text-[var(--text-secondary)] leading-loose text-lg">
                <span className="text-[var(--brand-green)] font-bold text-xl block mb-4">
                    {PROFILE.role}
                </span>
                {PROFILE.bio}
            </p>
        </div>
      </div>
    </RevealOnScroll>
  );
};

export default About;