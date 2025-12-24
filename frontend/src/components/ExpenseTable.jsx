import React from "react";

const ExpenseTable = ({ expenses, onDelete }) => {
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title">Recent expenses</div>
          <div className="card-sub">
            All expenses in this group with their split type.
          </div>
        </div>
      </div>

      <div className="scroll-section">
        <table className="table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Paid by</th>
              <th>Amount</th>
              <th>Split</th>
              <th>Participants</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {expenses.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  No expenses yet. Add one above.
                </td>
              </tr>
            ) : (
              expenses.map((e) => (
                <tr key={e._id}>
                  <td>{e.description}</td>
                  <td>{e.paidBy?.name || "Unknown"}</td>
                  <td>₹{e.totalAmount.toFixed(2)}</td>
                  <td>
                    <span className="pill pill-muted">{e.splitType}</span>
                  </td>
                  <td>
                    {e.participants
                      .map(
                        (p) =>
                          `${p.user?.name || "Unknown"} (₹${p.amount.toFixed(
                            2
                          )})`
                      )
                      .join(", ")}
                  </td>
                  <td>
                    <button
                      className="icon-btn"
                      onClick={() => onDelete(e._id)}
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseTable;
