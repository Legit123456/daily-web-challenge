import React, { useState, useEffect } from 'react';
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
export const loadingEmitter = {
  activeRequests: 0,
  subscribers: [],
  subscribe(callback) {
    this.subscribers.push(callback);
  },
  notify(isLoading) {
    this.subscribers.forEach(cb => cb(isLoading));
  },
  start() {
    this.activeRequests++;
    if (this.activeRequests === 1) this.notify(true);
  },
  stop() {
    this.activeRequests--;
    if (this.activeRequests <= 0) {
      this.activeRequests = 0;
      this.notify(false);
    }
  }
};

axios.interceptors.request.use(config => {
  loadingEmitter.start();
  return config;
}, error => {
  loadingEmitter.stop();
  return Promise.reject(error);
});

axios.interceptors.response.use(
  response => {
    loadingEmitter.stop();
    return response;
  },
  error => {
    loadingEmitter.stop();
    // Your existing 401 logic here...
    return Promise.reject(error);
  }
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
