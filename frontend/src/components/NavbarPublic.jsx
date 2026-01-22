import React from "react";
import { Link } from "react-router-dom";

const NavbarPublic = () => {
  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px 40px",
      position: "absolute",
      top: 0,
      width: "100%",
      zIndex: 10
    }}>
      <Link to="/" style={{ textDecoration: "none", color: "white", fontSize: "1.5rem", fontWeight: "bold" }}>
        SplitDash
      </Link>

      <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
        <Link to="/how-it-works" style={{ color: "#ccc", textDecoration: "none", fontSize: "0.95rem" }}>Guide</Link>
        <Link to="/about" style={{ color: "#ccc", textDecoration: "none", fontSize: "0.95rem" }}>About</Link>
        <Link to="/blog" style={{ color: "#ccc", textDecoration: "none", fontSize: "0.95rem" }}>Blog</Link> {/* ADDED */}
        <Link to="/login">
          <button style={{
            padding: "8px 24px",
            borderRadius: "20px",
            border: "none",
            background: "rgba(255,255,255,0.1)",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
            backdropFilter: "blur(5px)"
          }}>
            Login
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default NavbarPublic;