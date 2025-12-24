import React, { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import { FaWallet } from "react-icons/fa";

const Sidebar = ({ owner, onGroupSelected, onFriendsLoaded }) => {
  const [friends, setFriends] = useState([]);
  const [groups, setGroups] = useState([]);
  const [showFriendModal, setShowFriendModal] = useState(false);
  const [newFriendName, setNewFriendName] = useState("");
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [memberIds, setMemberIds] = useState([]);

  const loadFriends = async () => {
    const res = await axiosClient.get(`/friends?ownerId=${owner._id}`);
    setFriends(res.data);
    onFriendsLoaded(res.data);
  };

  const loadGroups = async () => {
    const res = await axiosClient.get(`/groups?ownerId=${owner._id}`);
    setGroups(res.data);
    if (res.data.length > 0) onGroupSelected(res.data[0]);
  };

  useEffect(() => {
    loadFriends().catch(console.error);
    loadGroups().catch(console.error);
  }, []);

  const handleAddFriend = async () => {
    if (!newFriendName.trim()) return;
    const res = await axiosClient.post("/friends", {
      ownerId: owner._id,
      name: newFriendName.trim(),
    });
    const updated = [...friends, res.data].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setFriends(updated);
    onFriendsLoaded(updated);
    setNewFriendName("");
    setShowFriendModal(false);
  };

  const toggleMember = (id) => {
    setMemberIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleCreateGroup = async () => {
    if (!newGroupName.trim() || memberIds.length === 0) return;
    const res = await axiosClient.post("/groups", {
      ownerId: owner._id,
      name: newGroupName.trim(),
      memberIds,
    });
    const updated = [res.data, ...groups];
    setGroups(updated);
    setNewGroupName("");
    setMemberIds([]);
    setShowGroupModal(false);
    onGroupSelected(res.data);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <FaWallet /> Split<span>Dash</span>
      </div>

      {/* Friends section */}
      <div>
        <div className="sidebar-section-title">Friends</div>
        <button
          className="btn btn-secondary"
          onClick={() => setShowFriendModal(true)}
        >
          + Add friend
        </button>
        <div
          className="scroll-section"
          style={{
            marginTop: "0.5rem",
            maxHeight: 130,
            fontSize: "0.85rem",
            color: "#9ca3af",
          }}
        >
          {friends.length === 0 && <div>No friends yet. Add your group.</div>}
          {friends.map((f) => (
            <div key={f._id}>{f.name}</div>
          ))}
        </div>
      </div>

      {/* Groups section */}
      <div style={{ marginTop: "1rem" }}>
        <div className="sidebar-section-title">Groups</div>
        <button
          className="btn btn-secondary"
          onClick={() => setShowGroupModal(true)}
        >
          + New group
        </button>
      </div>

      <div
        className="scroll-section"
        style={{ flex: 1, marginTop: "0.75rem", maxHeight: 220 }}
      >
        {groups.map((g) => (
          <div
            key={g._id}
            style={{
              padding: "0.55rem 0.4rem",
              borderRadius: "0.75rem",
              cursor: "pointer",
              marginBottom: "0.35rem",
              border: "1px solid #111827",
              background: "#020617",
            }}
            onClick={() => onGroupSelected(g)}
          >
            <div style={{ fontSize: "0.9rem", fontWeight: 500 }}>{g.name}</div>
            <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
              {g.members?.length || 0} members
            </div>
          </div>
        ))}
      </div>

      {/* Add Friend Modal */}
      {showFriendModal && (
        <div
          className="modal-backdrop"
          onClick={() => setShowFriendModal(false)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginTop: 0 }}>Add friend</h3>
            <div className="form-group">
              <label>Friend name</label>
              <input
                className="input"
                value={newFriendName}
                onChange={(e) => setNewFriendName(e.target.value)}
                placeholder="Name of your friend"
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "0.75rem",
                gap: "0.5rem",
              }}
            >
              <button
                className="btn btn-secondary"
                onClick={() => setShowFriendModal(false)}
              >
                Cancel
              </button>
              <button className="btn" onClick={handleAddFriend}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Group Modal */}
      {showGroupModal && (
        <div
          className="modal-backdrop"
          onClick={() => setShowGroupModal(false)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginTop: 0 }}>Create group</h3>
            <div className="form-group">
              <label>Group name</label>
              <input
                className="input"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="Title of the group"
              />
            </div>
            <div className="form-group">
              <label>Members</label>
              <div className="chip-row">
                {friends.map((f) => (
                  <div
                    key={f._id}
                    className={
                      "chip " + (memberIds.includes(f._id) ? "chip-active" : "")
                    }
                    onClick={() => toggleMember(f._id)}
                  >
                    {f.name}
                  </div>
                ))}
              </div>
              <div className="help-text">
                Select friends who were part of this trip.
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "0.75rem",
                gap: "0.5rem",
              }}
            >
              <button
                className="btn btn-secondary"
                onClick={() => setShowGroupModal(false)}
              >
                Cancel
              </button>
              <button className="btn" onClick={handleCreateGroup}>
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
