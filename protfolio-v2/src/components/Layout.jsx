import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans">
      {/* Fixed Background Effect */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900/20 via-black to-black pointer-events-none" />
      
      <Header />
      
      {/* Main Content Area */}
      <main className="flex-grow pt-20 px-4 w-full max-w-7xl mx-auto">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;