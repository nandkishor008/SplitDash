import React, { useState } from "react";
import axiosClient from "../api/axiosClient";
import { trackEvent } from "../analytics";  // NEW

const LoginPage = ({ onLoggedIn }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);  // NEW

  const handleLogin = async () => {
    if (!name || !email) {
      trackEvent("login_attempt_failed", "auth", "Missing name or email");  // NEW
      return;
    }

    setLoading(true);  // NEW
    try {
      trackEvent("login_attempt", "auth", "Login form submitted");  // NEW
      const res = await axiosClient.post("/login", { name, email });
      trackEvent("login", "auth", "User logged in successfully");  // NEW
      onLoggedIn(res.data);
    } catch (error) {
      console.error("Login failed:", error);
      trackEvent("login_failed", "auth", "API error during login");  // NEW
    } finally {
      setLoading(false);  // NEW
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div className="card" style={{ maxWidth: 420, width: "100%" }}>
        <h2 style={{ marginTop: 0 }}>Welcome to SplitDash</h2>
        <p className="card-sub">
          One place to track shared expenses for your trips.
        </p>
        <div className="form-group">
          <label>Your name</label>
          <input
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            disabled={loading}  // NEW
          />
        </div>
        <div className="form-group">
          <label>Your email</label>
          <input
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            disabled={loading}  // NEW
          />
        </div>
        <button 
          className="btn" 
          onClick={handleLogin}
          disabled={loading || !name || !email}  // NEW
        >
          {loading ? "Logging in..." : "Continue"}  // NEW
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
