import React from "react";

// Admin has been intentionally disabled in the frontend to prevent accidental exposure.
// If site owners need to re-enable admin access, restore the original Admin implementation
// and protect it with proper server-side authentication and route guards.

const Admin = () => {
  return (
    <div className="px-4 py-20 max-w-3xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-(--text-main) mb-4">Not Found</h2>
      <p className="text-(--text-muted)">This page is not available.</p>
    </div>
  );
};

export default Admin;
