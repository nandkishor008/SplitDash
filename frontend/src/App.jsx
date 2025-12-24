import React, { useState, useEffect } from "react";
import "./styles.css";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

const STORAGE_KEY = "splitdash_owner";

const App = () => {
  const [owner, setOwner] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setOwner(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to read owner from storage", e);
    }
  }, []);

  const handleLoggedIn = (user) => {
    setOwner(user);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } catch (e) {
      console.error("Failed to save owner to storage", e);
    }
  };

  const handleLogout = () => {
    setOwner(null);
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
