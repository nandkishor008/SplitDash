import React from "react";
import { Link } from "react-router-dom";

const FooterPublic = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        
        <div style={styles.brandColumn}>
          <div style={styles.logo}>SplitDash</div>
          <p style={styles.tagline}>
            The free, secure alternative to Splitwise. <br />
            Built with ❤️ by Nandkishor.
          </p>
          <div style={styles.copy}>
            © {new Date().getFullYear()} SplitDash. All rights reserved.
          </div>
        </div>

        
        <div style={styles.linksGrid}>
          
          <div style={styles.linkColumn}>
            <h4 style={styles.heading}>Product</h4>
            <Link to="/" style={styles.link}>Home</Link>
            <Link to="/login" style={styles.link}>Login / Sign Up</Link>
          </div>

          <div style={styles.linkColumn}>
            <h4 style={styles.heading}>Trust</h4>
            <Link to="/about" style={styles.link}>About Us</Link>
            <Link to="/privacy" style={styles.link}>Privacy Promise</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

const styles = {
  footer: {
    borderTop: "1px solid rgba(255,255,255,0.1)",
    background: "#0a0a0c", 
    padding: "60px 20px",
    color: "#fff",
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    display: "flex",
    flexWrap: "wrap",
    gap: "40px",
    justifyContent: "space-between",
  },
  brandColumn: {
    flex: "1 1 300px", 
    minWidth: "280px",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#666",
  },
  tagline: {
    color: "#888",
    lineHeight: "1.6",
    fontSize: "0.95rem",
    marginBottom: "20px",
  },
  copy: {
    color: "#444",
    fontSize: "0.85rem",
  },
  linksGrid: {
    flex: "2 1 400px",
    display: "flex",
    gap: "60px",
    flexWrap: "wrap",
  },
  linkColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    minWidth: "120px",
  },
  heading: {
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#fff",
    marginBottom: "5px",
  },
  link: {
    color: "#888",
    textDecoration: "none",
    fontSize: "0.95rem",
    transition: "color 0.2s",
  }
};

export default FooterPublic;