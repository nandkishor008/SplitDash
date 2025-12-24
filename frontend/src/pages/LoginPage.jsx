import React, { useState } from "react";
import axiosClient from "../api/axiosClient";

const LoginPage = ({ onLoggedIn }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    if (!name || !email) return;
    const res = await axiosClient.post("/login", { name, email });
    onLoggedIn(res.data); 
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div className="card" style={{ maxWidth: 420, width: "100%" }}>
        <h2 style={{ marginTop: 0 }}>Welcome to SplitDash</h2>
        <p className="card-sub">
          One place to track shared expenses for your trips.
        </p>
        <div className="form-group">
          <label>Your name</label>
          <input
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
        </div>
        <div className="form-group">
          <label>Your email</label>
          <input
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>
        <button className="btn" onClick={handleLogin}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
