import React, { useState, useMemo } from "react";
import axiosClient from "../api/axiosClient";

const ExpenseForm = ({ group, users, onExpenseAdded }) => {
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [splitType, setSplitType] = useState("EQUAL");
  const [participantIds, setParticipantIds] = useState([]);
  const [exactAmounts, setExactAmounts] = useState({});
  const [percentages, setPercentages] = useState({});

  const groupMembers = useMemo(
    () =>
      group?.members?.map((m) => users.find((u) => u._id === m._id) || m) || [],
    [group, users]
  );

  const toggleParticipant = (id) => {
    setParticipantIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    const amt = parseFloat(totalAmount);
    if (!group?._id || !description || !amt || !paidBy || participantIds.length === 0)
      return;

    const payload = {
      groupId: group._id,
      description,
      totalAmount: amt,
      paidBy,
      splitType,
      participantIds
    };

    if (splitType === "EXACT") {
      payload.exactAmounts = participantIds.map(
        (pid) => parseFloat(exactAmounts[pid] || 0)
      );
    } else if (splitType === "PERCENT") {
      payload.percentages = participantIds.map(
        (pid) => parseFloat(percentages[pid] || 0)
      );
    }

    const res = await axiosClient.post("/expenses", payload);
    onExpenseAdded(res.data);
    setShowModal(false);
    setDescription("");
    setTotalAmount("");
    setPaidBy("");
    setSplitType("EQUAL");
    setParticipantIds([]);
    setExactAmounts({});
    setPercentages({});
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Add shared expense</div>
            <div className="card-sub">
              Support for equal, exact and percentage split types.
            </div>
          </div>
          <button className="btn" onClick={() => setShowModal(true)}>
            + Add expense
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginTop: 0 }}>New expense</h3>
            <div className="form-group">
              <label>Description</label>
              <input
                className="input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description of the expense"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Total amount (₹)</label>
                <input
                  className="input"
                  type="number"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Paid by</label>
                <select
                  className="select"
                  value={paidBy}
                  onChange={(e) => setPaidBy(e.target.value)}
                >
                  <option value="">Select</option>
                  {groupMembers.map((m) => (
                    <option key={m._id} value={m._id}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Split type</label>
              <div className="chip-row">
                {["EQUAL", "EXACT", "PERCENT"].map((t) => (
                  <div
                    key={t}
                    className={
                      "chip " + (splitType === t ? "chip-active" : "")
                    }
                    onClick={() => setSplitType(t)}
                  >
                    {t}
                  </div>
                ))}
              </div>
              <div className="help-text">
                Equal: same share for everyone; Exact: specify amounts; Percent:
                specify percentages.
              </div>
            </div>

            <div className="form-group">
              <label>Participants</label>
              <div className="chip-row">
                {groupMembers.map((m) => (
                  <div
                    key={m._id}
                    className={
                      "chip " +
                      (participantIds.includes(m._id) ? "chip-active" : "")
                    }
                    onClick={() => toggleParticipant(m._id)}
                  >
                    {m.name}
                  </div>
                ))}
              </div>
            </div>

            {splitType === "EXACT" && participantIds.length > 0 && (
              <div className="form-group">
                <label>Exact amounts (₹)</label>
                {participantIds.map((pid) => {
                  const user = groupMembers.find((m) => m._id === pid);
                  return (
                    <div key={pid} className="form-row">
                      <div className="form-group">
                        <span className="card-sub">{user?.name}</span>
                      </div>
                      <div className="form-group">
                        <input
                          type="number"
                          className="input"
                          value={exactAmounts[pid] || ""}
                          onChange={(e) =>
                            setExactAmounts((prev) => ({
                              ...prev,
                              [pid]: e.target.value
                            }))
                          }
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {splitType === "PERCENT" && participantIds.length > 0 && (
              <div className="form-group">
                <label>Percentages (%)</label>
                {participantIds.map((pid) => {
                  const user = groupMembers.find((m) => m._id === pid);
                  return (
                    <div key={pid} className="form-row">
                      <div className="form-group">
                        <span className="card-sub">{user?.name}</span>
                      </div>
                      <div className="form-group">
                        <input
                          type="number"
                          className="input"
                          value={percentages[pid] || ""}
                          onChange={(e) =>
                            setPercentages((prev) => ({
                              ...prev,
                              [pid]: e.target.value
                            }))
                          }
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "0.5rem",
                marginTop: "0.75rem"
              }}
            >
              <button
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className="btn" onClick={handleSubmit}>
                Save expense
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExpenseForm;
