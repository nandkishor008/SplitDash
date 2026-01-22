import React from "react";
import { Helmet } from "react-helmet-async";
import NavbarPublic from "../../components/NavbarPublic";
import FooterPublic from "../../components/FooterPublic";

// --- IMPORT YOUR 7 SCREENSHOTS ---
import step1_welcome from "../../assets/sign.png";
import step2_friend from "../../assets/friend.png";
import step3_group from "../../assets/group.png";
import step4_expense from "../../assets/expense.png";
import step5_share from "../../assets/sharing.png";
import step6_settle from "../../assets/settle.png";
import final_dashboard from "../../assets/product.png";

const StepSection = ({ number, title, subtitle, text, image, isReversed }) => (
  <div style={{ 
    display: "flex", 
    flexDirection: isReversed ? "row-reverse" : "row",
    alignItems: "center", 
    gap: "clamp(30px, 5vw, 60px)", 
    marginBottom: "clamp(80px, 10vh, 140px)",
    flexWrap: "wrap"
  }}>
    
   
    <div style={{ flex: 1, minWidth: "300px", textAlign: "left" }}>
      <div style={{ fontSize: "clamp(3rem, 5vw, 4rem)", fontWeight: "800", color: "rgba(255,255,255,0.05)", lineHeight: "0.8", marginBottom: "10px" }}>
        {number}
      </div>
      <h3 style={{ fontSize: "clamp(1.8rem, 3vw, 2.2rem)", marginBottom: "10px", color: "#38bdf8", fontWeight: "700" }}>
        {title}
      </h3>
      <h4 style={{ fontSize: "clamp(0.9rem, 2vw, 1.1rem)", color: "#fff", marginBottom: "20px", fontWeight: "500", textTransform: "uppercase", letterSpacing: "1px" }}>
        {subtitle}
      </h4>
      <p style={{ fontSize: "clamp(1rem, 2vw, 1.1rem)", color: "#aaa", lineHeight: "1.8", whiteSpace: "pre-line" }}>
        {text}
      </p>
    </div>


    <div style={{ flex: 1.2, minWidth: "300px" }}>
      <div style={{ 
        background: "rgba(255,255,255,0.03)", 
        padding: "20px", 
        borderRadius: "24px", 
        border: "none", 
        boxShadow: isReversed 
          ? "0 30px 80px -20px rgba(34, 197, 94, 0.2)"  
          : "0 30px 80px -20px rgba(56, 189, 248, 0.2)", 
        transform: "none", 
        transition: "transform 0.3s ease, box-shadow 0.3s ease"
      }}
      className="step-card-hover"
      >
        <img src={image} alt={title} style={{ width: "100%", borderRadius: "16px", display: "block", boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }} />
      </div>
    </div>
  </div>
);

const HowItWorksPage = () => {
  return (
    <>
      <Helmet>
        <title>How to Use SplitDash - The Complete Guide</title>
        <meta name="description" content="A step-by-step guide to splitting bills. Learn how to add friends, create groups, share links, and settle debts on SplitDash." />
      </Helmet>

      <div className="landing-pro" style={{ background: "#0f0f11", minHeight: "100vh", color: "white", overflowX: "hidden" }}>
        <NavbarPublic />
        
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "clamp(120px, 15vh, 160px) 20px 60px" }}>
          
          <div style={{ textAlign: "center", marginBottom: "clamp(80px, 10vh, 120px)" }}>
            <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 3.5rem)", marginBottom: "20px", fontWeight: "800" }}>
              How to Split Expenses
            </h1>
            <p style={{ fontSize: "clamp(1.1rem, 2vw, 1.3rem)", color: "#888" }}>
              A complete walkthrough of the SplitDash workflow.
            </p>
          </div>

          <div className="steps-container">
            
            {/* STEP 1: WELCOME */}
            <StepSection 
              number="01" 
              title="One-Time Setup"
              subtitle="No Passwords"
              text={`Enter your name and email to get started.
              
              We don't force you to create a complex account with a password. Just one click to start tracking.`}
              image={step1_welcome} 
              isReversed={false}
            />

            {/* STEP 2: ADD FRIEND */}
            <StepSection 
              number="02" 
              title="Add Your Friends"
              subtitle="Build Your Circle"
              text={`Click the "+ Add friend" button in the sidebar.
              
              You don't need their email yet. Just enter a name like "Rahul" or "Priya" to start splitting bills immediately.`}
              image={step2_friend} 
              isReversed={true}
            />

            {/* STEP 3: CREATE GROUP */}
            <StepSection 
              number="03" 
              title="Create a Group"
              subtitle="Organize Your Trip"
              text={`Group your friends for a specific event, like "Manali 2026".
              
              Click "+ New group", give it a name, and select the friends you just added to include them in the trip.`}
              image={step3_group} 
              isReversed={false}
            />

            {/* STEP 4: ADD EXPENSE */}
            <StepSection 
              number="04" 
              title="Add an Expense"
              subtitle="Track Spending"
              text={`Click the green "+ Add expense" button.
              
              Simply enter the amount, select who paid, and choose a split type (Equal, Exact, or Percentage). We handle the math instantly.`}
              image={step4_expense} 
              isReversed={true}
            />

             {/* STEP 5: SHARE LINK */}
             <StepSection 
              number="05" 
              title="Share the Link"
              subtitle="Total Transparency"
              text={`Don't want to explain the math? Just show them.
              
              Click "Copy Share Link" and send it to your WhatsApp group. Your friends can view live balances without needing to log in.`}
              image={step5_share} 
              isReversed={false}
            />

            {/* STEP 6: SETTLE */}
            <StepSection 
              number="06" 
              title="Settle Up"
              subtitle="Clear Debts"
              text={`When a friend pays you back via UPI or Cash, click "Settle between users".
              
              Select the payer and receiver, then enter the amount. This records the payment and resets their balance to zero.`}
              image={step6_settle} 
              isReversed={true}
            />

          </div>
          
          {/* FINAL IMAGE: FULL DASHBOARD CTA */}
          <div style={{ textAlign: "center", marginTop: "80px" }}>
             <h2 style={{ fontSize: "clamp(2rem, 5vw, 2.5rem)", marginBottom: "40px", fontWeight: "bold" }}>
              The Result: A Clean Dashboard
            </h2>
            
            <div style={{ 
              background: "rgba(255,255,255,0.03)", padding: "20px", borderRadius: "24px", 
              border: "none", 
              boxShadow: "0 30px 80px -20px rgba(56, 189, 248, 0.2)", // Blue glow
              display: "inline-block", marginBottom: "80px", maxWidth: "100%"
            }}>
              <img src={final_dashboard} alt="Full SplitDash Dashboard" style={{ maxWidth: "100%", borderRadius: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }} />
            </div>

            <div style={{ padding: "60px", background: "linear-gradient(180deg, rgba(34, 197, 94, 0.05), transparent)", borderRadius: "30px", border: "1px solid rgba(34, 197, 94, 0.1)" }}>
              <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", marginBottom: "20px", fontWeight: "bold" }}>Ready to start tracking?</h2>
              <p style={{ color: "#888", marginBottom: "40px", fontSize: "1.1rem" }}>No ads. No hidden fees. Just clean splitting.</p>
              <a href="/login">
                <button className="cta-btn" style={{ fontSize: "1.2rem", padding: "18px 50px" }}>
                  Launch Dashboard →
                </button>
              </a>
            </div>
          </div>

        </div>

        <FooterPublic />
      </div>
    </>
  );
};

export default HowItWorksPage;