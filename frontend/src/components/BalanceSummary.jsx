import React from "react";

const BalanceSummary = ({ balances, users }) => {
  const { simplified = [], perUser = [] } = balances || {};

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title">Balances & dues</div>
          <div className="card-sub">
            Simplified view of who owes whom and how much.
          </div>
        </div>
      </div>

      <div className="card-content" style={{ display: "flex", gap: "2rem" }}>
        {/* Per user table */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="table-title">Per user</div>
          <div className="scroll-section">
            <table className="table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Owes</th>
                  <th>Owed</th>
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
                        <td>₹{row.owes.toFixed(2)}</td>
                        <td>₹{row.owed.toFixed(2)}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Simplified dues table */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="table-title">Simplified dues</div>
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
                      <td>₹{row.amount.toFixed(2)}</td>
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
