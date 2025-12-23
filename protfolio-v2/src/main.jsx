import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from 'axios';

// --- AXIOS INTERCEPTOR ---
// Listen for 401 (Unauthorized) errors globally
axios.interceptors.response.use(
  (response) => response, // If success, just return the response
  (error) => {
    if (error.response && error.response.status === 401) {
      // If server says "Token Invalid/Expired"
      localStorage.removeItem('userInfo'); // Clear local storage
      window.location.href = '/login'; // Force redirect to login
    }
    return Promise.reject(error);
  }
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
