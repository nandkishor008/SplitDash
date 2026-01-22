import React from "react";

const BalanceSummary = ({ balances, users }) => {
  const { simplified = [], perUser = [] } = balances || {};

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title">Balances & dues</div>
          <div className="card-sub">
            Simplified view of who needs to pay and who gets paid.
          </div>
        </div>
      </div>

      <div className="card-content" style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        {/* Per user table */}
        <div style={{ flex: 1, minWidth: "300px" }}>
          <div className="table-title">Per user breakdown</div>
          <div className="scroll-section">
            <table className="table">
              <thead>
                <tr>
                  <th>User</th>
                  {/* 👇 Renamed Headers for clarity */}
                  <th style={{ color: "#ef4444" }}>To Pay ↘</th>
                  <th style={{ color: "#22c55e" }}>To Receive ↗</th>
                </tr>
              </thead>
              <tbody>
                {perUser.length === 0 ? (
                  <tr>
                    <td colSpan={3} style={{ textAlign: "center" }}>
                      No balances for this group yet.
                    </td>
                  </tr>
                ) : (
                  perUser.map((row) => {
                    const u = users.find((f) => f._id === row.userId);
                    return (
                      <tr key={row.userId}>
                        <td>{u?.name || "Unknown"}</td>
                        
                        {/* 👇 Red for "To Pay" */}
                        <td style={{ color: "#ef4444", fontWeight: "600" }}>
                          ₹{row.owes.toFixed(2)}
                        </td>
                        
                        {/* 👇 Green for "To Receive" */}
                        <td style={{ color: "#22c55e", fontWeight: "600" }}>
                          ₹{row.owed.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Simplified dues table */}
        <div style={{ flex: 1, minWidth: "300px" }}>
          <div className="table-title">Who pays whom?</div>
          <div className="scroll-section">
            <table className="table">
              <thead>
                <tr>
                  <th>From</th>
                  <th>To</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {simplified.length === 0 ? (
                  <tr>
                    <td colSpan={3} style={{ textAlign: "center" }}>
                      All settled up for this group.
                    </td>
                  </tr>
                ) : (
                  simplified.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.fromName}</td>
                      <td>{row.toName}</td>
                      <td style={{ fontWeight: "bold" }}>₹{row.amount.toFixed(2)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceSummary;