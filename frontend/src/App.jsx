import React, { useState, useEffect } from "react";
import "./styles.css";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import { trackEvent, trackPage } from "./analytics";  // NEW

const STORAGE_KEY = "splitdash_owner";

const App = () => {
  const [owner, setOwner] = useState(null);
  const [currentPage, setCurrentPage] = useState("login");  // NEW

  useEffect(() => {
    // Track initial page
    trackPage(currentPage);  // NEW

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setOwner(JSON.parse(stored));
        setCurrentPage("dashboard");  // NEW
        trackPage("dashboard");  // NEW
      }
    } catch (e) {
      console.error("Failed to read owner from storage", e);
    }
  }, []);

  const handleLoggedIn = (user) => {
    setOwner(user);
    setCurrentPage("dashboard");  // NEW
    trackEvent("signup", "auth", "User signed up");  // NEW
    trackPage("dashboard");  // NEW
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } catch (e) {
      console.error("Failed to save owner to storage", e);
    }
  };

  const handleLogout = () => {
    trackEvent("logout", "auth", "User logged out");  // NEW
    setOwner(null);
    setCurrentPage("login");  // NEW
    trackPage("login");  // NEW
    
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error("Failed to clear owner from storage", e);
    }
  };

  if (!owner) {
    return <LoginPage onLoggedIn={handleLoggedIn} />;
  }

  return <DashboardPage owner={owner} onLogout={handleLogout} />;
};

export default App;
