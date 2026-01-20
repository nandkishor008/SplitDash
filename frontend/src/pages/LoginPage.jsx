import React, { useState } from "react";
import axiosClient from "../api/axiosClient";
import { trackEvent } from "../analytics";

const blockedDomains = ["example.com", "test.com", "fake.com", "mail.com", "temp.com", "demo.com"];

function isValidEmail(email) {
  if (!email.includes("@")) return false;
  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain) return false;
  if (blockedDomains.includes(domain)) return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return regex.test(email);
}

const LoginPage = ({ onLoggedIn, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    if (!name.trim()) {
      setError("Please enter your name.");
      trackEvent("login_failed", "auth", "Missing name");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a real email address.");
      trackEvent("login_failed", "auth", "Invalid email");
      return;
    }

    setLoading(true);

    try {
      trackEvent("login_attempt", "auth", "Login form submitted");
      const res = await axiosClient.post("/login", { name, email });
      trackEvent("login", "auth", "User logged in successfully");
      onLoggedIn(res.data);
    } catch (err) {
      console.error("Login failed:", err);
      setError("Server error. Please try again in a moment.");
      trackEvent("login_failed", "auth", "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-modal">
        <button className="close-btn" onClick={onClose}>✕</button>

        <h2>Welcome to SplitDash</h2>
        <p className="sub">
          Split expenses with friends. No passwords. No friction.
        </p>

        <div className="form-group">
          <label>Your name</label>
          <input
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Your email</label>
          <input
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@gmail.com"
            disabled={loading}
          />
        </div>

        {error && <div className="error-box">{error}</div>}

        <button className="btn" onClick={handleLogin} disabled={loading}>
          {loading ? "Signing you in..." : "Continue →"}
        </button>

        <p className="small-text">
          No spam. No ads. No tracking. Ever.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
