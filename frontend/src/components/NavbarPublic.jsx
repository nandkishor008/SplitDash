import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const NavbarPublic = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu when a link is clicked
  const handleLinkClick = () => setIsOpen(false);

  return (
    <nav className="navbar-public">
      <div className="nav-container">
        
        {/* 1. LOGO */}
        <Link to="/" className="nav-logo" onClick={handleLinkClick}>
          SplitDash
        </Link>

        {/* 2. DESKTOP MENU */}
        <div className="desktop-menu">
          <Link to="/how-it-works" className="nav-link">Guide</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/blog" className="nav-link">Blog</Link> 
          <Link to="/login" className="login-btn">Login</Link>
        </div>

        {/* 3. MOBILE HAMBURGER ICON */}
        <div className="mobile-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* 4. MOBILE MENU DROPDOWN */}
      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        <Link to="/how-it-works" className="mobile-link" onClick={handleLinkClick}>Guide</Link>
        <Link to="/about" className="mobile-link" onClick={handleLinkClick}>About</Link>
        <Link to="/blog" className="mobile-link" onClick={handleLinkClick}>Blog</Link> 
        <Link to="/login" className="mobile-link highlight" onClick={handleLinkClick}>Login</Link>
      </div>

      {/* CSS STYLES */}
      <style>{`
        /* --- BASE STYLES --- */
        .navbar-public {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          padding: 20px 0;
          background: transparent;
        }

        .nav-container {
          width: 100%;           
          max-width: 100%;       
          margin: 0;
          padding: 0 40px;       
          display: flex;
          justify-content: space-between; 
          align-items: center;
          box-sizing: border-box; 
        }

        .nav-logo {
          font-size: 1.8rem;
          font-weight: 800;
          color: #fff;
          text-decoration: none;
          letter-spacing: -0.5px;
        }

        /* Desktop Menu */
        .desktop-menu {
          display: flex;
          gap: 32px;
          align-items: center;
        }

        .nav-link {
          color: #ccc;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 500;
          transition: color 0.2s;
        }
        .nav-link:hover { color: #fff; }

        .login-btn {
          padding: 10px 24px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 50px;
          color: #fff;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: bold;
          transition: all 0.2s;
        }
        .login-btn:hover { background: rgba(255,255,255,0.2); }

        /* Mobile Icon */
        .mobile-icon {
          display: none; 
          color: #fff;
          font-size: 1.6rem;
          cursor: pointer;
        }

        /* Mobile Menu */
        .mobile-menu {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          background: #0f0f11;
          flex-direction: column;
          padding: 10px 0;
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 10px 30px rgba(0,0,0,0.8);
        }

        .mobile-menu.open {
          display: flex;
        }

        .mobile-link {
          color: #fff;
          text-decoration: none;
          font-size: 1.2rem;
          text-align: center;
          padding: 16px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .mobile-link.highlight {
          color: #22c55e;
          font-weight: bold;
          background: rgba(34, 197, 94, 0.05);
        }

        /* --- RESPONSIVE --- */
        @media (max-width: 900px) {
          .nav-container { padding: 0 20px; }
          .desktop-menu { display: none !important; } 
          .mobile-icon { display: block !important; }
        }
      `}</style>
    </nav>
  );
};

export default NavbarPublic;