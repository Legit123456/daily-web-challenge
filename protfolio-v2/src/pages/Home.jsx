import React from "react";
import About from "../components/About";
import Skills from "../components/Skills";
import Social from "../components/Social";
import Contact from "../components/Contact";
import Newsletter from "../components/Newsletter";
import RevealOnScroll from "../components/RevealOnScroll";

const Home = () => {
  return (
    <>
      <section className="glass reveal visible">
        <p className="status-text text-(--brand-green) font-bold">
          Day 20: Demo Deployment
        </p>
      </section>
      
      <About />
      <Skills />
      {/* We will add a button here to link to projects later */}
      <Social />
      <Contact />
      <Newsletter />
    </>
  );
};

export default Home;