import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion"; 
import { Link } from "react-router-dom"; 
import NavbarPublic from "../../components/NavbarPublic";
import FooterPublic from "../../components/FooterPublic";

// --- MOCK DATA ---
const CATEGORIES = ["All", "Comparisons", "Student Life", "Security", "Budgeting"];

const BLOG_POSTS = [
  {
    id: 1,
    title: "Top 5 Free Alternatives to Splitwise in India (2026)",
    excerpt: "Splitwise recently added daily limits. Here are the best free apps to track group expenses without ads.",
    date: "Jan 22, 2026",
    category: "Comparisons",
    readTime: "5 min read",
    gradient: "linear-gradient(135deg, #22c55e 0%, #14532d 100%)", 
    icon: "🆚"
  },
  {
    id: 2,
    title: "How to Manage Hostel Expenses with Roommates",
    excerpt: "Living in a hostel? Here is the ultimate guide to splitting milk, electricity, and mess bills without fighting.",
    date: "Jan 20, 2026",
    category: "Student Life",
    readTime: "4 min read",
    gradient: "linear-gradient(135deg, #3b82f6 0%, #1e3a8a 100%)", 
    icon: "🎓"
  },
  {
    id: 3,
    title: "Why Manual Expense Tracking is Safer than Bank Sync",
    excerpt: "Giving apps access to your SMS and Bank statements is risky. Here is why manual entry is the gold standard.",
    date: "Jan 15, 2026",
    category: "Security",
    readTime: "6 min read",
    gradient: "linear-gradient(135deg, #a855f7 0%, #581c87 100%)", 
    icon: "🛡️"
  },
  {
    id: 4,
    title: "The Ultimate Goa Trip Budget Breakdown",
    excerpt: "Planning a trip to Goa? We analyzed data from 500 groups to give you a realistic cost estimate per person.",
    date: "Jan 10, 2026",
    category: "Budgeting",
    readTime: "8 min read",
    gradient: "linear-gradient(135deg, #f43f5e 0%, #881337 100%)", 
    icon: "🏖️"
  }
];

// --- COMPONENTS ---

const BlogCard = ({ post }) => (
  <motion.div 
    whileHover={{ y: -10, transition: { duration: 0.2 } }}
    style={{ 
      background: "rgba(255,255,255,0.03)", 
      borderRadius: "24px", 
      border: "1px solid rgba(255,255,255,0.05)",
      overflow: "hidden",
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)"
    }}
  >
    {/* Card Header / Image Placeholder */}
    <div style={{ 
      height: "180px", 
      background: post.gradient, 
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: "4rem"
    }}>
      {post.icon}
    </div>

    {/* Card Body */}
    <div style={{ padding: "30px", flex: 1, display: "flex", flexDirection: "column" }}>
      
      {/* Meta Data */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", fontSize: "0.85rem", color: "#888", textTransform: "uppercase", letterSpacing: "0.5px" }}>
        <span style={{ color: "#fff", fontWeight: "bold", opacity: 0.8 }}>{post.category}</span>
        <span>{post.readTime}</span>
      </div>

      <h3 style={{ fontSize: "1.4rem", marginBottom: "15px", lineHeight: "1.4", fontWeight: "bold", color: "#fff" }}>
        {post.title}
      </h3>
      
      <p style={{ color: "#aaa", lineHeight: "1.6", marginBottom: "25px", fontSize: "0.95rem", flex: 1 }}>
        {post.excerpt}
      </p>
      
      <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: "10px", color: "#38bdf8", fontWeight: "600", fontSize: "0.9rem" }}>
        Read Article <span style={{ transition: "margin 0.2s" }}>→</span>
      </div>
    </div>
  </motion.div>
);

const FilterPill = ({ label, active, onClick }) => (
  <button 
    onClick={onClick}
    style={{
      padding: "8px 20px",
      borderRadius: "50px",
      border: active ? "1px solid #22c55e" : "1px solid rgba(255,255,255,0.1)",
      background: active ? "rgba(34, 197, 94, 0.1)" : "transparent",
      color: active ? "#22c55e" : "#888",
      cursor: "pointer",
      fontSize: "0.9rem",
      transition: "all 0.2s"
    }}
  >
    {label}
  </button>
);

// --- MAIN PAGE ---

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = activeCategory === "All" 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter(post => post.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>SplitDash Blog - Financial Tips & Updates</title>
        <meta name="description" content="Read the latest tips on managing group finances, student budgeting, and Splitdash updates." />
      </Helmet>

      <div className="landing-pro" style={{ background: "#0f0f11", minHeight: "100vh", color: "white", overflowX: "hidden" }}>
        <NavbarPublic />
        
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "clamp(120px, 15vh, 160px) 20px 60px" }}>
          
          {/* 1. HERO HEADER */}
          <div style={{ marginBottom: "80px", textAlign: "center" }}>
            <h1 style={{ 
              fontSize: "clamp(2.5rem, 5vw, 4rem)", 
              fontWeight: "800", 
              marginBottom: "20px",
              background: "linear-gradient(to right, #fff, #aaa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              The SplitDash Blog
            </h1>
            <p style={{ fontSize: "clamp(1.1rem, 2vw, 1.3rem)", color: "#888", maxWidth: "600px", margin: "0 auto" }}>
              Tips, tricks, and guides for students, travelers, and roommates managing money together.
            </p>
          </div>

          {/* 2. FILTERS & SEARCH */}
          <div style={{ 
            display: "flex", justifyContent: "space-between", alignItems: "center", 
            marginBottom: "50px", flexWrap: "wrap", gap: "20px" 
          }}>
            {/* Categories */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {CATEGORIES.map(cat => (
                <FilterPill 
                  key={cat} 
                  label={cat} 
                  active={activeCategory === cat} 
                  onClick={() => setActiveCategory(cat)} 
                />
              ))}
            </div>

            {/* Simple Search */}
            <div style={{ position: "relative" }}>
              <input 
                type="text" 
                placeholder="Search articles..." 
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  padding: "10px 15px",
                  paddingLeft: "35px",
                  borderRadius: "10px",
                  color: "white",
                  outline: "none",
                  width: "200px",
                  fontSize: "0.9rem"
                }}
              />
              <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", fontSize: "0.9rem", opacity: 0.5 }}>🔍</span>
            </div>
          </div>

          {/* 3. BLOG GRID */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", 
            gap: "30px" 
          }}>
            {filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
                <BlogCard key={post.id} post={post} />
              ))
            ) : (
              <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "40px", color: "#666" }}>
                No posts found in this category.
              </div>
            )}
          </div>

          {/* 4. NEWSLETTER / CTA SECTION */}
          <div style={{ 
            marginTop: "120px", 
            background: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)", 
            borderRadius: "30px", 
            padding: "clamp(40px, 5vw, 80px)", 
            textAlign: "center", 
            border: "1px solid rgba(255,255,255,0.05)",
            position: "relative",
            overflow: "hidden"
          }}>

            <div style={{ position: "absolute", top: "-50%", left: "50%", transform: "translateX(-50%)", width: "60%", height: "100%", background: "radial-gradient(circle, rgba(34, 197, 94, 0.1), transparent 70%)", filter: "blur(60px)", zIndex: 0 }} />

            <div style={{ position: "relative", zIndex: 1 }}>
              <h2 style={{ fontSize: "3rem", fontWeight: "800", marginBottom: "20px" }}>
                Ready to settle up?
              </h2>
              <p style={{ color: "#888", marginBottom: "30px", fontSize: "1.1rem" }}>
                No ads. No hidden fees. Just clean splitting.
              </p>
              
              <Link to="/login">
                <button className="cta-btn" style={{ 
                  padding: "20px 50px", fontSize: "1.2rem", borderRadius: "50px", 
                  border: "none", background: "#fff", color: "#000", 
                  fontWeight: "bold", cursor: "pointer", transition: "transform 0.2s" 
                }}>
                  Get Started Now
                </button>
              </Link>
            </div>
          </div>

        </div>

        <FooterPublic />
      </div>
    </>
  );
};

export default BlogPage;