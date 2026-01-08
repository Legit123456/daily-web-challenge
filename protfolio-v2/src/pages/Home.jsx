import React from "react";
import Hero from "../components/Hero"; // Import the new Hero
import About from "../components/About";
import Skills from "../components/Skills";
import Social from "../components/Social";
import Contact from "../components/Contact";
import Newsletter from "../components/Newsletter";

const Home = () => {
  return (
    <>
      {/* 1. Hero Section (Introduction) */}
      <Hero />

      {/* 2. Content Sections */}
      <div className="space-y-24 pb-20"> {/* Add spacing between huge sections */}
        <About />
        
        <div id="skills">
            <Skills />
        </div>

        {/* 3. Social Proof */}
        <Social />

        {/* 4. Action Area */}
        <div id="contact" className="grid md:grid-cols-2 gap-8 items-start">
            <Contact />
            <div className="sticky top-24"> {/* Make newsletter sticky on desktop */}
                <Newsletter />
            </div>
        </div>
      </div>
    </>
  );
};

export default Home;