import React, { useState, useEffect } from "react";
import { loadingEmitter } from "./main"; // Import the emitter
import LoadingSpinner from "./components/LoadingSpinner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";       // Import Page
import Projects from "./pages/Projects"; // Import Page
import { loadTheme, applyTheme } from "./components/utils/theme";
import { ToastContainer, toast } from 'react-toastify';
import "./index.css";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

function App() {

  const [globalLoading, setGlobalLoading] = useState(false);

  useEffect(() => {
    loadingEmitter.subscribe(setGlobalLoading);
    applyTheme(loadTheme());
  }, []);

  return (
    // 2. WRAP EVERYTHING IN BROWSER ROUTER
    <BrowserRouter>

      {/* Show the spinner whenever globalLoading is true */}
      {globalLoading && <LoadingSpinner />}

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
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            } />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;