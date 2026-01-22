import React from "react";
import { Link } from "react-router-dom";

const FooterPublic = () => {
  return (
    <footer className="footer-pro" style={{ 
      marginTop: "100px", 
      borderTop: "1px solid rgba(255,255,255,0.1)", 
      padding: "60px 20px",
      background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.8))"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", maxWidth: "1000px", margin: "0 auto", flexWrap: "wrap", gap: "40px" }}>
        
        <div style={{maxWidth: "300px"}}>
          <h3 style={{fontSize: "1.4rem", marginBottom: "10px"}}>SplitDash</h3>
          <p style={{ color: "#888", fontSize: "0.9rem", lineHeight: "1.6" }}>
            The free, secure alternative to Splitwise. <br/>Built with ❤️ By Nandkishor.
          </p>
          <div style={{marginTop: "20px", color: "#666", fontSize: "0.8rem"}}>
            © 2026 SplitDash. All rights reserved.
          </div>
        </div>

        <div style={{ display: "flex", gap: "60px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <span style={{ color: "white", fontWeight: "bold", marginBottom: "5px" }}>Product</span>
            <Link to="/" style={{ color: "#999", textDecoration: "none" }}>Home</Link>
            <Link to="/how-it-works" style={{ color: "#999", textDecoration: "none" }}>How it works</Link>
            <Link to="/login" style={{ color: "#999", textDecoration: "none" }}>Login / Sign Up</Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <span style={{ color: "white", fontWeight: "bold", marginBottom: "5px" }}>Trust</span>
            <Link to="/about" style={{ color: "#999", textDecoration: "none" }}>About Us</Link>
            <Link to="/blog" style={{ color: "#999", textDecoration: "none" }}>Blog</Link> {/* ADDED */}
            <Link to="/about" style={{ color: "#999", textDecoration: "none" }}>Privacy Promise</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterPublic;