import React, { useState, useRef, useEffect } from "react";
import axiosClient from "../api/axiosClient";

const GroupCard = ({ group, balances, isShared, onGroupUpdated, expenses = [] }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  

  const [isCopied, setIsCopied] = useState(false);

  const totalTripExpense = expenses.reduce((acc, curr) => {
    if (curr.category === 'settlement' || curr.description === 'Settle up') return acc;
    const rawValue = curr.totalAmount || curr.amount || 0;
    const amt = parseFloat(rawValue); 
    return acc + (isNaN(amt) ? 0 : amt);
  }, 0);

  if (!group) return null;

  const shareLink = `${window.location.origin}/share/${group.shareToken}`;
  const isEditor = group.sharePermission === "editor"; 

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const togglePermission = async () => {
    const newPermission = isEditor ? "viewer" : "editor"; 
    try {
      const res = await axiosClient.patch(`/groups/${group._id}/share-settings`, {
        shareEnabled: true, 
        sharePermission: newPermission
      });

      onGroupUpdated({ 
        ...res.data, 
        members: group.members 
      });

    } catch (err) {
      console.error("Toggle failed:", err);
      
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title">{group.name}</div>
          <div className="card-sub">
            {group.members.length} members · Equal / Exact / Percentage splits
          </div>
        </div>

        <div className="balance-badge">
           Total Expense: ₹{totalTripExpense.toFixed(2)}
        </div>
      </div>

      {/* DESKTOP: Stats Grid */}
      <div className="grid grid-3" style={{ marginTop: "20px" }}>
        
        {/* Total Trip Expense */}
        <div>
          <div className="card-sub">Total Trip Expense</div>
          <div style={{ fontSize: "1.4rem", color: "#fbbf24", fontWeight: "bold" }}>
            ₹{totalTripExpense.toFixed(2)}
          </div>
        </div>

        {/* Spacer */}
        <div></div>

        {/* Members List */}
        <div>
          <div className="card-sub">Members</div>
          <div style={{ fontSize: "0.85rem", color: "#ccc" }}>
            {group.members.map((m) => m.name || "User").join(", ")}
          </div>
        </div>
      </div>

      {/* MOBILE: Stats */}
      <div className="group-stats-mobile">
        <div className="stats-row">
          <div className="stat-card" style={{ background: "rgba(251, 191, 36, 0.1)", borderColor: "rgba(251, 191, 36, 0.2)" }}>
            <div className="card-sub">Total Trip Expense</div>
            <div className="stat-amount" style={{ color: "#fbbf24" }}>₹{totalTripExpense.toFixed(2)}</div>
          </div>
        </div>
        <div className="stat-card members">
          <div className="card-sub">Members</div>
          <div className="stat-amount">
            {group.members.map((m) => m.name || "User").join(", ")}
          </div>
        </div>
      </div>

      {/* DESKTOP: Actions */}
      {!isShared && (
        <div className="group-actions-desktop">
          <button 
            className="btn btn-secondary" 
            onClick={copyLink}
            style={{ minWidth: "140px", transition: "all 0.2s" }} 
          >
            {isCopied ? "✅ Link Copied!" : "🔗 Share Link"}
          </button>
          
          <button
            className="btn"
            style={{ 
              background: isEditor ? "#22c55e" : "#ef4444",
              color: "white" 
            }}
            onClick={togglePermission}
          >
            {isEditor ? "✅ Editor Access (Enabled)" : "🔒 Read-Only (Disabled)"}
          </button>

          <div style={{ fontSize: 12, color: "#9ca3af", alignSelf: "center" }}>
            {isEditor ? "Friends can add expenses" : "Friends can only view"}
          </div>
        </div>
      )}

      {/* MOBILE: Actions */}
      {!isShared && (
        <div className="group-actions-mobile" ref={dropdownRef}>
          <button 
            className="group-actions-btn"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            ⋮⋮⋮ Actions
          </button>
          
          {showDropdown && (
            <div className="group-dropdown">
              <button className="dropdown-item" onClick={() => { copyLink(); setShowDropdown(false); }}>
                 {isCopied ? "✅ Link Copied!" : "🔗 Share Link"}
              </button>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item" onClick={() => { togglePermission(); setShowDropdown(false); }}>
                 {isEditor ? "✅ Editor Access (Enabled)" : "🔒 Read-Only (Disabled)"}
              </button>
              <div className="dropdown-item disabled">
                {isEditor ? "Friends can edit" : "View only"}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GroupCard;