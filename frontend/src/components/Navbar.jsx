import React from "react";

const Navbar = ({ currentGroupName, owner, onLogout }) => {
  const initials = owner?.name
    ?.split(" ")
    .map((p) => p[0]?.toUpperCase())
    .join("")
    .slice(0, 2);

  return (
    <div className="navbar">
      <div>
        <div className="navbar-title">
          {currentGroupName || "Your expense dashboard"}
        </div>
        <div className="navbar-sub">
          Track groups, expenses, and simplified balances in one place.
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
        <div className="balance-badge">Live balance view</div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.3rem 0.6rem",
            borderRadius: "999px",
            background: "#020617",
            border: "1px solid #334155",
            fontSize: "0.85rem"
          }}
        >
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: "999px",
              background: "#22c55e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#022c22",
              fontWeight: 700
            }}
          >
            {initials}
          </div>
          <span>{owner?.name}</span>
        </div>
        {onLogout && (
          <button
            className="btn btn-secondary"
            style={{ padding: "0.35rem 0.8rem", fontSize: "0.8rem" }}
            onClick={onLogout}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
