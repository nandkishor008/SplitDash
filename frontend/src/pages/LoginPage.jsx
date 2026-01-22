import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  // --- HANDLE CLOSE ---
  // This ensures the X button always takes you back to the landing page
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate("/"); 
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
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
      
      if (onLoggedIn) {
        onLoggedIn(res.data);
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Server error. Please try again in a moment.");
      trackEvent("login_failed", "auth", "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    // 1. OVERLAY (Dark & Blurred)
    <div style={{ 
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%", 
      background: "rgba(0, 0, 0, 0.7)", // Matches your screenshot's dark overlay
      backdropFilter: "blur(5px)",      // Subtle blur for the landing page behind
      display: "flex", justifyContent: "center", alignItems: "center",
      zIndex: 1000,
      padding: "20px"
    }}>
      
      {/* 2. MODAL CARD */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        style={{ 
          background: "#0f0f11", // Matches your dark theme (Zinc-950)
          padding: "40px", 
          borderRadius: "20px", 
          width: "100%", maxWidth: "420px",
          border: "1px solid rgba(255,255,255,0.1)", // Subtle border like screenshot
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          position: "relative",
          textAlign: "left" // Left align strictly as per image
        }}
      >
        {/* CLOSE BUTTON (X) */}
        <button 
          onClick={handleClose} 
          style={{
            position: "absolute", top: "20px", right: "20px",
            background: "transparent", border: "none", color: "#666",
            fontSize: "1.5rem", cursor: "pointer", lineHeight: "1"
          }}
        >
          ✕
        </button>

        {/* HEADER */}
        <h2 style={{ color: "white", fontSize: "1.8rem", marginBottom: "10px", fontWeight: "bold", marginTop: 0 }}>
          Welcome to SplitDash
        </h2>
        <p style={{ color: "#888", marginBottom: "30px", fontSize: "0.95rem", lineHeight: "1.5" }}>
          Split expenses with friends. No passwords. No friction.
        </p>

        {/* FORM */}
        <form onSubmit={handleLogin}>
          
          {/* NAME INPUT */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", color: "#ccc", marginBottom: "8px", fontSize: "0.9rem" }}>Your name</label>
            <input 
              type="text" 
              placeholder="Your full name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              style={{
                width: "100%", padding: "14px", borderRadius: "10px",
                background: "#18181b", // Slightly lighter than modal bg
                border: "1px solid #3f3f46",
                color: "white", fontSize: "1rem", outline: "none",
                boxSizing: "border-box"
              }}
              onFocus={(e) => e.target.style.borderColor = "#22c55e"}
              onBlur={(e) => e.target.style.borderColor = "#3f3f46"}
            />
          </div>

          {/* EMAIL INPUT */}
          <div style={{ marginBottom: "30px" }}>
            <label style={{ display: "block", color: "#ccc", marginBottom: "8px", fontSize: "0.9rem" }}>Your email</label>
            <input 
              type="text"
              placeholder="you@gmail.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              style={{
                width: "100%", padding: "14px", borderRadius: "10px",
                background: "#18181b", 
                border: "1px solid #3f3f46",
                color: "white", fontSize: "1rem", outline: "none",
                boxSizing: "border-box"
              }}
              onFocus={(e) => e.target.style.borderColor = "#22c55e"}
              onBlur={(e) => e.target.style.borderColor = "#3f3f46"}
            />
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <div style={{ 
              background: "rgba(239, 68, 68, 0.1)", color: "#ef4444", 
              padding: "12px", borderRadius: "8px", marginBottom: "20px", 
              fontSize: "0.9rem", border: "1px solid rgba(239, 68, 68, 0.2)" 
            }}>
              {error}
            </div>
          )}

          {/* GREEN BUTTON */}
          <button 
            type="submit"
            disabled={loading}
            className="cta-btn"
            style={{
              width: "100%", padding: "14px", borderRadius: "10px",
              background: loading ? "#3f3f46" : "#22c55e", // Solid Green like screenshot
              color: loading ? "#888" : "black", 
              fontWeight: "bold", fontSize: "1rem",
              border: "none", cursor: loading ? "not-allowed" : "pointer", 
              transition: "opacity 0.2s"
            }}
          >
            {loading ? "Signing you in..." : "Continue →"}
          </button>
        </form>
        
        {/* FOOTER */}
        <p style={{ textAlign: "center", color: "#555", fontSize: "0.8rem", marginTop: "25px", marginBottom: 0 }}>
          No spam. No ads. No tracking. Ever.
        </p>

      </motion.div>
    </div>
  );
};

export default LoginPage;