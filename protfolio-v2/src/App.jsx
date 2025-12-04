import React from "react";
import Header from "./components/Header";
import About from "./components/About";
import Skills from "./components/Skills";
import Social from "./components/Social";
import Contact from "./components/Contact";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import "./index.css"; // ensure this points to the CSS you edited earlier (Tailwind theme tokens)

function App() {
  return (
    <div className="page">
      <div className="bg-shape shape-1" aria-hidden="true"></div>
      <div className="bg-shape shape-2" aria-hidden="true"></div>
      <div className="bg-shape shape-3" aria-hidden="true"></div>

      <Header />

      <main className="container main">
        <section className="glass reveal visible">
          <p id="status-text" className="status-text">Day 19: Glassmorphic Portfolio</p>
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
