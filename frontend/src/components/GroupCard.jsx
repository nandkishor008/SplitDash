import React, { useState, useRef, useEffect } from "react";
import axiosClient from "../api/axiosClient";

const GroupCard = ({ group, balances, isShared, onGroupUpdated }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const totalOwes = balances?.perUser?.reduce((a, b) => a + b.owes, 0) || 0;
  const totalOwed = balances?.perUser?.reduce((a, b) => a + b.owed, 0) || 0;

  if (!group) return null;

  const shareLink = `${window.location.origin}/share/${group.shareToken}`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareLink);
    alert("✅ Share link copied!");
  };

  const regenerateLink = async () => {
    if (!group._id) {
      alert("❌ Error: Group ID is missing.");
      return;
    }

    const ok = window.confirm("Regenerate link? Old link will stop working.");
    if (!ok) return;

    try {
      const res = await axiosClient.post(`/groups/${group._id}/regenerate-link`);
      onGroupUpdated({ ...group, shareToken: res.data.shareToken });
      alert("Link regenerated!");
    } catch (err) {
      console.error("Regenerate failed:", err);
      alert("Failed to regenerate link.");
    }
  };

  const toggleSharing = async () => {
    try {
      const res = await axiosClient.patch(`/groups/${group._id}/share-settings`, {
        shareEnabled: !group.shareEnabled,
        sharePermission: group.sharePermission || "viewer"
      });
      onGroupUpdated(res.data);
    } catch (err) {
      console.error("Toggle failed:", err);
    }
  };

  // Close dropdown on outside click
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
            {group.members.length} members · Equal / Exact / Percentage splits enabled
          </div>
        </div>

        <div className="balance-badge">
          Net flow: ₹{(totalOwed - totalOwes).toFixed(2)}
        </div>
      </div>

      {/* DESKTOP: Original 3-column grid */}
      <div className="grid grid-3">
        <div>
          <div className="card-sub">Total you owe</div>
          <div style={{ fontSize: "1.2rem", color: "#fecaca" }}>
            ₹{totalOwes.toFixed(2)}
          </div>
        </div>

        <div>
          <div className="card-sub">Total owed to you</div>
          <div style={{ fontSize: "1.2rem", color: "#bbf7d0" }}>
            ₹{totalOwed.toFixed(2)}
          </div>
        </div>

        <div>
          <div className="card-sub">Members</div>
          <div style={{ fontSize: "0.85rem" }}>
            {group.members.map((m) => m.name).join(", ")}
          </div>
        </div>
      </div>

      {/* MOBILE: Inline owe/owed + full members */}
      <div className="group-stats-mobile">
        <div className="stats-row">
          <div className="stat-card owe">
            <div className="card-sub">Total you owe</div>
            <div className="stat-amount">₹{totalOwes.toFixed(2)}</div>
          </div>
          <div className="stat-card owed">
            <div className="card-sub">Total owed to you</div>
            <div className="stat-amount">₹{totalOwed.toFixed(2)}</div>
          </div>
        </div>
        <div className="stat-card members">
          <div className="card-sub">Members</div>
          <div className="stat-amount">
            {group.members.map((m) => m.name).join(", ")}
          </div>
        </div>
      </div>

      {/* DESKTOP: All buttons inline */}
      {!isShared && (
        <div className="group-actions-desktop">
          <button className="btn btn-secondary" onClick={copyLink}>
            🔗 Copy Share Link
          </button>
          <button className="btn btn-secondary" onClick={regenerateLink}>
            ♻ Regenerate Link
          </button>
          <button
            className="btn"
            style={{ background: group.shareEnabled ? "#ef4444" : "#22c55e" }}
            onClick={toggleSharing}
          >
            {group.shareEnabled ? "⛔ Turn Off Sharing" : "✅ Turn On Sharing"}
          </button>
          <div style={{ fontSize: 12, color: "#9ca3af", alignSelf: "center" }}>
            Permission: {group.sharePermission || "viewer"}
          </div>
        </div>
      )}

      {/* MOBILE: Single dropdown button + menu */}
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
                🔗 Copy Share Link
              </button>
              <button className="dropdown-item" onClick={() => { regenerateLink(); setShowDropdown(false); }}>
                ♻ Regenerate Link
              </button>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item" onClick={() => { toggleSharing(); setShowDropdown(false); }}>
                {group.shareEnabled ? "⛔ Turn Off Sharing" : "✅ Turn On Sharing"}
              </button>
              <div className="dropdown-item disabled">
                Permission: {group.sharePermission || "viewer"}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GroupCard;
