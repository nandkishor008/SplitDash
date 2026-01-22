import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom"; 
import NavbarPublic from "../../components/NavbarPublic";
import FooterPublic from "../../components/FooterPublic";
import founderImg from "../../assets/founder.png"; 

// --- COMPONENTS ---

const SocialButton = ({ text, link }) => (
  <a 
    href={link} 
    target="_blank" 
    rel="noopener noreferrer"
    style={{
      padding: "10px 24px",
      borderRadius: "50px",
      border: "1px solid rgba(255,255,255,0.2)",
      background: "rgba(255,255,255,0.05)",
      color: "#fff",
      textDecoration: "none",
      fontSize: "0.9rem",
      fontWeight: "500",
      transition: "all 0.2s",
      display: "inline-block"
    }}
    onMouseOver={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
    onMouseOut={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
  >
    {text}
  </a>
);

const ValueCard = ({ icon, title, desc }) => (
  <div style={{ 
    background: "rgba(255,255,255,0.02)", 
    padding: "30px", 
    borderRadius: "20px", 
    border: "1px solid rgba(255,255,255,0.05)",
    textAlign: "left"
  }}>
    <div style={{ fontSize: "2rem", marginBottom: "15px" }}>{icon}</div>
    <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "10px", color: "#fff" }}>{title}</h3>
    <p style={{ fontSize: "0.95rem", color: "#aaa", lineHeight: "1.6" }}>{desc}</p>
  </div>
);

const TechBadge = ({ name }) => (
  <span style={{ 
    padding: "6px 14px", 
    borderRadius: "20px", 
    background: "rgba(56, 189, 248, 0.1)", 
    color: "#38bdf8", 
    fontSize: "0.85rem", 
    border: "1px solid rgba(56, 189, 248, 0.2)" 
  }}>
    {name}
  </span>
);

// --- MAIN PAGE ---

const AboutPage = () => {
  return (
    <>
      <Helmet>

        <title>About SplitDash - Founder & Mission</title>

        <meta name="description" content="Meet Nandkishor, the founder of SplitDash. Built at IIT Gandhinagar to make expense splitting simple and free." />

      </Helmet>

      

      <div className="landing-pro" style={{ background: "#0f0f11", minHeight: "100vh", color: "white" }}>

        <NavbarPublic />

        

        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "140px 20px 60px", textAlign: "center" }}>

          

          {/* HEADLINE */}

          <h1 style={{ fontSize: "3rem", marginBottom: "10px", fontWeight: "bold" }}>What is SplitDash?</h1>

          <p style={{ fontSize: "1.2rem", color: "#22c55e", marginBottom: "60px", fontWeight: "500" }}>

            Simple. Fast. One Login. No Setup. No Friction.

          </p>

          

          {/* TEXT CONTENT (Centered & Clean) */}

          <div style={{ fontSize: "1.1rem", lineHeight: "1.8", color: "#ccc", textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>

            <p style={{ marginBottom: "20px" }}>

              SplitDash is a <b>smart group expense tracker</b> built for trips, roommates, and shared events where managing money should be easy — not complicated.

            </p>

            <p style={{ marginBottom: "20px" }}>

              The idea is simple: <b>only one person in the group needs to log in.</b> That person creates the group, adds friends, and starts adding expenses. Everyone else can use the same login or view the shared link to watch everything update in real time.

            </p>

            <p style={{ marginBottom: "40px" }}>

              No multiple accounts. No invitations. No verification emails. No passwords to remember. Just open SplitDash and start using it.

            </p>



            <p style={{ color: "#fff", fontWeight: "bold", marginBottom: "20px" }}>As you add expenses, SplitDash automatically calculates:</p>

            

            <ul style={{ listStyle: "none", padding: 0, marginBottom: "40px" }}>

              <li>✓ Who paid how much</li>

              <li>✓ Who owes how much</li>

              <li>✓ Who should pay whom</li>

            </ul>



            <p style={{ fontStyle: "italic", color: "#888", marginBottom: "80px" }}>

              No confusion. No awkward conversations. Just clean, instant settlements.

            </p>

          </div>

          {/* NEW SECTION: CORE VALUES */}
          <div style={{ marginBottom: "100px" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "40px" }}>Our Core Values</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", textAlign: "left" }}>
              <ValueCard 
                icon="🛡️" 
                title="Privacy First" 
                desc="We don't sell data. We don't ask for bank passwords. Your financial privacy is our priority." 
              />
              <ValueCard 
                icon="⚡" 
                title="Speed Matters" 
                desc="Adding an expense should take 5 seconds, not 5 minutes. No loading screens, no ads." 
              />
              <ValueCard 
                icon="💸" 
                title="Always Free" 
                desc="Essential tools shouldn't have subscription fees. SplitDash is free for everyone, forever." 
              />
            </div>
          </div>

          {/* FOUNDER CARD */}
          <div style={{ 
            background: "#0a0a0c", 
            border: "1px solid #222", 
            borderRadius: "30px", 
            padding: "50px 30px", 
            maxWidth: "700px", 
            margin: "0 auto 80px",
            boxShadow: "0 20px 50px -10px rgba(0,0,0,0.5)"
          }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
              <img 
                src={founderImg} 
                alt="Nandkishor" 
                style={{ width: "120px", height: "120px", borderRadius: "50%", objectFit: "cover", border: "4px solid #1a1a1c" }}
              />
              
              <div>
                <h2 style={{ fontSize: "1.8rem", marginBottom: "5px", fontWeight: "bold" }}>Nandkishor Kumar Pandit</h2>
                <p style={{ color: "#38bdf8", fontSize: "0.9rem", marginBottom: "5px", fontWeight: "500" }}>
                    Mechanical Engineer · Computer Science Minor · Full Stack Developer
                </p>
                <p style={{ color: "#666", fontSize: "0.85rem", marginBottom: "20px", textTransform: "uppercase", letterSpacing: "1px" }}>
                  IIT Gandhinagar
                </p>

               

                <p style={{ color: "#aaa", fontSize: "1rem", lineHeight: "1.7", marginBottom: "30px", maxWidth: "500px", margin: "0 auto 30px" }}>
                 Hi, I'm Nandkishor, the founder of SplitDash. I built SplitDash to
            solve the common hassles of splitting expenses with friends and
            roommates. As someone who has experienced the confusion and
            awkwardness that often comes with group expenses, I wanted to create
            a solution that makes it easy for everyone to stay on the same page.
                </p>

                <div style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
                  <SocialButton text="LinkedIn" link="https://www.linkedin.com/in/nandkishor-kumar-pandit-67514425a/" />
                  <SocialButton text="GitHub" link="https://github.com/nandkishor008" />
                  <SocialButton text="Instagram" link="https://www.instagram.com/kishornandu008" />
                </div>
              </div>
            </div>
          </div>

          {/* NEW: BOTTOM CTA */}
          <div style={{ padding: "40px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "20px" }}>Start tracking expenses today.</h3>
            <Link to="/login">
              <button style={{ 
                padding: "15px 40px", 
                fontSize: "1rem", 
                fontWeight: "bold", 
                borderRadius: "50px", 
                border: "none", 
                background: "#fff", 
                color: "#000", 
                cursor: "pointer",
                transition: "transform 0.2s"
              }}>
                Get Started Now 
              </button>
            </Link>
          </div>

        </div>

        <FooterPublic />
      </div>
    </>
  );
};

export default AboutPage;