import React from "react";
import { motion } from "framer-motion";
import founderImg from "../assets/founder.jpeg";
import productShot from "../assets/product.png";

const FloatingOrb = ({ size, x, y, delay, color }) => (
  <motion.div
    className="orb"
    style={{
      width: size,
      height: size,
      left: x,
      top: y,
      background: color,
    }}
    animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
    transition={{
      duration: 10,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  />
);

const LandingPage = ({ onStart }) => {
  return (
    <div className="landing-pro">
      {/* Background Orbs */}
      <FloatingOrb
        size={300}
        x="10%"
        y="10%"
        delay={0}
        color="radial-gradient(circle,#22c55e,#16a34a)"
      />
      <FloatingOrb
        size={250}
        x="70%"
        y="20%"
        delay={2}
        color="radial-gradient(circle,#38bdf8,#0284c7)"
      />
      <FloatingOrb
        size={200}
        x="40%"
        y="70%"
        delay={4}
        color="radial-gradient(circle,#a78bfa,#7c3aed)"
      />

      {/* Hero */}
      <div className="hero-pro">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          SplitDash
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          The modern way to split expenses with friends, trips & teams.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button className="cta-btn" onClick={onStart}>
            Get Started Free →
          </button>
        </motion.div>
      </div>
      <section className="product-preview">
        <h2>See SplitDash in action</h2>
        <p>
          Everything you need to manage group expenses — in one clean dashboard.
        </p>
        <img src={productShot} className="product-image" />
      </section>

      {/* Feature Cards */}
      <div className="features-pro">
        {[
          ["💸", "Track group expenses"],
          ["⚡", "Instant settlements"],
          ["📊", "Smart balances"],
          ["🔐", "Private & secure"],
        ].map(([icon, text], i) => (
          <motion.div
            key={i}
            className="feature-pro-card"
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <span>{icon}</span>
            <h3>{text}</h3>
          </motion.div>
        ))}
      </div>

      {/* How it works */}
      <div className="how-pro">
        <h2>How it works</h2>
        <div className="steps">
          <div className="step">1. Login</div>
          <div className="step">2. Create Group</div>
          <div className="step">3. Add Expenses</div>
          <div className="step">4. Settle</div>
        </div>
      </div>

      

      {/* About SplitDash */}
      <div className="about-section">
        <h2>What is SplitDash?</h2>

        <p className="tagline-pro">
          Simple. Fast. One Login. No Setup. No Friction.
        </p>

        <p>
          SplitDash is a <b>smart group expense tracker</b> built for trips,
          roommates, and shared events where managing money should be easy — not
          complicated.
        </p>

        <p>
          The idea is simple:{" "}
          <b>only one person in the group needs to log in.</b> That person
          creates the group, adds friends, and starts adding expenses. Everyone
          else can use the same login and watch everything update in real time.
        </p>

        <p>
          No multiple accounts. No invitations. No verification emails. No
          passwords to remember. Just open SplitDash and start using it.
        </p>

        <p>As you add expenses, SplitDash automatically calculates:</p>

        <ul className="about-list">
          <li>✔ Who paid how much</li>
          <li>✔ Who owes how much</li>
          <li>✔ Who should pay whom</li>
          <li>✔ The minimum number of payments to settle everything</li>
        </ul>

        <p>
          Whether you're on a trip with friends, sharing rent with roommates, or
          managing group expenses for an event, SplitDash keeps everything
          <b> transparent, automatic, and stress-free.</b>
        </p>

        <p className="final-line">
          <b>
            No confusion. No awkward conversations. Just clean, instant
            settlements.
          </b>
        </p>
      </div>

      <div className="founder-section">
        <img
          src={founderImg}
          alt="Nandkishor Kumar Pandit"
          className="founder-photo-large"
        />

        <h2 className="founder-name">Nandkishor Kumar Pandit</h2>

        <p className="founder-role">
          Mechanical Engineer · Computer Science Minor · Full Stack Developer
        </p>

        <p className="founder-college">IIT Gandhinagar</p>

        <div className="founder-description">
          <p>
            Hi, I'm Nandkishor, the founder of SplitDash. I built SplitDash to
            solve the common hassles of splitting expenses with friends and
            roommates. As someone who has experienced the confusion and
            awkwardness that often comes with group expenses, I wanted to create
            a solution that makes it easy for everyone to stay on the same page.
          </p>
        </div>

        <div className="social-links">
          <a href="https://www.linkedin.com/in/YOUR_LINK" target="_blank">
            LinkedIn
          </a>
          <a href="https://github.com/nandkishor008" target="_blank">
            GitHub
          </a>
          <a href="https://instagram.com/YOUR_ID" target="_blank">
            Instagram
          </a>
          <a href="mailto:YOUR_EMAIL@gmail.com">Email</a>
        </div>
      </div>

      {/* Footer */}
      <div className="footer-pro">
        <div>© 2026 SplitDash</div>
        <div>Built with ❤️ by Nandkishor</div>
      </div>
      
    </div>
  );
};

export default LandingPage;
