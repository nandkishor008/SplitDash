import React, { useState, useEffect } from "react";
import "./styles.css";
import { Routes, Route, useNavigate, Navigate, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async"; 

// Pages
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import LandingPage from "./pages/LandingPage";
import SharedGroupPage from "./pages/SharedGroupPage";

// Public Pages
import AboutPage from "./pages/public/AboutPage";      
import HowItWorksPage from "./pages/public/HowItWorksPage";
import BlogPage from "./pages/public/BlogPage";

import { trackEvent, trackPage } from "./analytics";

const STORAGE_KEY = "splitdash_owner";

// Scroll to top helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    // Only scroll to top if we are NOT opening the login modal
    if (pathname !== "/login") {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  return null;
};

const App = () => {
  const [owner, setOwner] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setOwner(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to read owner", e);
    }
  }, []);

  useEffect(() => {
     if (window.location.pathname) {
        trackPage(window.location.pathname);
     }
  }, [navigate]);

  const handleLogin = (user) => {
    setOwner(user);
    trackEvent("signup", "auth", "User signed up");
    trackPage("dashboard");
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    navigate("/dashboard");
  };

  const handleLogout = () => {
    trackEvent("logout", "auth", "User logged out");
    setOwner(null);
    localStorage.removeItem(STORAGE_KEY);
    trackPage("landing");
    navigate("/");
  };

  return (
    <HelmetProvider>
      <ScrollToTop />
      
      <Routes>
        {/* --- Public Website Routes --- */}
        
        {/* 1. Normal Landing Page */}
        <Route path="/" element={!owner ? <LandingPage /> : <Navigate to="/dashboard" />} />
        
        {/* 2. Login Overlay Route */}
        <Route path="/login" element={
          !owner ? (
            <>
              <LandingPage /> 
              <LoginPage onLoggedIn={handleLogin} onClose={() => navigate("/")} />
            </>
          ) : (
            <Navigate to="/dashboard" />
          )
        } />

        <Route path="/about" element={<AboutPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/blog" element={<BlogPage />} />
        
        {/* --- App (Protected) --- */}
        {/* 👇 FIX APPLIED HERE: Redirect to "/" instead of "/login" */}
        <Route 
          path="/dashboard" 
          element={
            owner ? (
              <DashboardPage owner={owner} onLogout={handleLogout} /> 
            ) : (
              <Navigate to="/" /> 
            )
          } 
        />
        
        <Route path="/share/:token" element={<SharedGroupPage />} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HelmetProvider>
  );
};

export default App;