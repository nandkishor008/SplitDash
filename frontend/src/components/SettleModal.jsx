import React, { useState, useMemo } from "react";
import axiosClient from "../api/axiosClient";

const SettleModal = ({ group, users, pairwise = {}, onAfterSettle }) => {
  const [show, setShow] = useState(false);
  const [fromUser, setFromUser] = useState("");
  const [toUser, setToUser] = useState("");
  const [amount, setAmount] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const userName = (id) => users.find((u) => u._id === id)?.name || "Unknown";


  const validReceivers = useMemo(() => {
    if (!fromUser) return [];
    return group?.members?.filter((m) => {
      const key = `${fromUser}_${m._id}`;
      return pairwise[key] && pairwise[key] > 0;
    });
  }, [fromUser, group, pairwise]);

  const maxDue = useMemo(() => {
    if (!fromUser || !toUser) return 0;
    const key = `${fromUser}_${toUser}`;
    return pairwise[key] || 0;
  }, [fromUser, toUser, pairwise]);

  const handleRecordPayment = async () => {
    setErrorMsg("");
    setSuccessMsg("");

    if (!fromUser || !toUser || !group?._id) return;

    if (!maxDue || maxDue <= 0) {
      setErrorMsg(
        `${userName(fromUser)} does not owe anything to ${userName(toUser)}.`
      );
      return;
    }

    const amt = parseFloat(amount);
    if (!amt || amt <= 0) {
      setErrorMsg("Enter a positive amount.");
      return;
    }
    if (amt > maxDue + 0.0001) {
      setErrorMsg(
        `Maximum you can settle is ₹${maxDue.toFixed(
          2
        )} between these two people.`
      );
      return;
    }

    const res = await axiosClient.post("/balances/payment", {
      groupId: group._id,
      fromFriendId: fromUser,
      toFriendId: toUser,
      amount: amt
    });

    if (onAfterSettle) onAfterSettle();

    const msg =
      res.data?.message ||
      `Recorded settlement of ₹${amt.toFixed(2)} from ${userName(
        fromUser
      )} to ${userName(toUser)}.`;

    setSuccessMsg(msg);
    setAmount("");
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Settle dues</div>
            <div className="card-sub">
              Only people who currently owe money can settle, and only up to their dues.
            </div>
          </div>
          <button className="btn btn-secondary" onClick={() => setShow(true)}>
            Settle between users
          </button>
        </div>
      </div>

      {show && (
        <div className="modal-backdrop" onClick={() => setShow(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginTop: 0 }}>Settle dues</h3>

            <div className="form-row">
              <div className="form-group">
                <label>From (who is paying now)</label>
                <select
                  className="select"
                  value={fromUser}
                  onChange={(e) => {
                    setFromUser(e.target.value);
                    setToUser("");
                    setAmount("");
                    setSuccessMsg("");
                    setErrorMsg("");
                  }}
                >
                  <option value="">Select</option>
                  {group?.members?.map((m) => (
                    <option key={m._id} value={m._id}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>To (who receives)</label>
                <select
                  className="select"
                  value={toUser}
                  onChange={(e) => {
                    setToUser(e.target.value);
                    setAmount("");
                    setSuccessMsg("");
                    setErrorMsg("");
                  }}
                  disabled={!fromUser}
                >
                  <option value="">
                    {fromUser ? "Select" : "Choose payer first"}
                  </option>
                  {validReceivers.map((m) => (
                    <option key={m._id} value={m._id}>
                      {m.name} (dues: ₹
                      {pairwise[`${fromUser}_${m._id}`].toFixed(2)})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group" style={{ marginTop: "0.7rem" }}>
              <label>
                Amount to settle now (₹)
                {maxDue > 0 && (
                  <span style={{ marginLeft: 6, fontSize: "0.8rem" }}>
                    Max: ₹{maxDue.toFixed(2)}
                  </span>
                )}
              </label>
              <input
                className="input"
                type="number"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setSuccessMsg("");
                  setErrorMsg("");
                }}
                placeholder={maxDue > 0 ? `Up to ₹${maxDue.toFixed(2)}` : "0"}
                disabled={!fromUser || !toUser || maxDue <= 0}
              />
              <div className="help-text">
                Example: If {userName(fromUser) || "Amit"} owes ₹
                {maxDue > 0 ? maxDue.toFixed(2) : "0"} to{" "}
                {userName(toUser) || "Manas"}, they can pay any amount up to that value.
              </div>
            </div>

            <button
              className="btn"
              onClick={handleRecordPayment}
              disabled={!fromUser || !toUser || maxDue <= 0}
            >
              Settle this amount
            </button>

            {errorMsg && (
              <div style={{ marginTop: "0.75rem", color: "#fecaca" }}>
                {errorMsg}
              </div>
            )}
            {successMsg && (
              <div style={{ marginTop: "0.75rem", color: "#bbf7d0" }}>
                {successMsg}
              </div>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "0.75rem"
              }}
            >
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setShow(false);
                  setFromUser("");
                  setToUser("");
                  setAmount("");
                  setErrorMsg("");
                  setSuccessMsg("");
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SettleModal;
