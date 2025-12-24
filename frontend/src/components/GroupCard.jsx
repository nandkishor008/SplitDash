import React from "react";

const GroupCard = ({ group, balances }) => {
  const totalOwes = balances?.perUser?.reduce((a, b) => a + b.owes, 0) || 0;
  const totalOwed = balances?.perUser?.reduce((a, b) => a + b.owed, 0) || 0;

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title">{group?.name}</div>
          <div className="card-sub">
            {group?.members?.length || 0} members · Equal / Exact / Percentage
            splits enabled
          </div>
        </div>
        <div className="balance-badge">
          Net flow: ₹{(totalOwed - totalOwes).toFixed(2)}
        </div>
      </div>
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
            {group?.members?.map((m) => m.name).join(", ")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
