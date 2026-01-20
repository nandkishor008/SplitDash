import React, { useState, useEffect } from "react";
import "./styles.css";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import LandingPage from "./pages/LandingPage";
import SharedGroupPage from "./pages/SharedGroupPage";
import { trackEvent, trackPage } from "./analytics";
import { Routes, Route, useNavigate } from "react-router-dom";

const STORAGE_KEY = "splitdash_owner";

const App = () => {
  const [owner, setOwner] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    trackPage("landing");

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const user = JSON.parse(stored);
        setOwner(user);
        trackPage("dashboard");
        navigate("/"); // go to dashboard
      }
    } catch (e) {
      console.error("Failed to read owner", e);
    }
  }, [navigate]);

  const handleStart = () => {
    setShowLogin(true);
    trackPage("login");
  };

  const handleLoggedIn = (user) => {
    setOwner(user);
    trackEvent("signup", "auth", "User signed up");
    trackPage("dashboard");
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    setShowLogin(false);
    navigate("/");
  };

  const handleLogout = () => {
    trackEvent("logout", "auth", "User logged out");
    setOwner(null);
    localStorage.removeItem(STORAGE_KEY);
    trackPage("landing");
    navigate("/");
  };

  return (
    <Routes>
      {/* Shared link route */}
      <Route path="/share/:token" element={<SharedGroupPage />} />

      {/* Main app */}
      <Route
        path="/"
        element={
          owner ? (
            <DashboardPage owner={owner} onLogout={handleLogout} />
          ) : (
            <>
              <LandingPage onStart={handleStart} />
              {showLogin && (
                <LoginPage
                  onLoggedIn={handleLoggedIn}
                  onClose={() => setShowLogin(false)}
                />
              )}
            </>
          )
        }
      />
    </Routes>
  );
};

export default App;
