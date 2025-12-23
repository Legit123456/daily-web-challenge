import React, { useEffect } from "react";
// 1. IMPORT ROUTER TOOLS
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";       // Import Page
import Projects from "./pages/Projects"; // Import Page
import { loadTheme, applyTheme } from "./components/utils/theme";
import { ToastContainer, toast } from 'react-toastify';
import "./index.css";
import Admin from "./pages/Admin";

function App() {
  useEffect(() => {
    applyTheme(loadTheme());
  }, []);

  return (
    // 2. WRAP EVERYTHING IN BROWSER ROUTER
    <BrowserRouter>
      <ToastContainer position="top-center" theme="dark" />
      <div className="page min-h-screen flex flex-col relative">
        <div className="bg-shape shape-1" aria-hidden="true"></div>
        <div className="bg-shape shape-2" aria-hidden="true"></div>
        <div className="bg-shape shape-3" aria-hidden="true"></div>

        <Header />

        <main className="container main pb-10 grow w-full">
          {/* 3. DEFINE ROUTES */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;