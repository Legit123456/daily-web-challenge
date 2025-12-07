import React, { useEffect } from "react";
import Header from "./components/Header";
import About from "./components/About";
import Skills from "./components/Skills";
import Social from "./components/Social";
import Contact from "./components/Contact";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import { loadTheme, applyTheme } from "./components/utils/theme"; // Import your util
import "./index.css"; 

function App() {
  
  // Apply theme on initial load
  useEffect(() => {
    const savedTheme = loadTheme();
    applyTheme(savedTheme);
  }, []);

  return (
    <div className="page">
      <div className="bg-shape shape-1" aria-hidden="true"></div>
      <div className="bg-shape shape-2" aria-hidden="true"></div>
      <div className="bg-shape shape-3" aria-hidden="true"></div>

      <Header />

      {/* FIX: Using the .container class we restored in CSS */}
      <main className="container main pb-10">
        <section className="glass reveal visible">
          <p id="status-text" className="status-text text-[var(--brand-green)] font-bold">
            Day 19: Glassmorphic Portfolio
          </p>
        </section>

        <About />
        <Skills />
        <Social />
        <Contact />
        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}

export default App;