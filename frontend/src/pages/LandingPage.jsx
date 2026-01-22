import React, { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { 
  FaBolt, 
  FaBalanceScale, 
  FaLink, 
  FaMobileAlt, 
  FaLock, 
  FaShieldAlt, 
  FaGlobe, 
  FaHome, 
  FaPlane, 
  FaGlassCheers,
  FaArrowRight
} from "react-icons/fa";

import productShot from "../assets/product.png"; 
import NavbarPublic from "../components/NavbarPublic";
import FooterPublic from "../components/FooterPublic";


const FloatingOrb = ({ size, x, y, delay, color }) => (
  <motion.div
    className="orb"
    style={{ width: size, height: size, left: x, top: y, background: color, position: "absolute", borderRadius: "50%", filter: "blur(80px)", opacity: 0.5, zIndex: 0 }}
    animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay }}
  />
);


const TrustBadge = ({ icon, text }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "rgba(255,255,255,0.03)", padding: "10px 20px", borderRadius: "30px", border: "1px solid rgba(255,255,255,0.1)" }}>
    <span style={{ fontSize: "1.1rem", color: "#22c55e" }}>{icon}</span>
    <span style={{ color: "#ccc", fontSize: "0.9rem", fontWeight: "500" }}>{text}</span>
  </div>
);

// Feature Cards
const FeatureCard = ({ icon, title, desc, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    style={{ background: "rgba(255,255,255,0.03)", padding: "30px", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.05)", textAlign: "left" }}
  >
    <div style={{ fontSize: "2rem", marginBottom: "20px", color: "#38bdf8" }}>{icon}</div>
    <h3 style={{ fontSize: "1.3rem", fontWeight: "bold", marginBottom: "10px" }}>{title}</h3>
    <p style={{ color: "#888", lineHeight: "1.6" }}>{desc}</p>
  </motion.div>
);

// Use Case Cards
const UseCaseCard = ({ icon, title, items }) => (
  <div style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.05), transparent)", padding: "30px", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.1)" }}>
    <div style={{ fontSize: "2.5rem", marginBottom: "20px", color: "#a855f7" }}>{icon}</div>
    <h3 style={{ fontSize: "1.5rem", marginBottom: "20px" }}>{title}</h3>
    <ul style={{ listStyle: "none", padding: 0, color: "#aaa", lineHeight: "2.2" }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ color: "#475569", fontSize: "0.6rem" }}>●</span> {item}
        </li>
      ))}
    </ul>
  </div>
);

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", padding: "20px 0" }}>
      <div 
        onClick={() => setIsOpen(!isOpen)} 
        style={{ display: "flex", justifyContent: "space-between", cursor: "pointer", fontSize: "1.1rem", fontWeight: "500" }}
      >
        {question}
        <span style={{ color: "#38bdf8" }}>{isOpen ? "−" : "+"}</span>
      </div>
      {isOpen && <p style={{ color: "#888", marginTop: "10px", lineHeight: "1.6" }}>{answer}</p>}
    </div>
  );
};

const LandingPage = () => {
  return (
    <>
      <Helmet>
        <title>SplitDash - Free Bill Splitter & Group Expense Manager</title>
        <meta name="description" content="Split expenses with friends, roommates, and groups. The best free alternative to Splitwise in India. No ads, no daily limits." />
        <link rel="canonical" href="https://splitdash.app/" />
      </Helmet>

      <div className="landing-pro" style={{ position: "relative", overflow: "hidden", minHeight: "100vh", background: "#0f0f11", color: "white" }}>
        <NavbarPublic />
        <FloatingOrb size={300} x="10%" y="10%" delay={0} color="radial-gradient(circle, #22c55e, transparent)" />
        <FloatingOrb size={250} x="70%" y="20%" delay={2} color="radial-gradient(circle, #3b82f6, transparent)" />

        {/* 1. HERO SECTION  */}
        <div className="hero-pro" style={{ textAlign: "center", paddingTop: "160px", paddingBottom: "80px", position: "relative", zIndex: 2, paddingLeft: "20px", paddingRight: "20px" }}>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            style={{ 
              /* 👇 UPDATED: Responsive Font Size using clamp() */
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)", 
              fontWeight: "800", 
              background: "linear-gradient(to right, #fff, #aaa)", 
              WebkitBackgroundClip: "text", 
              WebkitTextFillColor: "transparent", 
              margin: "0 auto 20px", 
              maxWidth: "800px", 
              lineHeight: "1.1" 
            }}
          >
            Split expenses without the headache.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.3 }}
            style={{ fontSize: "1.2rem", color: "#888", maxWidth: "600px", margin: "0 auto 40px" }}
          >
            The modern way to track shared bills for trips, roommates & teams. <br/>
            <span style={{ color: "#ccc" }}>Free. Secure. No Ads.</span>
          </motion.p>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}>
            <Link to="/login">
              <button className="cta-btn" style={{ padding: "16px 40px", fontSize: "1.1rem", borderRadius: "50px", border: "none", background: "linear-gradient(135deg, #22c55e, #16a34a)", color: "white", fontWeight: "bold", cursor: "pointer", boxShadow: "0 10px 30px rgba(34, 197, 94, 0.3)" }}>
                Start Splitting for Free <FaArrowRight style={{ marginLeft: "8px", verticalAlign: "middle" }}/>
              </button>
            </Link>
          </motion.div>
        </div>

        {/* 2. TRUST STRIP */}
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap", padding: "0 20px", marginBottom: "80px", position: "relative", zIndex: 2 }}>
          <TrustBadge icon={<FaLock />} text="No Bank Access Required" />
          <TrustBadge icon={<FaShieldAlt />} text="Google Secure Login" />
          <TrustBadge icon={<FaGlobe />} text="Available Globally" />
        </div>

        {/* 3. PRODUCT SHOT */}
        <section className="product-preview" style={{ textAlign: "center", padding: "0 20px", marginBottom: "160px" }}>
          <h2 style={{ fontSize: "2.5rem", marginBottom: "10px", fontWeight: "bold" }}>See SplitDash in action</h2>
          <p style={{ color: "#888", fontSize: "1.1rem", marginBottom: "40px" }}>
            Everything you need to manage group expenses — in one clean dashboard.
          </p>
           <div style={{ 
                        background: "rgba(255,255,255,0.03)", padding: "20px", borderRadius: "24px", 
                        border: "none", 
                        boxShadow: "0 30px 80px -20px rgba(56, 189, 248, 0.2)", 
                        display: "inline-block", marginBottom: "80px", maxWidth: "100%"
                      }}>
                        <img src={productShot} alt="Full SplitDash Dashboard" style={{ maxWidth: "100%", borderRadius: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }} />
                      </div>
        </section>

        {/* 4. FEATURES GRID */}
        <div style={{ maxWidth: "1100px", margin: "0 auto 160px", padding: "0 20px" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "15px" }}>Everything you need. Nothing you don't.</h2>
            <p style={{ color: "#888", fontSize: "1.1rem" }}>We stripped away the clutter to give you the fastest expense tracker.</p>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
            <FeatureCard 
              icon={<FaBolt />} 
              title="Add Expenses Fast" 
              desc="Log a bill in 5 seconds. Split equally, unequally, or by percentage. We handle the math."
              delay={0.1}
            />
            <FeatureCard 
              icon={<FaBalanceScale />} 
              title="Smart Balances" 
              desc="We minimize transactions. Instead of 10 people paying each other, we tell you exactly who owes whom."
              delay={0.2}
            />
            <FeatureCard 
              icon={<FaLink />} 
              title="Instant Sharing" 
              desc="Share a read-only link with your WhatsApp group so everyone can see the live balance."
              delay={0.3}
            />
            <FeatureCard 
              icon={<FaMobileAlt />} 
              title="Installable App" 
              desc="Add SplitDash to your home screen. It works offline and feels just like a native app."
              delay={0.4}
            />
          </div>
        </div>

        {/* 5. USE CASES */}
        <div style={{ background: "rgba(255,255,255,0.02)", padding: "100px 20px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "bold", textAlign: "center", marginBottom: "60px" }}>Who is SplitDash for?</h2>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px" }}>
              <UseCaseCard 
                icon={<FaHome />} 
                title="Roommates" 
                items={["Rent & Utilities", "Grocery runs", "Furniture costs", "Maid/Cook payments"]} 
              />
              <UseCaseCard 
                icon={<FaPlane />} 
                title="Trips & Travel" 
                items={["Flight bookings", "Hotel stays", "Group dinners", "Cab fares"]} 
              />
             <UseCaseCard 
                icon={<FaGlassCheers />} 
                title="Events & Parties" 
                items={["Birthday gifts", "Reunions", "Concert tickets", "Dinner parties"]} 
              />
            </div>
          </div>
        </div>

        {/* 6. FAQ */}
        <div style={{ maxWidth: "800px", margin: "100px auto", padding: "0 20px" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "40px", textAlign: "center" }}>Common Questions</h2>
          <FAQItem question="Is SplitDash really free?" answer="Yes, 100% free. No daily limits on expenses (unlike Splitwise), and no ads." />
          <FAQItem question="Do I need to link my bank account?" answer="No. SplitDash is a manual tracker. We prioritize privacy and never ask for bank access." />
          <FAQItem question="Can my friends use it without logging in?" answer="Yes! You can share a 'Share Link' so they can see the balances without creating an account." />
        </div>

        {/* 7. BOTTOM CTA */}
        <div style={{ textAlign: "center", padding: "100px 20px" }}>
          <h2 style={{ fontSize: "3rem", fontWeight: "800", marginBottom: "20px" }}>Ready to settle up?</h2>
          <Link to="/login">
            <button className="cta-btn" style={{ padding: "20px 50px", fontSize: "1.2rem", borderRadius: "50px", border: "none", background: "#fff", color: "#000", fontWeight: "bold", cursor: "pointer" }}>
              Get Started Now
            </button>
          </Link>
        </div>

        <FooterPublic />
      </div>
    </>
  );
};

export default LandingPage;