// Automatically switch between Localhost and Render
export const API_BASE_URL = import.meta.env.MODE === "development" 
  ? "http://localhost:5000" 
  : "https://my-portfolio-api-6uzd.onrender.com";